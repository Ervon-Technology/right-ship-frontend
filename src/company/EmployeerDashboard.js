import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EmployeerDashboard() {
  const [data, setData] = useState({
    totalAppliedCandidates: 100,
    thisMonthAppliedCandidates: 20,
    totalShortlisted: 50,
    yesterdayAppliedCandidates: 5,
    totalActiveJobPost: 10,
    totalContactViewList: 30,
  });
  const [verificationMessage, setVerificationMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchempdetail(localStorage.getItem('company_id'));
  }, []);

  const fetchempdetail = async (id) => {
    try {
      const response = await fetch('https://api.rightships.com/company/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_id: id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.code === 200) {
          checker(data.data);
        } else {
          setError('Some problems occurred.');
        }
      } else {
        setError('Failed to fetch data.');
      }
    } catch (error) {
      setError('An error occurred.');
    }
  };

  const checker = (data) => {
    sessionStorage.setItem('admin_verify', data[0].admin_verify);
    if (data[0].admin_verify === false) {
      setVerificationMessage('Your account is locked waiting for admin approval!');
    } else {
      setVerificationMessage(null);
    }
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const handleLogoutClick = () => {
    logout();
  };

  if (verificationMessage) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-75">
        <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
          {verificationMessage}
          <button
            onClick={handleLogoutClick}
            className="mt-4 px-6 py-2 font-semibold text-white bg-red-600 rounded shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-10">
      <main className="w-full max-w-6xl p-4 bg-white rounded-lg max-h-screen">
        {error && <div className="alert alert-error">{error}</div>}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {[
            { label: 'Total Applied Candidates', value: data.totalAppliedCandidates },
            { label: 'This Month Applied Candidates', value: data.thisMonthAppliedCandidates },
            { label: 'Total Shortlisted', value: data.totalShortlisted },
            { label: 'Yesterday Applied Candidates', value: data.yesterdayAppliedCandidates },
            { label: 'Total Active Job Post', value: data.totalActiveJobPost },
            { label: 'Total Contact View List', value: data.totalContactViewList },
          ].map((item, index) => (
            <div key={index} className="p-6 rounded">
              <div>
                <h2 className="text-sm font-semibold text-white bg-customBlue py-3 flex justify-center">{item.label}</h2>
                <div className="data">
                  <p className="text-4xl font-bold bg-sky-100 py-8 flex justify-center text-black">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-8 justify-end">
          <Link to="/add-job-basics" className="block">
            <button className="px-6 w-4/5 mx-6 py-2 font-semibold text-white bg-customBlue rounded shadow-md">
              Create Job
            </button>
          </Link>
          <Link to="/manage-users" className="block">
            <button className="px-6 w-4/5 mx-6 py-2 font-semibold text-white bg-customBlue rounded shadow-md">
              Manage Users
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default EmployeerDashboard;
