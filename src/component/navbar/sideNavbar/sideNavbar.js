import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import CompanySidebar from './companySideNavbar';
import EmployeeSidebar from './employeeSideNavbar';



const SideNavbar = ({}) => {

    const user = useSelector(state => state.auth.user);
    const userBoolean = !!user;

    const renderNavbar = () => {
        if (!userBoolean) {
          return "";
        }
    
        if (user.role === 'company') {
          return <CompanySidebar />;
        }
    
        if (user.role === 'employee') {
          return <EmployeeSidebar />;
        }
    
        return "";
      };

    return (
        renderNavbar()
    )
};
export default SideNavbar;
