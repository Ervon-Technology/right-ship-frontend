import React from 'react';
import { useSelector } from 'react-redux';
import DefaultNavbar from './defaultNavbar';
import CompanyNavbar from './companyNavbar';
import EmployeeNavbar from './employeeNavbar';


const Navbar = () => {
  const user = useSelector(state => state.auth.user);

  const renderNavbar = () => {
    if (!user) {
      return <DefaultNavbar />;
    }

    if (user.role === 'company') {
      return <CompanyNavbar />;
    }

    if (user.role === 'employee') {
      return <EmployeeNavbar />;
    }

    return <DefaultNavbar />;
  };

  return renderNavbar();
};

export default Navbar;
