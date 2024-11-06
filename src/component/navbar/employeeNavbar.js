import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CircleHelp, ChevronDown, Bell, UserRound, BriefcaseBusiness, Settings, LogOut } from 'lucide-react';
import Logo from '../../images/logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EmployeeNavbar = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null); // State to hold the profile photo URL
  const authState = useSelector((state) => state.auth);
  const employeeId = authState?.user?._id;

  const userDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile photo from the API
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/get`, {
          employee_id: employeeId,
        });
        const result = response.data.data[0];
        setProfilePhoto(result?.profile || ''); // Set the profile photo URL
      } catch (error) {
        console.error('Error fetching profile photo:', error);
      }
    };

    if (employeeId) {
      fetchProfilePhoto();
    }
  }, [employeeId]);

  const handleUserDropdownClick = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const handleNotificationDropdownClick = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
  };

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const MenuLink = ({ to, icon: Icon, label, onClick, children }) => (
    <Link
      to={to}
      className="px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center font-semibold"
      onClick={onClick}
    >
      {Icon && <Icon size={20} className="mr-2" />} {children || label}
    </Link>
  );

  return (
    <>
      <header className="bg-white border-b py-4 px-8 border-gray-200 sticky top-0 z-50">
        <ToastContainer />
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Logo" height={40} width={40} />
              <span className="font-bold text-gray-800 ml-4">RIGHTSHIPS</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-6 ml-8">
              <Link to="/jobs" className="text-black font-bold hover:text-customBlue">Jobs</Link>
            </div>
          </div>
          <div className='hidden sm:block'>
            <div className=" flex items-center space-x-6">
              <a href="/contact-us" className="text-black flex items-center font-bold">
                <CircleHelp size={20} className="mr-2" /> Help & Support
              </a>
              <div className="relative z-50" ref={notificationDropdownRef}>
                <button onClick={handleNotificationDropdownClick} className="flex items-center text-black font-bold">
                  <Bell size={20} className="mr-2" /> Notification
                </button>
              </div>
              <div className="relative z-50" ref={userDropdownRef}>
                <button onClick={handleUserDropdownClick} className="flex items-center text-black font-bold">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                      <span className="text-white">U</span>
                    </div>
                  )}
                  <ChevronDown className="ml-2" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                    <MenuLink to="/profile" icon={UserRound} label="Profile" onClick={() => setUserDropdownOpen(false)}>
                      {profilePhoto && (
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                      )}
                      Profile
                    </MenuLink>
                    <MenuLink to="/my-jobs" icon={BriefcaseBusiness} label="My Jobs" onClick={() => setUserDropdownOpen(false)} />
                    <MenuLink to="/settings" icon={Settings} label="Settings" onClick={() => setUserDropdownOpen(false)} />
                    <div className="border-t">
                      <MenuLink to="/" icon={LogOut} label="Sign Out" onClick={handleLogout} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button onClick={toggleOffCanvas} className="md:hidden text-black focus:outline-none" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Full-width mobile menu with higher z-index */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white shadow-lg z-[1000] transform ${
          isOffCanvasOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col space-y-4">
          <button onClick={toggleOffCanvas} className="text-black self-end absolute top-7 right-7" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Link className="flex px-6 py-3 border-b-2 font-bold">
            <span className="text-gray-800">MENU</span>
          </Link>
          <Link to="/jobs" className="text-black pb-4 px-6 font-semibold border-b-2 hover:text-customBlue" onClick={toggleOffCanvas}>Jobs</Link>

          <div className="pb-4 px-6 border-b-2">
            <div className="space-y-2">
              <MenuLink to="/profile" label="Profile" onClick={toggleOffCanvas}>
                {profilePhoto && (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-6 h-6 rounded-full object-cover mr-2"
                  />
                )}
                Profile
              </MenuLink>
              <MenuLink to="/my-jobs" icon={BriefcaseBusiness} label="My Jobs" onClick={toggleOffCanvas} />
              <MenuLink to="/settings" icon={Settings} label="Settings" onClick={toggleOffCanvas} />
              <MenuLink to="/" icon={LogOut} label="Sign Out" onClick={handleLogout} />
            </div>
          </div>
          <div className="pb-4 px-6 border-b-2">
            <button onClick={handleNotificationDropdownClick} className="w-full text-left text-black font-bold flex items-center justify-between">
              Notification
            </button>
          </div>
          <a href="/contact-us" className="px-6 text-black flex items-center font-bold">
            <CircleHelp size={20} className="mr-2" /> Help & Support
          </a>
        </div>
      </div>

      {isOffCanvasOpen && (
        <div
          onClick={toggleOffCanvas}
          className="fixed inset-0 bg-black opacity-50 z-[999]"
        ></div>
      )}
    </>
  );
};

export default EmployeeNavbar;
