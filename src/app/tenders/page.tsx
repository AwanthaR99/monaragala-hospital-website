import React from 'react';
import { client } from '@/lib/sanityClient';
import { PortableText } from '@portabletext/react';
import Accordion from '@/components/Accordion';

interface Tender {
  _id: string;
  tenderTitle: string;
  tenderNumber: string;
  closingDate: string;
  description: any;
}

async function getOpenTenders(): Promise<Tender[]> {
  const query = `*[_type == "tender" && status == "open"] | order(closingDate asc)`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const TendersPage = async () => {
  const tenders = await getOpenTenders();

  return (
    <div className="bg-white">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">ටෙන්ඩර් දැන්වීම්</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            රෝහලට අදාළ ප්‍රසම්පාදන සහ ටෙන්ඩර් දැන්වීම්.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16" data-aos="fade-up">
        {tenders && tenders.length > 0 ? (
          <div className="max-w-4xl mx-auto border-t border-gray-200">
            {tenders.map((tender) => (
              <Accordion 
                key={tender._id}
                title={`${tender.tenderNumber}: ${tender.tenderTitle}`}
              >
                <div className="prose lg:prose-lg max-w-none text-gray-700">
                    <p className="font-semibold text-red-600">
                        Closing Date & Time: {new Date(tender.closingDate).toLocaleString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                    </p>
                    <PortableText value={tender.description} />
                </div>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-poppins font-semibold">දැනට විවෘත ටෙන්ඩර් නොමැත</h2>
            <p className="mt-4 text-gray-600">
              නවතම ටෙන්ඩර් දැන්වීම් සඳහා කරුණාකර මෙම පිටුව නිරන්තරයෙන් පරීක්ෂා කරන්න.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TendersPage;