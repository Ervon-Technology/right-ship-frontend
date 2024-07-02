import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Header2 = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

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
    <nav className={`w-full bg-white border-b border-gray-300 sticky top-0 z-50 transition-transform duration-300 ${visible ? '' : 'transform -translate-y-full'}`}>
      <div className="flex justify-between mx-20 items-center h-12">
        <div className="flex items-center h-full">
          <Link to="/" className="font-bold text-lg text-gray-800">RIGHTSHIP</Link>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-customBlue border border-blue-600 rounded hover:bg-blue-600 hover:text-white w-28">Login</button>
          <button className="px-3 py-1 rounded text-white bg-red-700 hover:bg-red-900 w-28">Register</button>
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
