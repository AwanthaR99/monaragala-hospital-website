"use client";

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaBed, FaUserMd, FaUsers, FaStethoscope } from 'react-icons/fa';

const stats = [
  { icon: <FaBed size={40} />, end: 1500, label: 'ඇඳන් සංඛ්‍යාව' },
  { icon: <FaUserMd size={40} />, end: 40, label: 'විශේෂඥ වෛද්‍යවරු' },
  { icon: <FaUsers size={40} />, end: 35000, suffix: '+', label: 'වාර්ෂිකව ප්‍රතිකාර ලබන රෝගීන්' },
  { icon: <FaStethoscope size={40} />, end: 25, label: 'විශේෂ සායන' },
];

const StatsCounter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1,    // Trigger when 10% of the component is visible
  });

  return (
    <section ref={ref} className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-poppins font-bold">අපි නේවාසික රෝගීන් සඳහා පුළුල් පරාසයක සුවවීමේ සහ නිවාරණ සෞඛ්‍ය සේවා සපයන්නෙමු.</h2>
          <p className="font-lato mt-3">සංඛ්‍යාලේඛන - 2024</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-yellow-300 mb-2 flex justify-center">{stat.icon}</div>
              {inView && (
                <span className="text-4xl font-poppins font-bold">
                  <CountUp end={stat.end} duration={3} separator="," />
                  {stat.suffix}
                </span>
              )}
              <p className="font-lato mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;