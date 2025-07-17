import React from 'react';
import Card from '@/components/Card';

//data with slugs
const departments = [
  {
    name: 'ශල්‍ය දෙපාර්තමේන්තුව (Surgery)',
    description: 'සාමාන්‍ය සහ විශේෂිත ශල්‍යකර්ම සඳහා නවීන පහසුකම් වලින් සමන්විතයි.',
    imageSrc: '/images/dept-surgery.jpg',
    slug: 'surgery',
  },
  {
    name: 'වෛද්‍ය දෙපාර්තමේන්තුව (Medicine)',
    description: 'සියලුම බෝවන සහ බෝ නොවන රෝග සඳහා නේවාසික සහ බාහිර ප්‍රතිකාර.',
    imageSrc: '/images/dept-medicine.jpg',
    slug: 'medicine',
  },
  {
    name: 'ප්‍රසව හා නรีවේද දෙපාර්තමේන්තුව (Obstetrics & Gynaecology)',
    description: 'මාතෘ සහ කාන්තා සෞඛ්‍ය සඳහා විශේෂිත වූ සම්පූර්ණ සේවාවන්.',
    imageSrc: '/images/dept-obgyn.jpg',
    slug: 'obgyn',
  },
  {
    name: 'ළමා රෝග දෙපාර්තමේන්තුව (Pediatrics)',
    description: 'ළදරුවන් සහ ළමුන් සඳහා විශේෂඥ වෛද්‍ය ප්‍රතිකාර සහ සත්කාර.',
    imageSrc: '/images/dept-pediatrics.jpg',
    slug: 'pediatrics',
  },
  {
    name: 'විකිරණවේද දෙපාර්තමේන්තුව (Radiology)',
    description: 'X-Ray, Ultrasound Scan වැනි රෝග නිර්ණය කිරීමේ සේවාවන්.',
    imageSrc: '/images/dept-radiology.jpg',
    slug: 'radiology',
  },
  {
    name: 'රසායනාගාර සේවා (Laboratory)',
    description: 'නිවැරදි රෝග විනිශ්චය සඳහා අවශ්‍ය සියලුම රසායනාගාර පරීක්ෂණ.',
    imageSrc: '/images/dept-laboratory.jpg',
    slug: 'laboratory',
  },
];

const DepartmentsPage = () => {
  return (
    <div className="bg-white" data-aos="fade-in">
      {/* Page Title Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">අපගේ දෙපාර්තමේන්තු</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            රෝහල මගින් පවත්වාගෙන යනු ලබන විවිධ වෛද්‍ය අංශ පිළිබඳ විස්තර.
          </p>
        </div>
      </div>

      {/* Main Content: Departments Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <div key={dept.name} data-aos="fade-up" data-aos-delay={index * 50}>
              <Card 
                imageSrc={dept.imageSrc} 
                title={dept.name} 
                linkHref={`/departments/${dept.slug}`}
                linkText="වැඩිදුර විස්තර"
              >
                {dept.description}
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;