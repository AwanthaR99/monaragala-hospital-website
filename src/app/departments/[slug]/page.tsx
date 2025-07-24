import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { FaBed, FaUserMd, FaHospital } from 'react-icons/fa';

// --- Data Fetching part (no changes here) ---
interface SingleDepartment {
    name: string;
    fullDescription: any;
    imageUrl: string;
    wardNumber?: string;
    bedCapacity?: string;
    headConsultant?: string;
}

async function getSingleDepartmentData(slug: string): Promise<SingleDepartment | null> {
    const query = `*[_type == "department" && slug.current == "${slug}"][0]{
        name,
        fullDescription,
        "imageUrl": image.asset->url,
        wardNumber,
        bedCapacity,
        headConsultant
    }`;
    const data = await client.fetch(query, {}, { cache: 'no-store' });
    return data;
}
// --- End of Data Fetching ---

const SingleDepartmentPage = async ({ params }: { params: { slug: string } }) => {
  const department = await getSingleDepartmentData(params.slug);

  if (!department) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold">404 - දෙපාර්තමේන්තුව සොයාගත නොහැක</h1>
        <Link href="/departments" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          &larr; සියලුම දෙපාර්තමේන්තු වෙත ආපසු යන්න
        </Link>
      </div>
    );
  }

  // --- Start of the NEW Professional Layout ---
  return (
    <div className="bg-white">
      {/* Page Title Section */}
      <div className="bg-gray-100 py-12" data-aos="fade-in">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">{department.name}</h1>
        </div>
      </div>
      
      {/* Key Information Section */}
      {(department.wardNumber || department.bedCapacity || department.headConsultant) && (
        <section className="bg-blue-50 border-y border-blue-100">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8 px-6" data-aos="fade-up">
                {department.wardNumber && (
                    <div className="flex flex-col items-center">
                        <FaHospital className="text-blue-600 text-3xl mb-2" />
                        <span className="font-lato text-gray-600">වාට්ටු අංක</span>
                        <span className="font-poppins font-bold text-xl text-gray-900">{department.wardNumber}</span>
                    </div>
                )}
                {department.bedCapacity && (
                    <div className="flex flex-col items-center">
                        <FaBed className="text-blue-600 text-3xl mb-2" />
                        <span className="font-lato text-gray-600">ඇඳන් ධාරිතාව</span>
                        <span className="font-poppins font-bold text-xl text-gray-900">{department.bedCapacity}</span>
                    </div>
                )}
                {department.headConsultant && (
                    <div className="flex flex-col items-center">
                        <FaUserMd className="text-blue-600 text-3xl mb-2" />
                        <span className="font-lato text-gray-600">ප්‍රධාන විශේෂඥ වෛද්‍ය</span>
                        <span className="font-poppins font-bold text-xl text-gray-900">{department.headConsultant}</span>
                    </div>
                )}
            </div>
        </section>
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8" data-aos="fade-up">
                <Link href="/departments" className="text-blue-600 hover:underline font-semibold">
                  &larr; සියලුම දෙපාර්තමේන්තු වෙත
                </Link>
            </div>
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-2xl" data-aos="fade-up" data-aos-delay="100">
                <Image 
                  src={department.imageUrl} 
                  alt={department.name}
                  layout="fill"
                  objectFit="cover"
                />
            </div>
            <article className="prose lg:prose-xl max-w-none font-lato text-gray-800" data-aos="fade-up" data-aos-delay="200">
                <PortableText value={department.fullDescription} />
            </article>
        </div>
      </div>
    </div>
  );
};

export default SingleDepartmentPage;