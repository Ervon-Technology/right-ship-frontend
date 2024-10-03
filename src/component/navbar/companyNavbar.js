import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice'; // Import the logout action

const CompanyNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    setDropdownOpen(false); // Close the dropdown
    navigate('/');
  };

  const handleDropdownItemClick = () => {
    setDropdownOpen(false); // Close the dropdown
  };

  return (
    <nav className="flex items-center h-full">
      <div className="container mx-auto flex justify-between items-center py-1">
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4 mt-1">
          
          <div className="relative">
            <button
              className="text-black border-l-2 px-4 py-2 flex items-center transition duration-200"
              onClick={toggleDropdown}
            >
              <CgProfile size={24} /> {/* Adjust the size as needed */}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleDropdownItemClick} // Close dropdown on click
                >
                  Profile
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleLogout} // Call handleLogout on click
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CompanyNavbar;
