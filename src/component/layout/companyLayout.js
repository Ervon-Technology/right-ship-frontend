import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import SideNavbar from '../navbar/sideNavbar/sideNavbar';
import JobFooter from '../footer/JobFooter'
import Logo from '../../images/logo.png'

const CompanyLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navbar */}
      <nav className="w-64 bg-customBlue text-white fixed top-0 left-0 h-full">

        <div className='flex px-4 pt-4'>
          <img src={Logo} alt="Logo" className='text-white bg-white' height={100} width={38} />
          <span className="font-bold text-white ml-2 mt-2">RIGHTSHIPS</span>
        </div>

        <div className="p-4">
          <SideNavbar />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Top Navbar */}
        <header className=" fixed top-0 left-64 right-0 h-16 px-6 bg-white border-b-2">
          <Navbar />
        </header>

        {/* Content Area */}
        <main className="mt-14 flex-col min-h-screen">

          {children ? children : <Outlet />}

        </main>
        <JobFooter />
      </div>

    </div>
  );
};

export default CompanyLayout;