import React from 'react';

const LabsPage = () => {
  return (
    <div className="bg-white" data-aos="fade-in">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">රසායනාගාර සේවා</h1>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-2xl font-poppins font-semibold mb-4">ලබාගත හැකි පරීක්ෂණ</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 font-lato">
          <li>රුධිර පරීක්ෂණ (FBC, Blood Sugar, etc.)</li>
          <li>මුත්‍රා පරීක්ෂණ</li>
          <li>ECG පරීක්ෂණ</li>
          <li>වෙනත් ජෛව රසායනික පරීක්ෂණ</li>
        </ul>
      </div>
    </div>
  );
};

export default LabsPage;