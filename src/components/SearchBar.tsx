"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface SearchResult {
  _id: string;
  title: string;
  _type: string;
  slug?: string;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);
  
  // Fetch search results
  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(() => {
        fetch(`/api/search?query=${query}`)
          .then(res => res.json())
          .then(data => {
            setResults(data);
            setIsLoading(false);
          });
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setResults([]);
    }
  }, [query]);

  const getLinkHref = (item: SearchResult) => {
    if (item._type === 'news' && item.slug) return `/news/${item.slug}`;
    if (item._type === 'doctor') return '/doctors';
    if (item._type === 'department' && item.slug) return `/departments/${item.slug}`;
    if (item._type === 'clinic') return '/clinics';
    return '/';
  }

  return (
    <div ref={searchRef} className="relative flex items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-12 flex items-center"
          >
            <div className="relative">
                <input
                  type="search"
                  name="search"
                  placeholder="Search..."
                  // --- THIS IS THE KEY CHANGE ---
                  className="w-48 sm:w-64 px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaSearch className="text-gray-400" />
                </div>

                {/* Search Results Dropdown */}
                {(results.length > 0 || isLoading) && (
                  <div className="absolute top-12 w-full bg-white rounded-md shadow-lg max-h-80 overflow-y-auto z-10">
                    {isLoading ? (
                      <div className="p-4 text-gray-500">Loading...</div>
                    ) : (
                      results.map((item) => (
                        <Link key={item._id} href={getLinkHref(item)} onClick={() => setIsOpen(false)}>
                          <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0">
                            <p className="font-semibold text-gray-800">{item.title}</p>
                            <p className="text-xs text-gray-500 uppercase">{item._type}</p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
        aria-label="Toggle search bar"
      >
        {isOpen ? <FaTimes size={18} /> : <FaSearch size={18} />}
      </button>
    </div>
  );
};

export default SearchBar;