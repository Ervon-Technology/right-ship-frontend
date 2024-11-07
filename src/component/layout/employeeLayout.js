import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeNavbar from '../navbar/employeeNavbar';
import JobFooter from '../footer/JobFooter'

const EmployeeLayout = ({ children }) => {
  return (
    <div>
      <header>
      <EmployeeNavbar/>
      </header>
      <main>
      { children ? children :<Outlet /> }
      </main>
      <footer>
        <JobFooter />
      </footer>
    </div>
  );
};

export default EmployeeLayout;
