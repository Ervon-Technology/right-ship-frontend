import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [filterTitle, setFilterTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState('openAndPaused');

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
        console.log(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    navigate('/Jobsdesc', { state: { job } });
  };

  const handleJobPost = () => {
    navigate('/add-job-basics');
  };

  const handleCheckboxChange = (jobId) => {
    setSelectedJobs((prevSelectedJobs) =>
      prevSelectedJobs.includes(jobId)
        ? prevSelectedJobs.filter((id) => id !== jobId)
        : [...prevSelectedJobs, jobId]
    );
  };

  const handleDeleteClick = () => {
    if (selectedJobs.length > 0) {
      setShowConfirm(true);
    }
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    try {
      for (const jobId of selectedJobs) {
        const response = await fetch('https://api.rightships.com/company/application/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ application_id: jobId }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }
      setJobs((prevJobs) => prevJobs.filter((job) => !selectedJobs.includes(job._id)));
      setSelectedJobs([]);
    } catch (error) {
      console.error('Error deleting job(s):', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const filteredJobs = jobs
    .filter((job) => job.jobTitle.toLowerCase().includes(filterTitle.toLowerCase()))
    .filter((job) => {
      if (statusFilter === 'closed') return job.status === 'closed';
      return true;
    })
    .sort((a, b) => {
      if (statusFilter === 'postingDate') {
        return new Date(b.created_date) - new Date(a.created_date);
      }
      return 0; // No additional sorting for 'public' or 'saved'
    });

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <button onClick={handleJobPost} className="bg-customBlue text-white px-4 py-2 rounded">Post Job</button>
      </div>

      <div className="mb-4">
        <button
          className={`bg-customBlue text-white px-4 py-2 rounded-l ${statusFilter === 'openAndPaused' ? 'bg-blue-600' : 'bg-blue-500'}`}
          onClick={() => setStatusFilter('openAndPaused')}
        >
          Open and Paused ({jobs.length})
        </button>
        <button
          className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-r ${statusFilter === 'closed' ? 'bg-gray-400' : 'bg-gray-200'}`}
          onClick={() => setStatusFilter('closed')}
        >
          Closed (0)
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="mr-2">🔍</span>
          <input
            type="text"
            placeholder="Filter by job title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        {selectedJobs.length > 0 && (
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete Selected
          </button>
        )}
      </div>

      <div className="bg-white rounded shadow">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="border-b last:border-b-0 cursor-pointer"
          >
            <div className="flex items-center p-4">
              <input
                type="checkbox"
                className="mr-4"
                checked={selectedJobs.includes(job._id)}
                onChange={() => handleCheckboxChange(job._id)}
              />
              <div className="flex-grow" onClick={() => handleJobClick(job)}>
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
                <h1 className="text-gray-600 font-bold">
                  {job.status === 'saved' ? 'save' : 'Published'}
                </h1>
                {/* <button className="text-gray-600 font-bold ml-2">⋮</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete the selected job(s)?</p>
            <div className="flex justify-end mt-4">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Confirm</button>
              <button onClick={cancelDelete} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
