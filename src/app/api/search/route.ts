import { client } from '@/lib/sanityClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  // This is the new, improved GROQ query
  const groqQuery = `
    *[_type in ["news", "doctor", "department", "clinic"] && (
      _type match $query || // <-- This new line searches the content type itself
      // For news
      title match $query || 
      shortDescription match $query ||
      // For doctors
      name match $query || 
      speciality match $query ||
      // For departments
      name match $query ||
      shortDescription match $query ||
      // For clinics
      clinicName match $query ||
      doctorName match $query
    )]{
      _type,
      "title": coalesce(title, name, clinicName, positionTitle), // Added positionTitle for vacancies
      "slug": slug.current,
      _id
    }[0...10]
  `;

  try {
    const results = await client.fetch(groqQuery, { query: `${query}*` });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}