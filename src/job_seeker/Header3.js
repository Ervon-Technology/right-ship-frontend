import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircleUserRound, CircleHelp, ChevronDown, Bell, MessageSquare } from 'lucide-react';
import Logo from '../job_seeker/Assets/Right_Ship_Logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header3 = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleUserDropdownClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleNotificationDropdownClick = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`bg-white border-b py-5 px-8 border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <ToastContainer />
      <nav className=" mx-auto flex justify-between items-center h-6">
        <div className="flex items-center h-full">
          <Link to="/" className='flex'>
            <img src={Logo} alt="Logo" height={40} width={40} />
            <a href="#" className="font-bold text-gray-800 mt-2 px-4">RIGHTSHIP</a>
          </Link>
          <Link to="/jobs_home">
            <a href="#" className="text-black font-bold hover:text-customBlue hover:font-bold mx-4">Jobs</a>
          </Link>
          <Link to="/companies">
            <a href="#" className="text-black font-bold hover:text-customBlue hover:font-bold mx-4">Companies</a>
          </Link>
        </div>
        <div className="relative flex items-center space-x-8">
          <div className="flex items-center space-x-8">
            <a href="#help-support" className="text-black flex items-center font-bold"> <CircleHelp size={20}/>&nbsp; Help & Support &nbsp;</a>
            <div className="relative" ref={notificationDropdownRef}>
              <button onClick={handleNotificationDropdownClick} className=" py-1 text-black-600 flex rounded font-bold">
                <Bell size={20} className='mx-2 mt-0.5'/> Notification <ChevronDown className='mx-2'/>
              </button>
              {notificationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                  <Link to="/notifications" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold">View All Notifications</Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-semibold">Notification Settings</Link>
                </div>
              )}
            </div>
          </div>
          <div className="relative" ref={userDropdownRef}>
            <button onClick={handleUserDropdownClick} className=" py-1 text-black-600 flex rounded font-bold">
              <CircleUserRound size={20} className='mx-2 mt-0.5'/> User <ChevronDown  className='mx-2'/>
            </button>
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg pt-1">
                <Link to="/candidate_profile" className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex font-semibold"><MessageSquare size={20} className='mt-1 me-1'/>Profile</Link>
                <Link to="/my_jobs" className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex font-semibold"><MessageSquare size={20} className='mt-1 me-1'/>My Jobs</Link>
                <Link to="/settings" className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex font-semibold"><MessageSquare size={20} className='mt-1 me-1'/>Settings</Link>
                <Link to="/" className="px-4 py-2 mt-1 text-gray-800 hover:bg-gray-100 flex  justify-center border border-t font-bold">Sign Out</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header3;
