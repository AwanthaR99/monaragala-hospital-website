"use client";

import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-gray-50 focus:outline-none"
      >
        <h3 className="text-xl font-poppins font-semibold text-blue-600">{title}</h3>
        <FaChevronDown 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-4 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;