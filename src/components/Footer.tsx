import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Link data for easier management
const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Departments', href: '/departments' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Vacancies', href: '/vacancies' },
];

const patientServicesLinks = [
  { name: 'Clinic Schedule', href: '/clinics' },
  { name: 'Doctor Directory', href: '/doctors' },
  { name: 'Laboratory Services', href: '/patient-services/labs' },
  { name: 'Visiting Hours', href: '/patient-services/visiting-hours' },
{ name: 'Tenders', href: '/tenders' },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Hospital Info */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="bg-white p-1 rounded-full">
                <Image 
                  src="/images/logo.png" 
                  alt="Monaragala Hospital Logo"
                  width={40}
                  height={40}
                />
              </div>
              <span className="font-poppins font-bold text-lg">
                DGH Monaragala
              </span>
            </Link>
            <p className="font-lato text-gray-400">
              District General Hospital, Monaragala, Sri Lanka.
            </p>
            <p className="font-lato text-gray-400 mt-2">
              Phone: 055-2276261
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-poppins font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patient Services */}
          <div>
            <h3 className="font-poppins font-bold mb-4">Patient Services</h3>
            <ul className="space-y-2">
              {patientServicesLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="font-poppins font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="https://web.facebook.com/people/District-General-Hospital-Monaragala/100064036752559/" className="text-gray-400 hover:text-white">
                {/* Placeholder for Facebook Icon */}
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </Link>
              {/* Add other social media icons here */}
            </div>
          </div>

        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} District General Hospital, Monaragala. All Rights Reserved.
        </div>
      </div>
     
    </footer>
  );
};

export default Footer;