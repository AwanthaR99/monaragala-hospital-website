import React from 'react';
import { client } from '@/lib/sanityClient';
import { PortableText } from '@portabletext/react';
import Accordion from '@/components/Accordion'; 
interface Vacancy {
  _id: string;
  positionTitle: string;
  closingDate: string;
  description: any;
}

async function getOpenVacancies(): Promise<Vacancy[]> {
  const query = `*[_type == "vacancy" && status == "open"] | order(closingDate asc)`;
  const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const VacanciesPage = async () => {
  const vacancies = await getOpenVacancies();

  return (
    <div className="bg-white">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">රැකියා ඇබෑර්තු</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            අප හා එක්වී ජනතා සේවයට දායක වන්න.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16" data-aos="fade-up">
        {vacancies && vacancies.length > 0 ? (
          <div className="max-w-3xl mx-auto border-t border-gray-200">
            {vacancies.map((vacancy) => (
              <Accordion 
                key={vacancy._id}
                title={vacancy.positionTitle}
              >
                <div className="prose lg:prose-lg max-w-none text-gray-700">
                    <p className="font-semibold text-red-600">
                        Closing Date: {new Date(vacancy.closingDate).toLocaleDateString('en-CA')}
                    </p>
                    <PortableText value={vacancy.description} />
                </div>
              </Accordion>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-poppins font-semibold">දැනට පුරප්පාඩු නොමැත</h2>
            <p className="mt-4 text-gray-600">
              දැනට කිසිදු රැකියා ඇබෑර්තුවක් ප්‍රකාශයට පත් කර නොමැත. අනාගත ඇබෑර්තු සඳහා කරුණාකර මෙම පිටුව නිරන්තරයෙන් පරීක්ෂා කරන්න.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacanciesPage;