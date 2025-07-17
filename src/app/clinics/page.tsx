import React from 'react';
import { client } from '@/lib/sanityClient'; 

// Define the type for our clinic data
interface Clinic {
  _id: string;
  clinicName: string;
  doctorName: string;
  day: string;
  time: string;
  location: string;
}

// This function fetches data from Sanity
async function getClinicData(): Promise<Clinic[]> {
  const query = `*[_type == "clinic"] | order(day asc)`;
const data = await client.fetch(query, {}, { cache: 'no-store' });
  return data;
}

const ClinicSchedulePage = async () => {
  const clinics = await getClinicData();

  return (
    <div className="bg-white" data-aos="fade-in">
      {/* Page Title Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">සායන කාලසටහන</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            අපගේ රෝහලේ පැවැත්වෙන සියලුම විශේෂඥ වෛද්‍ය සායන පිළිබඳ විස්තර.
          </p>
        </div>
      </div>

      {/* Main Content: Clinics Table */}
      <div className="container mx-auto px-6 py-16">
        <div className="overflow-x-auto rounded-lg shadow-md" data-aos="fade-up">
          <table className="w-full text-left text-gray-700">
            <thead className="bg-gray-200 font-poppins">
              <tr>
                <th className="px-6 py-3">සායනයේ නම</th>
                <th className="px-6 py-3">වෛද්‍යවරයාගේ නම</th>
                <th className="px-6 py-3">දිනය</th>
                <th className="px-6 py-3">වේලාව</th>
                <th className="px-6 py-3">ස්ථානය</th>
              </tr>
            </thead>
            <tbody className="font-lato">
              {clinics.map((clinic) => (
                <tr key={clinic._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{clinic.clinicName}</td>
                  <td className="px-6 py-4">{clinic.doctorName}</td>
                  <td className="px-6 py-4">{clinic.day}</td>
                  <td className="px-6 py-4">{clinic.time}</td>
                  <td className="px-6 py-4">{clinic.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClinicSchedulePage;