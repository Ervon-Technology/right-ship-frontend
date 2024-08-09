import React, { useState } from 'react';
import { Link} from 'react-router-dom';

const Navbar = () => {
  // let navigate=useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-white text-black border-b-2">
        <div className="flex items-center space-x-4 px-10">
          <span className="font-semibold"><a href="#">Rightship</a></span>
          <div className="hidden md:flex space-x-4">
            <span><a href="/myjobs">Jobs</a></span>
            <span><a href="#">Companies</a></span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
        <a href='/login'> <button className="text-blue-700 border p-2 px-6 hover:bg-blue-800 hover:text-white rounded">Login</button></a>
          <a href='/signup-number'> <button className="bg-blue-800 text-white px-4 py-2 rounded">Register</button></a>
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>For Employers</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <a href="/companyLogin" className="block px-4 py-2 hover:bg-gray-200">For Company</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">For Admin</a>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <aside className="md:hidden bg-white border-t border-gray-200">
          <div className="p-4 flex flex-col space-y-4">
            <a href="#" className="block">Rightship </a>
            <a href="/myjobs" className="block">Jobs</a>
            <a href="#" className="block">Companies</a>
            <button className="text-blue-700 border p-2 px-6 hover:bg-indigo-900 hover:text-white rounded" ><a href='/login'>Login</a></button>
            <button className="bg-indigo-950 text-white px-4 py-2 rounded"><a href='/signup-number'>Register</a></button>
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>For Employers</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">For Company</a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-200">For Admin</a>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;
