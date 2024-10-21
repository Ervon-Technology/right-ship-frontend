import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const DefaultNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <>
      <div className="border-b-2">
        <div className="w-10/12 mx-auto">

          <nav className="flex items-center justify-between py-4 bg-white text-black">
            
            {/* ------------------------------------------------------------  */}
            <div className="flex items-center space-x-4 px-4">
              <Link to="/" className='flex items-center'>
                <img src={Logo} alt="Logo" height={40} width={40} />
                <span className="font-bold text-gray-800 px-4">RIGHTSHIPS</span>
              </Link>
              <div className="hidden md:flex space-x-4 font-bold text-gray-800 border border-customBlue rounded cursor-pointer p-2 px-6">
                <Link to="/jobs">Jobs</Link>
              </div>
            </div>
            {/* ------------------------------------------------------------ */}
            
            
            {/* ------------------------------------------------------------  */}
            <div className=" md:flex hidden items-center space-x-6 z-20">
              <Link to='/login'>
                <button className="text-customBlue border border-customBlue font-semibold p-2 px-6 hover:bg-customBlue hover:text-white rounded">
                  Candidate Login
                </button>
              </Link>
              <Link to={"/company"} className="flex items-center space-x-2">
                <span>Company Login</span>
              </Link>
            </div>
            {/* ------------------------------------------------------------  */}

            {/* ------------------------------------------------------------  */}
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
            {/* ------------------------------------------------------------  */}
          </nav>

          {/* Full-width mobile menu */}
          <div
            className={`fixed top-0 z-50 right-0 w-full h-full bg-white shadow-lg border-l border-gray-200 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
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
              <Link to="/" className='flex items-center' onClick={handleMenuItemClick}>
                <img src={Logo} alt="Logo" height={40} width={40} />
                <span className="font-bold text-gray-800 px-4">RIGHTSHIPS</span>
              </Link>
              <Link to="/jobs" className="block" onClick={handleMenuItemClick}>Jobs</Link>
              <Link to='/login' onClick={handleMenuItemClick}>
                <button className="text-customBlue border border-customBlue font-semibold p-2 px-6 hover:bg-customBlue hover:text-white rounded">
                  Candidate Login
                </button>
              </Link>
              <Link to='/company' onClick={handleMenuItemClick}>
                <button className="bg-customBlue hover:bg-customBlue2 font-semibold text-white px-4 py-2 rounded">
                  Company Login
                </button>
              </Link>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black opacity-50 z-[1]"
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default DefaultNavbar;
