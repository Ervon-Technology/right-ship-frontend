import React from 'react';
import { Link } from 'react-router-dom';

function EmployeerDashboard() {
  return (
    <div className="flex flex-col h-4/6 mt-5 my-10 bg-white">
      <main className="flex-1">
        <div className="flex flex-wrap p-2">
          {/* Six main buttons */}
          <div className="w-1/3 p-2">
            <Link to="/total-applied-candidates" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                Total Applied Candidates
              </button>
            </Link>
          </div>
          <div className="w-1/3 p-2">
            <Link to="/this-month-applied-candidates" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                This Month Applied Candidates
              </button>
            </Link>
          </div>
          <div className="w-1/3 p-2">
            <Link to="/total-shortlisted" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                Total Shortlisted
              </button>
            </Link>
          </div>
          <div className="w-1/3 p-2">
            <Link to="/yesterday-applied-candidates" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                Yesterday Applied Candidates
              </button>
            </Link>
          </div>
          <div className="w-1/3 p-2">
            <Link to="/total-active-job-post" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                Total Active Job Post
              </button>
            </Link>
          </div>
          <div className="w-1/3 p-2">
            <Link to="/total-contact-view-list" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                Total Contact View List
              </button>
            </Link>
          </div>

          {/* Two additional buttons below */}
          <div className="w-1/3 p-2 mt-4">
            <Link to="/add-job-basics" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                Create Job
              </button>
            </Link>
          </div>
          <div className="w-1/3 p-2 mt-4">
            <Link to="/preview-edit-job-detail" className="block">
              <button className="w-full h-24 bg-customBlue hover:bg-customBlue2 text-white font-bold rounded-lg shadow-md">
                Manage Users
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeerDashboard;
