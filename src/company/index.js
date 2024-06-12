import React, { useState } from 'react';
import Empteam from './Navbar';
const Company = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="navbar" className="flex flex-col h-screen">
      {/* Header section */}
      <nav className="bg-white px-4 py-2 border-b flex justify-between items-center z-10">
        <button
          onClick={toggleNavbar}
          className="text-black bg-none p-1 rounded burgerMenu"
        >
          {isOpen ? (
            <img
              width="25"
              height="25"
              src="https://img.icons8.com/fluent-systems-filled/48/000000/x.png"
              alt="close-icon"
            />
          ) : (
            <div className="space-y-1.5">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </div>
          )}
        </button>
        <div className="flex items-center justify-end flex-1">
          <div className="content1 m-3 px-3 flex text-sm font-bold">
            <img
              width="25"
              height="25"
              className="mx-4"
              src="https://img.icons8.com/material-rounded/48/user-male-circle.png"
              alt="user-male-circle"
            />
            <h5 className="mt-0.5">Help & Support</h5>
          </div>
          <div className="content2 m-3 px-3 flex text-sm font-bold">
            <img
              width="25"
              height="25"
              className="mx-4"
              src="https://img.icons8.com/material-sharp/24/appointment-reminders--v1.png"
              alt="appointment-reminders--v1"
            />
            <h5 className="mt-0.5">Notification</h5>
            <img
              width="25"
              height="10"
              className="ms-4"
              src="https://img.icons8.com/windows/32/expand-arrow--v1.png"
              alt="expand-arrow--v1"
            />
          </div>
          <div className="content3 m-3 px-3 flex text-sm font-bold">
            <img
              width="25"
              height="25"
              className="mx-4"
              src="https://img.icons8.com/material-rounded/48/user-male-circle.png"
              alt="user-male-circle"
            />
            <h5 className="mt-0.5">User</h5>
            <img
              width="25"
              height="10"
              className="ms-4"
              src="https://img.icons8.com/windows/32/expand-arrow--v1.png"
              alt="expand-arrow--v1"
            />
          </div>
        </div>
      </nav>

      {/* Main section containing the sidebar, team component, and footer */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-20 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out bg-customBlue w-64 p-4 h-full`}
        >
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={toggleNavbar}
              className="text-white pt-3 px-4 flex text-sm"
            >
              <img
                width="25"
                height="25"
                className="me-2"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/multiply.png"
                alt="multiply"
              />
              <h5 className="mt-0.5 text-sm">
                {isOpen ? 'Collapse' : 'Expand'}
              </h5>
            </button>
          </div>
          <nav>
            <ul>
              <li className="text-white p-4 flex">
                <img
                  width="24"
                  height="24"
                  className="me-2"
                  src="https://img.icons8.com/windows/32/FFFFFF/plus-math.png"
                  alt="plus-math"
                />
                <a href="/" className="mt-0.5 text-sm">
                  Create New
                </a>
              </li>
              <li className="text-white p-4 flex">
                <img
                  width="20"
                  height="20"
                  className="ms-0.5 me-2.5"
                  src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/FFFFFF/external-jobs-social-media-basic-1-sbts2018-outline-sbts2018.png"
                  alt="external-jobs-social-media-basic-1-sbts2018-outline-sbts2018"
                />
                <a href="/" className="mt-0.5 text-sm">
                  Jobs
                </a>
              </li>
              <li className="text-white p-4 flex">
                <img
                  width="22"
                  height="22"
                  className="me-2.5"
                  src="https://img.icons8.com/external-solid-design-circle/64/FFFFFF/external-Candidates-job-services-solid-design-circle.png"
                  alt="external-Candidates-job-services-solid-design-circle"
                />
                <a href="/" className="mt-0.5 text-sm">
                  Candidates
                </a>
              </li>
              <li className="text-white p-4 flex">
                <img
                  width="20"
                  height="20"
                  className="me-2.5"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png"
                  alt="chat--v1"
                />
                <a href="/" className="mt-0.5 text-sm">
                  Manage Users
                </a>
              </li>
              <li className="text-white p-4 flex">
                <img
                  width="20"
                  height="20"
                  className="me-2.5"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png"
                  alt="chat--v1"
                />
                <a href="/" className="mt-0.5 text-sm">
                  Support
                </a>
              </li>
              <li className="text-white p-4 flex">
                <img
                  width="20"
                  height="20"
                  className="me-2.5"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png"
                  alt="chat--v1"
                />
                <a href="/" className="mt-0.5 text-sm">
                  Settings
                </a>
              </li>
              <li className="text-white p-4 flex">
                <img
                  width="20"
                  height="20"
                  className="me-2.5"
                  src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png"
                  alt="chat--v1"
                />
                <a href="/" className="mt-0.5 text-sm">
                  Sign Out
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main content area */}
        <div className="flex-1 px-5 py-2 relative overflow-y-auto">
          {/* TEAM component */}
          <div className={`absolute right-0 top-0 mt-10 ${isOpen ? 'w-3/3 right-8' : 'w-full'}`}>
            <Empteam />
          </div>
        </div>
      </div>

      {/* Footer section */}
      <footer className="bg-white px-4 py-2 border-t z-10">
        <div className="container mx-auto">
          {/* Footer content here */}
        </div>
      </footer>
    </div>
  );
};

export default Company;
