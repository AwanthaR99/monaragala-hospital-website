import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Patient Services', href: '/clinics' },
  { name: 'Departments', href: '/departments' },
  { name: 'News & Events', href: '/news' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/images/logo.png" 
            alt="Monaragala Hospital Logo"
            width={50}
            height={50}
            className="h-16 w-28" // Adjust size as needed
          />
          <span className="font-poppins font-bold text-xl text-gray-800">
            District General Hospital Monaragala
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="font-lato font-semibold text-gray-600 hover:text-[#1976D2] transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;