import React from 'react';

const VisitingHoursPage = () => {
  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">රෝගීන් බැලීමේ වේලාවන්</h1>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-poppins font-semibold text-blue-600">සාමාන්‍ය වාට්ටු</h2>
            <p className="font-lato text-gray-700 mt-2">දිනපතා: දහවල් 12:00 - 1:00 සහ සවස 5:00 - 6:00</p>
          </div>
          <div>
            <h2 className="text-2xl font-poppins font-semibold text-blue-600">මාතෘ වාට්ටුව</h2>
            <p className="font-lato text-gray-700 mt-2">දිනපතා: දහවල් 12:00 - 1:00 සහ සවස 5:00 - 6:00</p>
          </div>
          <div>
            <h2 className="text-2xl font-poppins font-semibold text-blue-600">දැඩි සත්කාර ඒකකය (ICU)</h2>
            <p className="font-lato text-gray-700 mt-2">කරුණාකර හෙද නිලධාරී මහත්මිය/මහතා හමුවී අවසර ලබාගන්න.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitingHoursPage;