import React from 'react';
import { client } from '@/lib/sanityClient';
import Link from 'next/link';
import { FaFilePdf } from 'react-icons/fa';

interface Roster {
  _id: string;
  title: string;
  fileUrl: string;
}

// Fetch roster data from Sanity
async function getRostersData(): Promise<Roster[]> {
  const query = `*[_type == "dutyRoster"] | order(_createdAt desc){
    _id,
    title,
    "fileUrl": rosterFile.asset->url
  }`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const RostersPage = async () => {
  const rosters = await getRostersData();

  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <Link href="/staff/dashboard" className="text-blue-600 hover:underline font-semibold mb-4 inline-block">
            &larr; Dashboard වෙත ආපසු යන්න
          </Link>
          <h1 className="text-4xl font-poppins font-bold text-gray-800">රාජකාරී ලේඛන (Duty Rosters)</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {rosters && rosters.length > 0 ? (
            <ul className="space-y-4">
              {rosters.map((roster) => (
                <li key={roster._id} data-aos="fade-up">
                  <a
                    href={roster.fileUrl}
                    target="_blank" // Opens the PDF in a new tab
                    rel="noopener noreferrer"
                    download // Suggests to the browser to download the file
                    className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <FaFilePdf className="text-2xl text-red-600" />
                      <span className="font-poppins font-semibold text-gray-800">{roster.title}</span>
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
              <p className="text-gray-500">There are currently no duty rosters uploaded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RostersPage;