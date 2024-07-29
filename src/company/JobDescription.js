import React, { useEffect, useState } from 'react';
import { MoveLeft } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const JobDescription = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [job, setJob] = useState({});
  const location = useLocation();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const jobData = location.state || {};
    setJob(jobData.job || {});
  }, [location.state]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
    // Do something based on the selected option
  };

  return (
    <div className="bg-gray-100 flex flex-wrap p-4">
      {/* First div */}
      <div className="border-0 flex-grow flex-basis-2/3 min-w-[300px] pb-4 mx-4 mt-4 pl-4 pt-4 mb-4 bg-white">
        <div className="flex items-center text-blue-900 font-medium text-sm">
          <Link to="/jobs" className="flex items-center">
            <MoveLeft size={20} color="blue" className="mr-2" aria-label="Back to Jobs" />
            <span>Back to Jobs</span>
          </Link>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th className="font-bold text-lg pt-6">{job.jobTitle || 'Job Title'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-md text-black pr-2">{job.description || 'Job Description'}</td>
                <td className="text-md text-black pr-3">{job.company_id || 'Location'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-2 mr-4 mt-4"></div>
        <div className="mt-6 text-md font-bold">Candidates</div>
        <div className='flex flex-wrap'>
          <div className="border-2 border-gray-500 rounded-md mr-4 mt-2 flex-1 min-w-[180px] h-[130px]">
            <div className='px-4 py-4 font-medium text-sm'>Awaiting Review</div>
            <div className='px-4 py-2 font-semibold text-4xl pt-2'>{job.AwaitingReview || '0'}</div>
          </div>
          <div className="border-2 border-gray-500 rounded-md mr-4 mt-2 flex-1 min-w-[180px] h-[130px]">
            <div className='px-4 py-4 font-medium text-sm'>Total (excluding rejected)</div>
            <div className='px-4 py-2 font-semibold text-4xl pt-2'>{job.Total || '0'}</div>
          </div>
        </div>
        <div className="border-2 mr-4 mt-5"></div>
        <div className="text-md font-bold text-2xl pt-3">Performance Summary</div>
        <div className="text-md font-medium text-gray-400 pt-2 text-sm">
          Date show from 5 March to 15 March 2024
        </div>
        <div className='flex flex-wrap'>
          <div className="border-0 bg-gray-300 rounded-sm mr-4 mt-6 flex-1 min-w-[90px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>{job.Impressions || '0'}</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Impressions</div>
          </div>
          <div className="border-0 bg-gray-300 rounded-md mr-4 mt-6 flex-1 min-w-[90px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>{job.Clicks || '0'}</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Clicks</div>
          </div>
          <div className="border-0 bg-gray-300 rounded-md mr-4 mt-6 flex-1 min-w-[90px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>{job.Standards || '0'}</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Standards Application</div>
          </div>
          <div className="border-0 bg-gray-300 rounded-md mr-4 mt-6 flex-1 min-w-[90px] h-[100px]">
            <div className='px-4 pt-5 font-bold text-3xl'>{job.Applications || '0'}</div>
            <div className='px-4 py-2 font-semibold text-sm pt-2'>Applications</div>
          </div>
        </div>
        <div className="border-2 mr-4 mt-5"></div>
        <div className="text-md font-bold text-2xl pt-3">Job Description</div>
        <div className="text-md font-medium text-black pt-4 text-xs max-w-80 break-words">
          {job.description || 'Description not available'}
        </div>
        <div className="border-2 mr-4 mt-5 w-[350px]"></div>
        <div>
          <h1 className="text-md font-bold mb-2 pt-4">Ship Type</h1>
          <ul className="custom-square-list pl-5">
            {job.ship_types && job.ship_types.map((type, index) => (
              <li key={index} className="font-regular text-sm">{type}</li>
            ))}
          </ul>
        </div>
        <div className="border-2 mr-4 mt-5 w-[350px]"></div>
        <div>
          <h1 className="text-md font-bold mb-2 pt-4">Rank</h1>
          <ul className="custom-square-list pl-5">
            {job.ranks && job.ranks.map((rank, index) => (
              <li key={index} className="font-regular text-sm">{rank}</li>
            ))}
          </ul>
        </div>
        <div className="border-2 mr-4 mt-5 w-[350px]"></div>
        <h1 className="text-md font-bold mb-2 pt-4">Benefits</h1>
        <div className='flex flex-wrap'>
          {job.benefits && job.benefits.map((benefit, index) => (
            <div key={index} className='border-0 bg-gray-300 min-w-[100px] h-auto px-2 mx-1 py-1 font-medium text-xs rounded-sm mt-2'>
              {benefit}
            </div>
          ))}
        </div>
        <div className="text-gray-600 font-semibold text-xs pt-7">
          Posted on {new Date(job.created_date).toLocaleDateString() || 'Date not available'}
        </div>
      </div>
      {/* Second div */}
      <div className='flex-[1] min-w-[300px] max-w-[400px] mx-2 mt-4 px-4 pt-4 border-0 mb-4 bg-white'>
        <div className='flex flex-col'>
          <Link to="/edit-jobs">
            <button className='border-0 bg-customBlue text-white font-medium w-full h-[40px] text-center mb-2 rounded-sm'>
              Edit Job
            </button>
          </Link>
          <div className="relative">
            <button onClick={toggleDropdown} className='border-2 border-gray-500 text-black font-medium w-full h-[40px] text-center rounded-sm'>
              Paused V
            </button>
            {dropdownOpen && (
              <div className="absolute top-[42px] right-0 border border-gray-300 bg-white rounded-sm shadow-md">
                <div className="py-1">
                  <button onClick={() => handleOptionClick("Option 1")} className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
                    Option 1
                  </button>
                  <button onClick={() => handleOptionClick("Option 2")} className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
                    Option 2
                  </button>
                  <button onClick={() => handleOptionClick("Option 3")} className="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">
                    Option 3
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="border-2 mt-5"></div>
        <div className="text-lg font-semibold pt-3">Details</div>
        <div className="font-medium text-sm text-gray-600 pt-2">
          <p><strong>Status:</strong> {job.status || 'Status not available'}</p>
          <p><strong>Posted Date:</strong> {new Date(job.created_date).toLocaleDateString() || 'Date not available'}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
