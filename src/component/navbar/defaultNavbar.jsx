import React, { useState, useEffect } from 'react';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { HiBriefcase } from 'react-icons/hi';

const DefaultNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past the threshold
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleDropdownToggle = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  return (
    <div 
      className={`border-b-2 bg-white fixed w-full top-0 transition-transform duration-300 z-10 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-14">
        <nav className="flex items-center justify-between py-4">
          {/* Logo - Left Side */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Logo" height={40} width={40} />
              <span className="font-bold text-gray-800 ml-2">RIGHTSHIPS</span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="hover:text-customBlue">Home</Link>
            <Link to="/about-us" className="hover:text-customBlue">About Us</Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('services')}
                className="hover:text-customBlue flex items-center"
              >
                Services
                <svg 
                  className="w-4 h-4 ml-1 transform transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen === 'services' && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md z-50 min-w-[200px] mt-2">
                  <Link
                    to="/service-1"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuItemClick}
                  >
                    Service 1
                  </Link>
                  <Link
                    to="/service-2"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuItemClick}
                  >
                    Service 2
                  </Link>
                  <Link
                    to="/service-3"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuItemClick}
                  >
                    Service 3
                  </Link>
                </div>
              )}
            </div>

            {/* Courses Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleDropdownToggle('courses')}
                className="hover:text-customBlue flex items-center"
              >
                Courses
                <svg 
                  className="w-4 h-4 ml-1 transform transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen === 'courses' && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md z-50 min-w-[200px] mt-2">
                  <Link
                    to="/course-1"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuItemClick}
                  >
                    Course 1
                  </Link>
                  <Link
                    to="/course-2"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuItemClick}
                  >
                    Course 2
                  </Link>
                  <Link
                    to="/course-3"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={handleMenuItemClick}
                  >
                    Course 3
                  </Link>
                </div>
              )}
            </div>

            <Link to="/contact-us" className="hover:text-customBlue">Contact Us</Link>
          </div>

          {/* Jobs Button - Right Side */}
          <div className="hidden lg:flex items-center">
            <Link to="/jobs">
              <button className="bg-customBlue text-white px-4 py-2 rounded-md hover:bg-customBlue2 flex">
                <HiBriefcase className="w-5 h-5 mr-2" /> Jobs
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 lg:hidden">
              <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-4 right-4 text-black focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <Link 
                  to="/" 
                  onClick={handleMenuItemClick} 
                  className="text-2xl hover:text-customBlue"
                >
                  Home
                </Link>
                <Link 
                  to="/about-us" 
                  onClick={handleMenuItemClick} 
                  className="text-2xl hover:text-customBlue"
                >
                  About Us
                </Link>
                <div className="relative">
                  <button 
                    onClick={() => handleDropdownToggle('mobileServices')}
                    className="text-2xl hover:text-customBlue"
                  >
                    Services
                  </button>
                  {dropdownOpen === 'mobileServices' && (
                    <div className="mt-4 space-y-2">
                      <Link 
                        to="/service-1" 
                        onClick={handleMenuItemClick}
                        className="block text-lg"
                      >
                        Service 1
                      </Link>
                      <Link 
                        to="/service-2" 
                        onClick={handleMenuItemClick}
                        className="block text-lg"
                      >
                        Service 2
                      </Link>
                      <Link 
                        to="/service-3" 
                        onClick={handleMenuItemClick}
                        className="block text-lg"
                      >
                        Service 3
                      </Link>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button 
                    onClick={() => handleDropdownToggle('mobileCourses')}
                    className="text-2xl hover:text-customBlue"
                  >
                    Courses
                  </button>
                  {dropdownOpen === 'mobileCourses' && (
                    <div className="mt-4 space-y-2">
                      <Link 
                        to="/course-1" 
                        onClick={handleMenuItemClick}
                        className="block text-lg"
                      >
                        Course 1
                      </Link>
                      <Link 
                        to="/course-2" 
                        onClick={handleMenuItemClick}
                        className="block text-lg"
                      >
                        Course 2
                      </Link>
                      <Link 
                        to="/course-3" 
                        onClick={handleMenuItemClick}
                        className="block text-lg"
                      >
                        Course 3
                      </Link>
                    </div>
                  )}
                </div>
                <Link 
                  to="/contact-us" 
                  onClick={handleMenuItemClick} 
                  className="text-2xl hover:text-customBlue"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/jobs" 
                  onClick={handleMenuItemClick}
                >
                  <button className="bg-customBlue text-white px-6 py-3 rounded-lg text-xl hover:bg-customBlue2">
                    Jobs
                  </button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default DefaultNavbar;