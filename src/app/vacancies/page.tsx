import React from 'react';

const VacanciesPage = () => {
  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">රැකියා ඇබෑර්තු</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            අප හා එක්වී ජනතා සේවයට දායක වන්න.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-poppins font-semibold">දැනට පුරප්පාඩු නොමැත</h2>
        <p className="mt-4 text-gray-600">
          දැනට කිසිදු රැකියා ඇබෑර්තුවක් ප්‍රකාශයට පත් කර නොමැත. අනාගත ඇබෑර්තු සඳහා කරුණාකර මෙම පිටුව නිරන්තරයෙන් පරීක්ෂා කරන්න.
        </p>
      </div>
    </div>
  );
};

export default VacanciesPage;