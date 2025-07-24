"use client";

import React, { useEffect, useState } from 'react';
import { client } from '@/lib/sanityClient';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement
);

interface StatData {
  month: number;
  opdPatients: number;
  surgeries: number;
  year: number;
}

// Helper to convert month number to name
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// CORRECTED CHART OPTIONS
const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        font: {
            size: 18,
            family: 'Poppins'
        }
      },
    },
};

const StatisticsPage = () => {
  const [chartData, setChartData] = useState<StatData[]>([]);

  useEffect(() => {
    const getStatsData = async () => {
      const query = `*[_type == "statistics"] | order(year asc, month asc)`;
      const data = await client.fetch(query, {}, { cache: 'no-store' });
      setChartData(data);
    };
    getStatsData();
  }, []);

  const monthlyOPDData = {
    labels: chartData.map(d => monthNames[d.month - 1]),
    datasets: [{
      label: 'OPD Patients',
      data: chartData.map(d => d.opdPatients),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const monthlySurgeryData = {
    labels: chartData.map(d => monthNames[d.month - 1]),
    datasets: [{
      label: 'Surgeries',
      data: chartData.map(d => d.surgeries),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-poppins font-bold text-gray-800">Hospital Statistics</h1>
          <p className="text-lg font-lato text-gray-600 mt-2">
            A transparent look at our services over time.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {chartData.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up">
                    {/* CORRECTED WAY TO SET TITLE */}
                    <Bar 
                        options={{...chartOptions, plugins: {...chartOptions.plugins, title: {...chartOptions.plugins.title, text: 'Monthly OPD Visits'}}}} 
                        data={monthlyOPDData} 
                    />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="100">
                    {/* CORRECTED WAY TO SET TITLE */}
                    <Line 
                        options={{...chartOptions, plugins: {...chartOptions.plugins, title: {...chartOptions.plugins.title, text: 'Monthly Surgeries'}}}} 
                        data={monthlySurgeryData} 
                    />
                </div>
            </div>
        ) : (
            <div className="text-center py-10">
                <p className="text-gray-500">Loading statistics or no data available...</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;