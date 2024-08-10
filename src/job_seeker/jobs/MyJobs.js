import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const initialJobsData = {
  savedJobs: [
    {
      id: 1,
      companyName: 'Company Name',
      rpslNo: 'RPSL NO',
      hiringFor: 'Offshore vessel - AHT',
      openPositions: ['2nd Officer', '3rd Officer', '3rd Engineer'],
      applied: false,
    },
    {
      id: 2,
      companyName: 'Company Name',
      rpslNo: 'RPSL NO',
      hiringFor: 'Offshore vessel - AHT',
      openPositions: ['2nd Officer', '3rd Officer', '3rd Engineer'],
      applied: false,
    },
    {
      id: 3,
      companyName: 'Company Name',
      rpslNo: 'RPSL NO',
      hiringFor: 'Offshore vessel - AHT',
      openPositions: ['2nd Officer', '3rd Officer', '3rd Engineer'],
      applied: false,
    },
    {
      id: 4,
      companyName: 'Company Name',
      rpslNo: 'RPSL NO',
      hiringFor: 'Offshore vessel - AHT',
      openPositions: ['2nd Officer', '3rd Officer', '3rd Engineer'],
      applied: false,
    },
  ],
  appliedJobs: [],
};

const MyJobs = () => {
  const [jobsData, setJobsData] = useState(initialJobsData);
  const [activeTab, setActiveTab] = useState('savedJobs');

  const toggleApply = (jobId) => {
    setJobsData((prevJobsData) => {
      const savedJobs = [...prevJobsData.savedJobs];
      const appliedJobs = [...prevJobsData.appliedJobs];
      const jobIndex = savedJobs.findIndex((job) => job.id === jobId);

      if (jobIndex !== -1) {
        const job = savedJobs[jobIndex];
        job.applied = !job.applied;

        if (job.applied) {
          appliedJobs.push(job);
        } else {
          const appliedJobIndex = appliedJobs.findIndex((j) => j.id === jobId);
          if (appliedJobIndex !== -1) {
            appliedJobs.splice(appliedJobIndex, 1);
          }
        }

        savedJobs[jobIndex] = job;
      }

      return { savedJobs, appliedJobs };
    });
  };

  const removeJob = (jobId) => {
    setJobsData((prevJobsData) => {
      const savedJobs = prevJobsData.savedJobs.filter((job) => job.id !== jobId);
      const appliedJobs = prevJobsData.appliedJobs.filter((job) => job.id !== jobId);
      return { savedJobs, appliedJobs };
    });
  };

  return (
    <div className="p-6 flex justify-center">
      <div className=" w-full">
        <h1 className="text-3xl font-bold mb-4 text-center lg:hidden">My Jobs</h1>
        <h1 className="text-3xl font-bold ml-16 mt-10 -mb-5 hidden lg:block ">My Jobs</h1>
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'savedJobs' ? 'bg-customSky3 text-customBlue font-bold' : ''
            }`}
            onClick={() => setActiveTab('savedJobs')}
          >
            Saved Jobs ({jobsData.savedJobs.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'appliedJobs' ? 'bg-customSky3 text-customBlue font-bold' : ''
            }`}
            onClick={() => setActiveTab('appliedJobs')}
          >
            Applied Jobs ({jobsData.appliedJobs.length})
          </button>
        </div>
        <div className="w-11/12 border mx-auto border-blue-300 mb-4"></div>
        <div className='max-w-4xl mx-auto'>
          {activeTab === 'savedJobs' &&
            jobsData.savedJobs.map((job) => (
              <div key={job.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg mb-4">
                <div>
                  <p>{job.companyName} | {job.rpslNo}</p>
                  <p className="font-bold">Hiring For</p>
                  <p>{job.hiringFor}</p>
                  <p className="font-bold">Open Positions</p>
                  <p>{job.openPositions.join('  ')}</p>
                </div>
                <div className="flex mt-2 md:mt-0 items-center space-x-2">
                  <button
                    className={`w-28 px-4 py-2 ${
                      job.applied ? 'border-2 border-customBlue text-customBlue font-semibold rounded-md' : 'border-2 border-customBlue text-white bg-customBlue font-semibold rounded-md'
                    }`}
                    onClick={() => toggleApply(job.id)}
                  >
                    {job.applied ? 'Unapply' : 'Apply Job'}
                  </button>
                  <Bookmark className="w-6 h-6 cursor-pointer" color='#1F5882' fill='#1F5882' onClick={() => removeJob(job.id)} />
                </div>
              </div>
            ))}
          {activeTab === 'appliedJobs' &&
            jobsData.appliedJobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg mb-4">
                <div>
                  <p>{job.companyName} | {job.rpslNo}</p>
                  <p className="font-bold">Hiring For</p>
                  <p>{job.hiringFor}</p>
                  <p className="font-bold">Open Positions</p>
                  <p>{job.openPositions.join('  ')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="w-28 px-4 py-2 border-2 border-customBlue text-customBlue font-semibold rounded-md"
                    onClick={() => toggleApply(job.id)}
                  >
                    Unapply
                  </button>
                  <Bookmark className="w-6 h-6 cursor-pointer" color='#1F5882' fill='#1F5882' onClick={() => removeJob(job.id)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;