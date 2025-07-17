import React from 'react';
import { client } from '@/lib/sanityClient';
import Card from '@/components/Card';

// Define the type for our news data
interface News {
  _id: string;
  title: string;
  imageUrl: string;
  shortDescription: string;
  slug: { current: string };
  _createdAt: string;
}

// This function fetches ALL news data from Sanity, ordered by newest first
async function getAllNewsData(): Promise<News[]> {
  const query = `*[_type == "news"] | order(_createdAt desc){
    _id,
    title,
    "imageUrl": mainImage.asset->url,
    shortDescription,
    slug,
    _createdAt
  }`;
const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const AllNewsPage = async () => {
  const allNews = await getAllNewsData();

  return (
    <div className="bg-white" data-aos="fade-in">
      {/* Page Title Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">පුවත් සහ සිදුවීම්</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            රෝහල හා සම්බන්ධ නවතම තොරතුරු සහ දැනුම්දීම්.
          </p>
        </div>
      </div>

      {/* Main Content: News Cards Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allNews.map((newsItem, index) => (
            <div key={newsItem._id} data-aos="fade-up" data-aos-delay={index * 50}>
              <Card 
                imageSrc={newsItem.imageUrl} 
                title={newsItem.title} 
                linkHref={newsItem.slug?.current ? `/news/${newsItem.slug.current}` : '#'} 
                linkText="වැඩිදුර කියවන්න"
              >
                {newsItem.shortDescription}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllNewsPage;