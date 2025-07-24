import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import { FaBullhorn, FaCalendarAlt, FaPhoneAlt,FaFileAlt } from 'react-icons/fa'; // Import some icons

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-gray-50" style={{ minHeight: '80vh' }}>
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">
            Welcome, {session?.user?.name || 'Staff Member'}!
          </h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            Select an option below to continue.
          </p>
        </div>

        {/* Dashboard Icons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
          {/* Card 1: Internal Notices */}
          <Link href="/staff/notices">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer h-full">
              <FaBullhorn className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-poppins font-semibold text-gray-800">Internal Notices</h2>
              <p className="text-center text-gray-500 mt-2">View the latest internal circulars and announcements.</p>
            </div>
          </Link>

          {/* Card 2: Duty Roster (NOW ACTIVE) */}
          <Link href="/staff/rosters">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer h-full">
              <FaCalendarAlt className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-poppins font-semibold text-gray-800">Duty Roster</h2>
              <p className="text-center text-gray-500 mt-2">View and download the latest duty rosters.</p>
            </div>
          </Link>

         
          {/* Card 3: Telephone Directory (NOW ACTIVE) */}
          <Link href="/staff/directory">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer h-full">
              <FaPhoneAlt className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-poppins font-semibold text-gray-800">Telephone Directory</h2>
              <p className="text-center text-gray-500 mt-2">Find internal extension numbers quickly.</p>
            </div>
          </Link>

           {/* Card 4: Official Circulars */}
          <Link href="/staff/circulars">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer h-full">
              <FaFileAlt className="text-4xl text-blue-600 mb-4" />
              <h2 className="text-2xl font-poppins font-semibold text-gray-800">Official Circulars</h2>
              <p className="text-center text-gray-500 mt-2">Download official circulars and notices.</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;