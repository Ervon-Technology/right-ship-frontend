import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeJob,
  unapplyJob,
  applyJob,
  bookmarkJob,
  applyJobToCompany,
  unapplyJobFromCompany,
} from '../../features/jobSlice';

const MyJobs = () => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.job.savedJobs);
  const appliedJobs = useSelector((state) => state.job.appliedJobs);
  const employeeId = useSelector((state) => state.auth?.user?._id);

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('activeTab') || 'savedJobs';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const toggleApply = (job) => {
    if (!employeeId) {
      console.error('Employee ID is undefined. Cannot apply for the job.');
      return;
    }

    if (appliedJobs.some((appliedJob) => appliedJob.id === job.id)) {
      dispatch(unapplyJob(job.id));
      dispatch(
        unapplyJobFromCompany({
          jobId: job.id,
          companyId: job.companyId,
          employeeId,
        })
      );
    } else {
      dispatch(applyJob(job));
      dispatch(
        applyJobToCompany({
          jobId: job.id,
          companyId: job.companyId,
          employeeId,
        })
      );
    }
  };

  const toggleBookmark = (job) => {
    if (savedJobs.some((savedJob) => savedJob.id === job.id)) {
      dispatch(removeJob(job.id));
    } else {
      dispatch(bookmarkJob(job));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">My Jobs</h1>
      <div className="flex justify-center mb-8 ">
        <button
          className={`px-6 py-2 rounded-md font-semibold text-lg transition-colors ${
            activeTab === 'savedJobs'
              ? 'bg-customBlue text-white shadow-md'
              : 'bg-gray-100 border border-customBlue hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('savedJobs')}
        >
          Saved Jobs ({savedJobs.length})
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold text-lg ml-4 transition-colors ${
            activeTab === 'appliedJobs'
              ? 'bg-customBlue text-white shadow-md'
              : 'bg-gray-100 text-customBlue border border-customBlue hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('appliedJobs')}
        >
          Applied Jobs ({appliedJobs.length})
        </button>
      </div>
      <div className="border-b-2 border-gray-300 mb-10"></div>
      <div className="grid gap-6">
        {activeTab === 'savedJobs' &&
          savedJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white rounded-lg shadow-lg flex justify-between items-center transition-transform hover:scale-105"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {job.companyName} | {job.rpslNo}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">Hiring For:</span> {job.hiringFor}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">Open Positions:</span>{' '}
                  {job.openPositions.join(', ')}
                </p>
              </div>
              <div className="flex space-x-4 items-center">
                <button
                  className={` w-24 py-2 rounded-md font-medium border transition-all ${
                    appliedJobs.some((appliedJob) => appliedJob.id === job.id)
                      ? 'border-customBlue text-customBlue hover:bg-customBlue2 hover:text-white'
                      : 'bg-customBlue text-white hover:bg-customBlue2'
                  }`}
                  onClick={() => toggleApply(job)}
                >
                  {appliedJobs.some((appliedJob) => appliedJob.id === job.id)
                    ? 'Unapply'
                    : 'Apply'}
                </button>
                <button onClick={() => toggleBookmark(job)}>
                  <Bookmark
                    className="w-6 h-6"
                    color="#1F5882"
                    fill={
                      savedJobs.some((savedJob) => savedJob.id === job.id)
                        ? '#1F5882'
                        : 'none'
                    }
                  />
                </button>
              </div>
            </div>
          ))}
        {activeTab === 'appliedJobs' &&
          appliedJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 bg-white rounded-lg shadow-lg flex justify-between items-center transition-transform hover:scale-105"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {job.companyName} | {job.rpslNo}
                </h3>
                <p className="text-gray-700">
                  <span className="font-medium">Hiring For:</span> {job.hiringFor}
                </p>
                <p className="text-gray-700 mt-1">
                  <span className="font-medium">Open Positions:</span>{' '}
                  {job.openPositions.join(', ')}
                </p>
              </div>
              <div className="flex space-x-4 items-center">
                <button
                  className="w-24 py-2 rounded-md font-medium border border-customBlue text-customBlue transition-all hover:bg-customBlue hover:text-white"
                  onClick={() => toggleApply(job)}
                >
                  Unapply
                </button>
                <button onClick={() => toggleBookmark(job)}>
                  <Bookmark
                    className="w-6 h-6"
                    color="#1F5882"
                    fill={
                      savedJobs.some((savedJob) => savedJob.id === job.id)
                        ? '#1F5882'
                        : 'none'
                    }
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyJobs;
