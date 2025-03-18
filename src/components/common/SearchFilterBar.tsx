"use client";
import React, { useState, useRef, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { IoChevronDown, IoChevronUp, IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
// Remove the direct import and use the image as a prop or public path
import Avatar from '@/assets/avatars/pe.png';

const SearchFilterBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-full md:w-2/5">
        <input
          type="text"
          placeholder="Search"
          className="w-full max-w-full px-4 py-2 pr-10 bg-white border rounded-lg focus:outline-none focus:border-gray-400"
        />
        <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="border border-gray-300 px-3 py-1 rounded-md flex items-center space-x-2">
          <span className="text-sm text-gray-600">Academic Year :</span>
          <span className="text-sm font-medium">2025 / 2026</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex items-center justify-center border border-gray-300">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
          <div className="w-6 h-6 flex items-center justify-center border border-gray-300">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        {/* User Profile Section with Dropdown */}
        <div className="relative ml-4" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              {/* Updated image handling similar to ProfileCard component */}
              <img
            src={Avatar.src}
            alt="Profile"
            className="h-full w-full object-cover"
          />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Username</span>
              <span className="text-xs text-gray-500">Administrator</span>
            </div>
            <div className="ml-1 text-gray-600">
              {isDropdownOpen ? 
                <IoChevronUp className="text-lg transition-transform duration-200" /> : 
                <IoChevronDown className="text-lg transition-transform duration-200" />
              }
            </div>
          </div>
          
          {/* Enhanced Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg z-10 border border-gray-100 overflow-hidden transition-all duration-200 ease-in-out">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-medium">Signed in as</p>
                <p className="text-xs text-gray-600 font-medium">username@example.com</p>
              </div>
              <ul className="py-1">
                <li>
                  <a href="#profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150">
                    <IoPersonOutline className="mr-3 text-gray-500" />
                    Your Profile
                  </a>
                </li>
                <li className="border-t border-gray-100">
                  <a href="#logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                    <IoLogOutOutline className="mr-3" />
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;