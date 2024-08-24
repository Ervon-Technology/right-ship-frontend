import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DefaultNavbar from '../navbar/defaultNavbar';
import JobFooter from '../footer/JobFooter';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <header>
      <DefaultNavbar/>
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

export default DefaultLayout;
