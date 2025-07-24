"use client";

import React, { useState } from 'react';

// Define the type for a single directory entry
interface DirectoryEntry {
  _id: string;
  locationName: string;
  extensionNumber: string;
}

// Define the props for our component
interface DirectoryListProps {
  entries: DirectoryEntry[];
}

const DirectoryList = ({ entries }: DirectoryListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.extensionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by location or extension..."
          className="w-full max-w-lg mx-auto block p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Directory Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-200 font-poppins">
            <tr>
              <th className="px-6 py-3">Location / Department</th>
              <th className="px-6 py-3">Extension Number</th>
            </tr>
          </thead>
          <tbody className="font-lato">
            {filteredEntries.map((entry) => (
              <tr key={entry._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{entry.locationName}</td>
                <td className="px-6 py-4">{entry.extensionNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectoryList;