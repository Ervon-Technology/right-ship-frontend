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
      </div>
    </nav>
  );
};

export default CompanyNavbar;
