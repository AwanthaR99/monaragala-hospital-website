import React from 'react';
import { client } from '@/lib/sanityClient';
import Link from 'next/link';
import { FaFilePdf } from 'react-icons/fa';

interface Circular {
  _id: string;
  title: string;
  fileUrl: string;
}

async function getCircularsData(): Promise<Circular[]> {
  const query = `*[_type == "circular"] | order(_createdAt desc){
    _id,
    title,
    "fileUrl": circularFile.asset->url
  }`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const CircularsPage = async () => {
  const circulars = await getCircularsData();

  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <Link href="/staff/dashboard" className="text-blue-600 hover:underline font-semibold mb-4 inline-block">
            &larr; Dashboard වෙත ආපසු යන්න
          </Link>
          <h1 className="text-4xl font-poppins font-bold text-gray-800">නිල චක්‍රලේඛ (Official Circulars)</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {circulars && circulars.length > 0 ? (
            <ul className="space-y-4">
              {circulars.map((circular) => (
                <li key={circular._id} data-aos="fade-up">
                  <a
                    href={circular.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <FaFilePdf className="text-2xl text-red-600" />
                      <span className="font-poppins font-semibold text-gray-800">{circular.title}</span>
                    </div>
                    <span className="text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
                      Download
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">There are currently no circulars uploaded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularsPage;