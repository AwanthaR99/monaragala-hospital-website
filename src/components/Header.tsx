"use client";

import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { FaChevronDown, FaUserCircle, FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/images/logo.png" alt="Monaragala Hospital Logo" width={40} height={40} className="h-10 w-10"/>
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-base sm:text-lg leading-tight text-gray-800">District General Hospital Monaragala</span>
           
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-6">
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
            <div className="h-6 w-px bg-gray-300 mx-4"></div>
            <SearchBar />
            {status === 'authenticated' ? (
              <div className="ml-4 flex items-center gap-3">
                 <Link href="/staff/dashboard"><span className="font-semibold text-sm text-gray-700 hover:text-blue-600 cursor-pointer">{session.user?.name}</span></Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-600">Logout</button>
              </div>
            ) : (
              <Link href="/login" className="ml-4 text-gray-600 hover:text-blue-600" aria-label="Staff Login">
                <FaUserCircle size={26} />
              </Link>
            )}
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-2">
            <SearchBar />
            {status !== 'authenticated' && (
              <Link href="/login" className="text-gray-600 hover:text-blue-600" aria-label="Staff Login">
                <FaUserCircle size={26} />
              </Link>
            )}
            <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu" className="ml-2">
                <FaBars className="h-6 w-6 text-gray-700" />
            </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <Transition show={isMobileMenuOpen} as={Fragment}>
        <div className="md:hidden fixed inset-0 bg-white z-[100] p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8 flex-shrink-0">
                <span className="font-poppins font-bold text-xl">Menu</span>
                <button onClick={closeMobileMenu} aria-label="Close menu">
                    <FaTimes className="h-6 w-6" />
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              <ul className="flex flex-col space-y-4">
                  {navLinks.map(link => (
                      <li key={link.name}>
                          {link.children ? (
                              <div>
                                  <span className="font-lato font-bold text-lg text-gray-800">{link.name}</span>
                                  <ul className="pl-4 mt-2 space-y-2">
                                      {link.children.map(child => (
                                          <li key={child.name}>
                                              <Link href={child.href} onClick={closeMobileMenu} className="font-lato text-gray-600 hover:text-blue-600 block py-2">
                                                  {child.name}
                                              </Link>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          ) : (
                              <Link href={link.href!} onClick={closeMobileMenu} className="font-lato font-bold text-lg text-gray-800 hover:text-blue-600 block py-2">
                                  {link.name}
                              </Link>
                          )}
                      </li>
                  ))}
              </ul>
            </div>
            
            {status === 'authenticated' && (
                <div className="mt-auto pt-6 border-t flex-shrink-0">
                    <div className="flex items-center mb-4">
                        <FaUserCircle size={24} className="mr-3"/>
                        <span className="font-semibold text-lg text-gray-800">{session.user?.name}</span>
                    </div>
                    <button 
                        onClick={() => { signOut({ callbackUrl: '/' }); closeMobileMenu(); }} 
                        className="w-full text-left bg-red-500 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
      </Transition>
    </header>
  );
};

export default Header;