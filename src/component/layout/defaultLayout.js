import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DefaultNavbar from '../navbar/defaultNavbar';

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
        <p>Default Footer</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;
