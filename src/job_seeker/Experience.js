import React from 'react';
import { Link } from 'react-router-dom';
import ExperienceImage from './Assets/Experience.jpg'
const Experience = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${ExperienceImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Share your <span className="text-blue-300">Experience</span></h1>
        </div>
      </div>
      <div className="w-1/2 p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">1</div>
            <span className="mx-2 text-black">About me</span>
          </div>
          <div className="w-16 h-0.5 -mt-5 bg-customBlue"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">2</div>
            <span className="mx-2 text-black">Basic Details</span>
          </div>
          <div className="w-16 h-0.5 -mt-5 bg-customBlue"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">3</div>
            <span className="mx-2 text-black">Experience</span>
          </div>
          <div className="w-16 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-2 text-glack">Resume</span>
          </div>
          <div className="w-16 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-2 text-glack">Profile</span>
          </div>
        </div>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Total sea experience<span className="text-red-500">*</span></label>
            <div className="flex space-x-4">
              <input type="text" placeholder="---" className="w-1/2 border border-gray-300 p-2 rounded" />
              <span>Months</span>
              <input type="text" placeholder="--" className="w-1/4 border border-gray-300 p-2 rounded" />
              <span>Days</span>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Last rank experience<span className="text-red-500">*</span></label>
            <div className="flex space-x-4">
              <input type="text" placeholder="---" className="w-1/2 border border-gray-300 p-2 rounded" />
              <span>Months</span>
              <input type="text" placeholder="--" className="w-1/4 border border-gray-300 p-2 rounded" />
              <span>Days</span>
            </div>
          </div>
          <div className="flex justify-between">
            <Link to="/details" className="bg-gray-500 text-white py-2 px-4 rounded">BACK</Link>
            <Link to="/resume" className="bg-blue-600 text-white py-2 px-4 rounded">NEXT</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Experience;
