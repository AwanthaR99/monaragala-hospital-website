import React from 'react';
import { client } from '@/lib/sanityClient';
import Image from 'next/image';

interface Award {
  _id: string;
  awardTitle: string;
  year: string;
  description: string;
  imageUrl: string;
}

// Fetch awards data from Sanity, ordered by the newest year first
async function getAwardsData(): Promise<Award[]> {
  const query = `*[_type == "award"] | order(year desc){
    _id,
    awardTitle,
    year,
    description,
    "imageUrl": awardImage.asset->url
  }`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const AwardsPage = async () => {
  const awards = await getAwardsData();

  return (
    <div className="bg-white">
      {/* Page Title Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">සම්මාන සහ ජයග්‍රහණ</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            වසර ගණනාවක් පුරා අප ලද ඇගයීම්.
          </p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="relative wrap overflow-hidden p-10 h-full">
          {/* The vertical timeline bar */}
          <div className="absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>

          {awards.map((award, index) => (
            <div key={award._id} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
              <div className="order-1 w-5/12"></div>
              {/* The circle on the timeline bar */}
              <div className="z-20 flex items-center order-1 bg-blue-600 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-white text-sm">{award.year}</h1>
              </div>
              {/* The content card */}
              <div className="order-1 bg-gray-50 rounded-lg shadow-xl w-5/12 px-6 py-4" data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
                {award.imageUrl && (
                    <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                       <Image 
  src={award.imageUrl} 
  alt={award.awardTitle} 
  layout="fill" 
  objectFit="contain" 
/>
                    </div>
                )}
                <h3 className="font-poppins font-bold text-gray-800 text-xl">{award.awardTitle}</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-600 font-lato mt-2">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsPage;