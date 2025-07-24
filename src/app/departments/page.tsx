import React from 'react';
import Card from '@/components/Card';
import { client } from '@/lib/sanityClient';

interface Department {
  _id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
  slug: { current: string };
}

async function getDepartmentsData(): Promise<Department[]> {
    const query = `*[_type == "department"]{
        _id,
        name,
        shortDescription,
        "imageUrl": image.asset->url,
        slug
    }`;
    const data = await client.fetch(query, {}, { cache: 'no-store' });
    return data;
}

const DepartmentsPage = async () => {
  const departments = await getDepartmentsData();

  return (
    <div className="bg-white">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">අපගේ දෙපාර්තමේන්තු</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            රෝහල මගින් පවත්වාගෙන යනු ලබන විවිධ වෛද්‍ය අංශ පිළිබඳ විස්තර.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <div key={dept._id} data-aos="fade-up" data-aos-delay={index * 50}>
              <Card 
                imageSrc={dept.imageUrl} 
                title={dept.name} 
                linkHref={`/departments/${dept.slug.current}`}
                linkText="වැඩිදුර විස්තර"
              >
                {dept.shortDescription}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;