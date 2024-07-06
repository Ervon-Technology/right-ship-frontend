import React from 'react';
import { Link } from 'react-router-dom';
import ExperienceImage from './Assets/Experience.jpg';

const Experience = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/5 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${ExperienceImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-20">
          <h1 className="text-white text-4xl font-bold flex flex-col">
            Share your <br />
            <span className="bg-white text-customBlue text-7xl mt-1">Experience</span>
          </h1>
        </div>
      </div>
      <div className="relative w-3/5 p-8 px-14 bg-white overflow-y-auto">
        <div className="flex items-center justify-center mb-8">
          {/* Navigation Steps */}
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">1</div>
            <span className="mx-2 text-black">About me</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">2</div>
            <span className="mx-2 text-black">Basic Details</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">3</div>
            <span className="mx-2 text-black">Experience</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-2 text-black">Resume</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-2 text-black">Profile</span>
          </div>
        </div>
        <div className='w-full border border-blue-200 -mt-6 mb-10 '></div>

        {/* Form Section */}
        <form className='px-16'>
          <div className="mb-4 flex justify-center">
            <label htmlFor="totalMonths" className="block mb-1 text-sm font-semibold text-black">
              Total sea experience<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="flex space-x-4">
              <input
                type="text"
                id="totalMonths"
                name="totalMonths"
                placeholder="_ _ _ Months"
                className="w-1/2 sm:w-auto border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                id="totalDays"
                name="totalDays"
                placeholder="_ _ _ Days"
                className="w-1/4 sm:w-auto border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
          <div className="mb-4 flex justify-center">
            <label htmlFor="lastRankMonths" className="block mb-1 text-sm font-semibold text-black">
              Last rank experience<span className="text-red-500">*</span>
            </label>
          </div>
          <div className="mb-4 flex justify-center">
            <div className="flex space-x-4">
              <input
                type="text"
                id="lastRankMonths"
                name="lastRankMonths"
                placeholder="_ _ _ Months"
                className="w-1/2 sm:w-auto border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                id="lastRankDays"
                name="lastRankDays"
                placeholder="_ _ _ Days"
                className="w-1/4 sm:w-auto border border-gray-300 p-2 rounded"
              />
            </div>
          </div>
          <div className="absolute bottom-14 left-0 right-0 px-16">
            <div className="flex justify-center space-x-4">
              <Link to="/details" className="bg-white text-customBlue font-bold border border-customBlue py-2 px-4 rounded w-48 text-center">
                BACK
              </Link>
              <Link to="/resume" className="bg-customBlue text-white font-bold py-2 px-4 rounded w-48 text-center">
                NEXT
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Experience;
