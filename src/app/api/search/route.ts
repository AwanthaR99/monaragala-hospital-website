import { client } from '@/lib/sanityClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  // New, improved query that includes "vacancies"
  const groqQuery = `
    *[_type in ["news", "doctor", "department", "clinic", "vacancy"] && (
      _type match $query ||
      // Search fields for different types
      title match $query || 
      name match $query ||
      speciality match $query ||
      clinicName match $query ||
      doctorName match $query ||
      positionTitle match $query ||
      shortDescription match $query
    )]{
      _type,
      "title": coalesce(title, name, clinicName, positionTitle),
      "slug": slug.current,
      _id
    }[0...10]
  `;
  
  const params = { query: `${query}*` };

  try {
    const results = await client.fetch(groqQuery, params);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}