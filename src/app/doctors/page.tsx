import React from 'react';
import { client } from '@/lib/sanityClient';
import Image from 'next/image';

interface Doctor {
  _id: string;
  name: string;
  speciality: string;
  qualifications: string;
  imageUrl: string;
}

async function getDoctorsData(): Promise<Doctor[]> {
  const query = `*[_type == "doctor"]{
    _id,
    name,
    speciality,
    qualifications,
    "imageUrl": image.asset->url
  }`;
 const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const DoctorsPage = async () => {
  const doctors = await getDoctorsData();

  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">අපගේ විශේෂඥ වෛද්‍යවරු</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            රෝහලේ සේවයේ නියුතු විශේෂඥ වෛද්‍ය කණ්ඩායම.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-lg text-center p-6 transition-transform transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay={index * 50}>
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-gray-200">
                {doctor.imageUrl ? (
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-full w-full"></div>
                )}
              </div>
              <h3 className="mt-4 font-poppins font-bold text-xl text-gray-800">{doctor.name}</h3>
              <p className="mt-1 font-lato text-blue-600 font-semibold">{doctor.speciality}</p>
              <p className="mt-2 text-sm font-lato text-gray-500">{doctor.qualifications}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;