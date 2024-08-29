import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const DefaultNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-white text-black border-b-2">
        <div className="flex items-center space-x-4 px-4">
          <Link to="/" className='flex items-center'>
            <img src={Logo} alt="Logo" height={40} width={40} />
            <span className="font-bold text-gray-800 px-4">RIGHTSHIP</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/jobs">Jobs</Link>
          </div>
        </div>
        <div className=" md:flex hidden items-center space-x-6 z-20">
          <Link to='/login'><button className="text-customBlue border border-customBlue font-semibold p-2 px-6 hover:bg-customBlue hover:text-white rounded">Login</button></Link>
          <Link to='/register'><button className="bg-customBlue hover:bg-customBlue2 font-semibold text-white px-4 py-2 rounded">Register</button></Link>
          <div className="relative space-x-6">
            <button
              className="flex items-center space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>For Company</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link 
                  to="/company/login" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={handleDropdownItemClick}
                >
                  Login
                </Link>
                <Link 
                  to="/company/register" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={handleDropdownItemClick}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 z-50 right-0 w-64 h-full bg-white shadow-lg border-l border-gray-200 transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="px-4 flex flex-col space-y-4 relative">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-7 right-5 text-black focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Link to="/" className='flex items-center'>
            <img src={Logo} alt="Logo" height={40} width={40} />
            <span className="font-bold text-gray-800 px-4">RIGHTSHIP</span>
          </Link>
          <Link to="/myjobs" className="block">Jobs</Link>
          <Link to='/login'><button className="text-customBlue border border-customBlue font-semibold p-2 px-6 hover:bg-customBlue hover:text-white rounded">Login</button></Link>
          <Link to='/register'><button className="bg-customBlue hover:bg-customBlue2 font-semibold text-white px-4 py-2 rounded">Register</button></Link>
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
            >
              <span>For Company</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                <Link 
                  to="/company/login" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={handleDropdownItemClick}
                >
                  Login
                </Link>
                <Link 
                  to="/company/register" 
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={handleDropdownItemClick}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-50"
        ></div>
      )}
    </>
  );
};

export default DefaultNavbar;
