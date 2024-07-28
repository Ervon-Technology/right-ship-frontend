import React, { useState, useEffect } from 'react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const company_id = localStorage.getItem('company_id') || "66a260a0d1c9c92d23beec3c";
      try {
        const response = await fetch('https://api.rightships.com/company/application/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ company_id }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobs(data.applications);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <button className="bg-customBlue text-white px-4 py-2 rounded">Post Job</button>
      </div>
      
      <div className="mb-4">
        <button className="bg-customBlue text-white px-4 py-2 rounded-l">Open and Paused ({jobs.length})</button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r">Closed (0)</button>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className="mr-2">🔍</span>
          <span className="text-gray-600">Filters & Search Option</span>
        </div>
        <div className="flex items-center space-x-4">
          <div>
            <label className="mr-2 text-sm text-gray-600">Sort by:</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Posting date</option>
            </select>
          </div>
          <div>
            <label className="mr-2 text-sm text-gray-600">Order:</label>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Descending</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        {jobs.map((job) => (
          <div key={job._id} className="border-b last:border-b-0">
            <div className="flex items-center p-4">
              <input type="checkbox" className="mr-4" />
              <div className="flex-grow">
                <h3 className="font-semibold text-blue-500">{job.jobTitle || 'Job Title Not Specified'}</h3>
                <p className="text-sm text-gray-600">{job.ranks.join(', ')}</p>
                <p className="text-sm text-gray-500">Posted: {new Date(job.created_date).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-4 text-sm text-gray-600">
                <span>Applied: {job.Applications || 0}</span>
                <span>Shorted: {job.AwaitingReview || 0}</span>
                <span className='text-blue-600'>Downloaded: {job.Views || 0}</span>
              </div>
              <div className="flex items-center ml-4">
                <select className="border rounded px-2 py-1 text-sm mr-2" defaultValue={job.status || 'paused'}>
                  <option value="paused">Paused</option>
                  <option value="publish">Published</option>
                </select>
                <button className="text-gray-600 font-bold">⋮</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;