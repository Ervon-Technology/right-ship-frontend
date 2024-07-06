import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const initialJobsData = {
  savedJobs: [
    {
      id: 1,
      title: '2 Engineer',
      company: 'Admiral Marine Services Pvt. Ltd.',
      validTill: '28/05/2026',
      applied: false,
    },
    {
      id: 2,
      title: '2 Engineer',
      company: 'Admiral Marine Services Pvt. Ltd.',
      validTill: '28/05/2026',
      applied: false,
    },
    {
      id: 3,
      title: '2 Engineer',
      company: 'Admiral Marine Services Pvt. Ltd.',
      validTill: '28/05/2026',
      applied: false,
    },
    {
      id: 4,
      title: '2 Engineer',
      company: 'Admiral Marine Services Pvt. Ltd.',
      validTill: '28/05/2026',
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

  return (
    <div className="p-6 flex justify-center">
      <div className=" w-full">
        <h1 className="text-3xl font-bold ml-16 mt-10 -mb-5">My Jobs</h1>
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
              <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p>{job.company}</p>
                  <p>Valid till {job.validTill}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className={`px-8 py-2 ${
                      job.applied ? 'border-2 border-customBlue text-customBlue font-semibold' : 'bg-customSky3 text-customBlue font-semibold'
                    }`}
                    onClick={() => toggleApply(job.id)}
                  >
                    {job.applied ? 'Un apply' : 'Apply Job'}
                  </button>
                  <Bookmark className="w-6 h-6" color='#1F5882' fill='#1F5882' />
                </div>
              </div>
            ))}
          {activeTab === 'appliedJobs' &&
            jobsData.appliedJobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center p-4 border rounded-lg mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{job.title}</h2>
                  <p>{job.company}</p>
                  <p>Valid till {job.validTill}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-8 py-2 border-2 border-customBlue text-customBlue"
                    onClick={() => toggleApply(job.id)}
                  >
                    Un apply
                  </button>
                  <Bookmark className="w-6 h-6" color='#1F5882' fill='#1F5882' />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
