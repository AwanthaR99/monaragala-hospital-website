// src/app/staff/notices/page.tsx
import React from 'react';
import { client } from '@/lib/sanityClient';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

interface InternalNotice {
  _id: string;
  title: string;
  noticeDate: string;
  content: any;
}

async function getNoticesData(): Promise<InternalNotice[]> {
  const query = `*[_type == "internalNotice"] | order(noticeDate desc)`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const NoticesPage = async () => {
  const notices = await getNoticesData();

  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
            <Link href="/staff/dashboard" className="text-blue-600 hover:underline font-semibold mb-4 inline-block">
              &larr; Dashboard වෙත ආපසු යන්න
            </Link>
            <h1 className="text-4xl font-poppins font-bold text-gray-800">අභ්‍යන්තර දැන්වීම්</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {notices && notices.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {notices.map((notice) => (
              <div key={notice._id} className="p-6 bg-white border rounded-lg shadow-md" data-aos="fade-up">
                <h3 className="text-2xl font-poppins font-bold text-blue-700">{notice.title}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Date: {new Date(notice.noticeDate).toLocaleDateString('en-CA')}
                </p>
                <div className="prose max-w-none text-gray-700">
                  <PortableText value={notice.content} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">There are currently no internal notices.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesPage;