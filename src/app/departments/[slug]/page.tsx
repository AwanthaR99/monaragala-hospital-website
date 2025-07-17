import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const departments = [
    {
      name: 'ශල්‍ය දෙපාර්තමේන්තුව (Surgery)',
      description: 'සාමාන්‍ය සහ විශේෂිත ශල්‍යකර්ම සඳහා නවීන පහසුකම් වලින් සමන්විතයි. පළපුරුදු ශල්‍ය වෛද්‍යවරුන් සහ කාර්ය මණ්ඩලයක් මගින් පැය 24 පුරාම සේවය සපයනු ලැබේ. හදිසි ශල්‍යකර්ම සඳහා විශේෂ ඒකකයක් ද ක්‍රියාත්මක වේ.',
      imageSrc: '/images/dept-surgery.jpg',
      slug: 'surgery',
    },
    {
      name: 'වෛද්‍ය දෙපාර්තමේන්තුව (Medicine)',
      description: 'සියලුම බෝවන සහ බෝ නොවන රෝග සඳහා නේවාසික සහ බාහිර ප්‍රතිකාර සේවා. විශේෂඥ වෛද්‍යවරුන් විසින් මෙහෙයවනු ලබන සායන මගින් අඛණ්ඩ සත්කාරයක් ලබා දේ.',
      imageSrc: '/images/dept-medicine.jpg',
      slug: 'medicine',
    },
    {
        name: 'ප්‍රසව හා නรีවේද දෙපාර්තමේන්තුව (Obstetrics & Gynaecology)',
        description: 'මාතෘ සහ කාන්තා සෞඛ්‍ය සඳහා විශේෂිත වූ සම්පූර්ණ සේවාවන්. ආරක්ෂාකාරී දරු ප්‍රසූතිය සහ කාන්තා රෝග සඳහා අවශ්‍ය සියලු පහසුකම් වලින් සමන්විතයි.',
        imageSrc: '/images/dept-obgyn.jpg',
        slug: 'obgyn',
    },
    {
        name: 'ළමා රෝග දෙපාර්තමේන්තුව (Pediatrics)',
        description: 'ළදරුවන් සහ ළමුන් සඳහා විශේෂඥ වෛද්‍ය ප්‍රතිකාර සහ සත්කාර. නේවාසික ප්‍රතිකාර මෙන්ම, විශේෂිත ළමා සායන ද පවත්වනු ලැබේ.',
        imageSrc: '/images/dept-pediatrics.jpg',
        slug: 'pediatrics',
    },
    {
        name: 'විකිරණවේද දෙපාර්තමේන්තුව (Radiology)',
        description: 'X-Ray, Ultrasound Scan වැනි රෝග නිර්ණය කිරීමේ සේවාවන් නවීන තාක්ෂණික උපකරණ භාවිතයෙන් සිදු කෙරේ.',
        imageSrc: '/images/dept-radiology.jpg',
        slug: 'radiology',
    },
    {
        name: 'රසායනාගාර සේවා (Laboratory)',
        description: 'නිවැරදි රෝග විනිශ්චය සඳහා අවශ්‍ය සියලුම රසායනාගාර පරීක්ෂණ, පළපුරුදු කාර්ය මණ්ඩලයක් විසින් සිදුකරනු ලබයි.',
        imageSrc: '/images/dept-laboratory.jpg',
        slug: 'laboratory',
    },
];

const SingleDepartmentPage = ({ params }: { params: { slug: string } }) => {
    
  const department = departments.find(d => d.slug === params.slug);

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

  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="container mx-auto px-6 py-12">
        <article>
          <div className="mb-8">
            <Link href="/departments" className="text-blue-600 hover:underline font-semibold">
              &larr; සියලුම දෙපාර්තමේන්තු වෙත
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
            {department.name}
          </h1>
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={department.imageSrc} 
              alt={department.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="prose lg:prose-xl max-w-none font-lato text-gray-800">
            <p>{department.description}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SingleDepartmentPage;