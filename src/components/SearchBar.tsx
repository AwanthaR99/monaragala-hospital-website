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

  useEffect(() => {
    // Debounce search to avoid too many API calls
    if (query.length > 2) {
      setIsLoading(true);
      const delayDebounceFn = setTimeout(() => {
        fetch(`/api/search?query=${query}`)
          .then(res => res.json())
          .then(data => {
            setResults(data);
            setIsLoading(false);
          });
      }, 500); // 500ms delay

      return () => clearTimeout(delayDebounceFn);
    } else {
      setResults([]);
    }
  }, [query]);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

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
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-12"
          >
            <div className="relative">
              <input
                type="search"
                name="search"
                placeholder="වෙබ් අඩවිය සොයන්න..."
                className="w-full pl-4 pr-10 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
            {/* Search Results Dropdown */}
            {(results.length > 0 || isLoading) && (
              <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-80 overflow-y-auto">
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
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="ml-4 p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
        aria-label="Toggle search bar"
      >
        {isOpen ? <FaTimes size={18} /> : <FaSearch size={18} />}
      </button>
    </div>
  );
};

export default SearchBar;