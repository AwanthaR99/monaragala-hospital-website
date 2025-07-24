import React from 'react';
import { client } from '@/lib/sanityClient';
import Link from 'next/link';
import DirectoryList from '@/components/DirectoryList'; 

interface DirectoryEntry {
    _id: string;
    locationName: string;
    extensionNumber: string;
}

async function getDirectoryData(): Promise<DirectoryEntry[]> {
  const query = `*[_type == "directoryEntry"] | order(locationName asc)`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const DirectoryPage = async () => {
  const entries = await getDirectoryData();

  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
            <Link href="/staff/dashboard" className="text-blue-600 hover:underline font-semibold mb-4 inline-block">
              &larr; Dashboard වෙත ආපසු යන්න
            </Link>
            <h1 className="text-4xl font-poppins font-bold text-gray-800">අභ්‍යන්තර දුරකථන නාමාවලිය</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <DirectoryList entries={entries} />
      </div>
    </div>
  );
};

export default DirectoryPage;