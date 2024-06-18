import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
// import axios from 'axios';
// useEffect(() => {
//   // Replace with your actual backend API endpoint
//   axios.get('/api/dashboard-data')
//     .then(response => {
//       setData(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching the data:', error);
//     });
// }, []);

function EmployeerDashboard() {
  const [data, setData] = useState({
    totalAppliedCandidates: 0,
    thisMonthAppliedCandidates: 0,
    totalShortlisted: 0,
    yesterdayAppliedCandidates: 0,
    totalActiveJobPost: 0,
    totalContactViewList: 0,
  });


  return (
    <div className="flex flex-col mb-10">
      <main className="w-full max-w-6xl p-4 bg-white rounded-lg max-h-screen">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {/* Data Cards without Links */}
          <div className="p-6 rounded">
            <div>
              <h2 className="text-sm font-semibold text-white bg-customBlue py-3 flex justify-center">Total Applied Candidates</h2>
              <div className='data'>
                <p className="text-4xl font-bold bg-sky-100 py-8 flex justify-center text-black">{data.totalAppliedCandidates}</p>
              </div>
            </div>      
          </div>
          <div className="p-6 rounded">
            <div>
              <h2 className="text-sm font-semibold text-white bg-customBlue py-3 flex justify-center">This Month Applied Candidates</h2>
              <div className='data'>
                <p className="text-4xl font-bold bg-sky-100 py-8 flex justify-center text-black">{data.thisMonthAppliedCandidates}</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded">
            <div>
              <h2 className="text-sm font-semibold text-white bg-customBlue py-3 flex justify-center">Total Shortlisted</h2>
              <div className='data'>
                <p className="text-4xl font-bold bg-sky-100 py-8 flex justify-center text-black">{data.totalShortlisted}</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded">
            <div>
              <h2 className="text-sm font-semibold text-white bg-customBlue py-3 flex justify-center">Yesterday Applied Candidates</h2>
              <div className='data'>
                <p className="text-4xl font-bold bg-sky-100 py-8 flex justify-center text-black">{data.yesterdayAppliedCandidates}</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded">
            <div>
              <h2 className="text-sm font-semibold text-white bg-customBlue py-3 flex justify-center">Total Active Job Post</h2>
              <div className='data'>
                <p className="text-4xl font-bold bg-sky-100 py-8 flex justify-center text-black">{data.totalActiveJobPost}</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded">
            <div>
              <h2 className="text-sm font-semibold text-white bg-customBlue py-3 flex justify-center">Total Contact View List</h2>
              <div className='data'>
                <p className="text-4xl font-bold bg-sky-100 py-8 flex justify-center text-black">{data.totalContactViewList}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-8 justify-end">
          <Link to="/add-job-basics" className="block">
            <button className="px-6 w-4/5 mx-6 py-2 font-semibold text-white bg-customBlue rounded shadow-md">
              Create Job
            </button>
          </Link>
          <Link to="/manage-users" className="block">
            <button className="px-6 w-4/5 mx-6  py-2 font-semibold text-white bg-customBlue rounded shadow-md">
              Manage Users
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default EmployeerDashboard;
