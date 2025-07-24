"use client";

import React, { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown, FaUserCircle } from 'react-icons/fa';
import SearchBar from '@/components/SearchBar';
import { useSession, signOut } from 'next-auth/react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Patient Services', href: '/clinics' },
  { name: 'Departments', href: '/departments' },
  { name: 'News & Events', href: '/news' },
  { 
    name: 'About Us', 
    children: [
      { name: 'Our History & Vision', href: '/about' },
      { name: 'Awards & Achievements', href: '/about/awards' },
      { name: 'Statistics', href: '/statistics' }
    ] 
  },
  { name: 'Contact Us', href: '/contact' },
];

const Header = () => {
  const { data: session, status } = useSession();

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
            className="h-12 w-12"
          />
          <span className="font-poppins font-bold text-xl text-gray-800">
            District General Hospital Monaragala
          </span>
        </Link>

        {/* Navigation Links, Search, and Login/Logout Wrapper */}
        <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.children ? (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex items-center gap-2 font-lato font-semibold text-gray-600 hover:text-[#1976D2] transition-colors">
                          {link.name}
                          <FaChevronDown className="h-3 w-3" />
                        </Menu.Button>
                      </div>
                      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 ">
                            {link.children.map((childLink) => (
                               <Menu.Item key={childLink.name}>
                                {({ active }) => (
                                  <Link href={childLink.href} className={`${ active ? 'bg-blue-500 text-white' : 'text-gray-900' } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                    {childLink.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link href={link.href!} className="font-lato font-semibold text-gray-600 hover:text-[#1976D2] transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="h-6 w-px bg-gray-300 mx-6"></div>
            <SearchBar />

            {/* DYNAMIC LOGIN/LOGOUT SECTION */}
            {status === 'authenticated' ? (
              // If user IS logged in
              <div className="ml-4 flex items-center gap-4">
                <Link href="/staff/dashboard">
                  <span className="font-semibold text-sm text-gray-700 hover:text-blue-600 cursor-pointer">{session.user?.name}</span>
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // If user is NOT logged in
              <Link href="/login" className="ml-4 text-gray-600 hover:text-blue-600" aria-label="Staff Login">
                <FaUserCircle size={28} />
              </Link>
            )}
        </div>
      </nav>
    </header>
  );
};

export default Header;