import { client } from '@/lib/sanityClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('query');

  if (!searchTerm) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  // New, improved query that searches across all relevant types and fields
  const groqQuery = `
    *[_type in ["news", "doctor", "department", "clinic", "vacancy"] && (
      // Searchable fields
      title match $searchTerm || 
      name match $searchTerm ||
      speciality match $searchTerm ||
      clinicName match $searchTerm ||
      positionTitle match $searchTerm ||
      shortDescription match $searchTerm
    )]{
      _type,
      // Use coalesce to pick the first available title/name field
      "title": coalesce(title, name, clinicName, positionTitle), 
      "slug": slug.current,
      _id
    }[0...10]
  `;
  
  // Define params object that matches the query variable
  const params = { searchTerm: `${searchTerm}*` }; // Use wildcard for partial matches

  try {
    const results = await client.fetch(groqQuery, params);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}