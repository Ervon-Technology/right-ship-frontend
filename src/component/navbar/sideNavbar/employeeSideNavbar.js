import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeSidebar = () => {
  return (
    <ul className="mt-6 space-y-2">
      <li>
        <Link to="/create-jobs" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M8 16h.01M16 16h.01M9 12h.01M15 12h.01M9 8h.01M15 8h.01M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Create Jobs
        </Link>
      </li>
      <li>
        <Link to="/jobs" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 100-4m0 4a2 2 0 11-4 0M5 11a2 2 0 100-4m0 4a2 2 0 11-4 0" />
          </svg>
          Jobs
        </Link>
      </li>
      <li>
        <Link to="/candidates" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V5a2 2 0 00-2-2H6a2 2 0 00-2 2v8m4 5v-1a1 1 0 011-1h6a1 1 0 011 1v1m-3-3a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          Candidates
        </Link>
      </li>
      <li>
        <Link to="/manage-user" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3M13 9l3 3-3 3" />
          </svg>
          Manage User
        </Link>
      </li>
      <li>
        <Link to="/support" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
          Support
        </Link>
      </li>
      <li>
        <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6h4m-2 4h.01M6 18l3-3a6 6 0 1110 0l3 3" />
          </svg>
          Settings
        </Link>
      </li>
      <li>
        <Link to="/sign-out" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Sign Out
        </Link>
      </li>
    </ul>
  );
};

export default EmployeeSidebar;
