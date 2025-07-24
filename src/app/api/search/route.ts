import { client } from '@/lib/sanityClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('query');

  if (!searchTerm) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  // This is the final, comprehensive query
  const groqQuery = `
    *[_type in ["news", "doctor", "department", "clinic", "vacancy", "tender", "award"] && (
      // Searchable fields for all types
      _type match $searchTerm || 
      title match $searchTerm || 
      name match $searchTerm ||
      speciality match $searchTerm ||
      clinicName match $searchTerm ||
      doctorName match $searchTerm ||
      positionTitle match $searchTerm ||
      tenderTitle match $searchTerm ||
      awardTitle match $searchTerm ||
      shortDescription match $searchTerm ||
      description match $searchTerm
    )]{
      _type,
      // Use coalesce to pick the first available title/name field
      "title": coalesce(title, name, clinicName, positionTitle, tenderTitle, awardTitle), 
      "slug": slug.current,
      _id
    }[0...10] // Limit to 10 results
  `;
  
  const params = { searchTerm: `*${searchTerm}*` }; // Use wildcards for contains search

  try {
    const results = await client.fetch(groqQuery, params);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}