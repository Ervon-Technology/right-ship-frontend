import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Header2 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-12">
        <div className="flex items-center h-full">
          <Link>
            <a href="#" className="font-bold text-lg text-gray-800 mt-2 px-4">RIGHTSHIP</a>
          </Link> 
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-customBlue border border-blue-600 rounded hover:bg-blue-600 hover:text-white w-28">Login</button>
          <button className="px-3 py-1 text-red-700 bg-white rounded border border-red-700 hover:text-white hover:bg-red-700 w-28">Register</button>
          <div className="relative" ref={dropdownRef}>
            <button onClick={handleDropdownClick} className="flex px-3 py-1 text-gray-800 rounded font-bold hover:bg-blue-50">
              For employers <ChevronDown className='ml-1'/>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Company Login</a>
                <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Company Registration</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header2;
