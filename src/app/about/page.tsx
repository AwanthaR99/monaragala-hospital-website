import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="bg-white" data-aos="fade-in">
      {/* Page Title Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">අප ගැන</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            මොණරාගල දිස්ත්‍රික් මහ රෝහලේ ඉතිහාසය, දැක්ම සහ මෙහෙවර.
          </p>
        </div>
      </div>

      {/* History Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <Image
              src="/images/hospital-history.jpeg" // Put your image here
              alt="Old hospital building"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-3xl font-poppins font-bold text-gray-800">අපේ ඉතිහාසය</h2>
            <p className="font-lato text-gray-600 mt-4 leading-relaxed">
              1876 ​​වර්ෂයේදී දිස්ත්‍රික් බෙහෙත් ශාලාවක් ලෙස ආරම්භ වූ මොණරාගල දිස්ත්‍රික් මහ රෝහල, දශක ගණනාවක් පුරා කලාපයේ ජනතාවට අඛණ්ඩ සෞඛ්‍ය සේවාවක් සපයමින් අද වන විට දිස්ත්‍රික්කයේ ප්‍රධානතම සෞඛ්‍ය මධ්‍යස්ථානය බවට පත්ව ඇත. අපගේ ගමන, ප්‍රජාවට ගුණාත්මක සේවාවක් සැපයීම සඳහා වූ නොසැලෙන කැපවීමේ සාක්ෂියකි.
            </p>
          </div>
        </div>
      </section>
      
      {/* Vision & Mission Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md" data-aos="fade-up">
              <h3 className="text-2xl font-poppins font-bold text-blue-600 mb-4">දැක්ම (Vision)</h3>
              <p className="font-lato text-gray-600">
                කලාපයේ ප්‍රමුඛතම සෞඛ්‍ය සේවා ආයතනය බවට පත්වීම, එහි ප්‍රවීණත්වය, නවෝත්පාදනය සහ අපගේ ප්‍රජාවේ සෞඛ්‍යය සහ ජීවන තත්ත්වය වැඩිදියුණු කිරීම සඳහා වූ කැපවීම සඳහා පිළිගැනීමට ලක්වීම.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-2xl font-poppins font-bold text-green-600 mb-4">මෙහෙවර (Mission)</h3>
              <p className="font-lato text-gray-600">
                දයාන්විත, රෝගී-කේන්ද්‍රීය සත්කාර ලබා දීම, සෞඛ්‍යය සහ යහපැවැත්ම ප්‍රවර්ධනය කිරීම, සහ වෛද්‍ය ප්‍රතිකාර සහ සේවාවන්හි විශිෂ්ටත්වය සඳහා උත්සාහ කිරීම.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* Our Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-poppins font-bold text-gray-800 mb-12" data-aos="fade-up">අපේ කණ්ඩායම</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            
            {/* Team Member 1 */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="0">
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden shadow-lg">
                <Image 
                  src="/images/director.png" // <--put your image name here
                  alt="Hospital Director"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h4 className="mt-4 font-poppins font-bold">වෛද්‍ය. (මිය.) A. B. C. පෙරේරා</h4>
              <p className="text-gray-500">රෝහල් අධ්‍යක්ෂක</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden shadow-lg">
                <Image 
                  src="/images/cmo.jpg" // <-- put your image name here
                  alt="Chief Medical Officer"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h4 className="mt-4 font-poppins font-bold">වෛද්‍ය. D. E. F. සිල්වා</h4>
              <p className="text-gray-500">ප්‍රධාන වෛද්‍ය නිලධාරී</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden shadow-lg">
                 <Image 
                  src="/images/matron.jpg" // <-- put your image name here
                  alt="Matron"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h4 className="mt-4 font-poppins font-bold">(මිය.) G. H. I. ප්‍රනාන්දු</h4>
              <p className="text-gray-500">ප්‍රධාන හෙද නිලධාරිනී</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden shadow-lg">
                 <Image 
                  src="/images/accountant.jpg" // <-- put your image name here 
                  alt="Accountant"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h4 className="mt-4 font-poppins font-bold">J. K. L. බණ්ඩාර මහතා</h4>
              <p className="text-gray-500">ප්‍රධාන ගණකාධිකාරී</p>
            </div>

            {/* if you needed to add more members, please copy and paste this div-block */}

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;