import React from 'react';
import { Link } from 'react-router-dom';

const Experience = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/mnt/data/Screenshot (359).png')" }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Share your <span className="text-blue-300">Experience</span></h1>
        </div>
      </div>
      <div className="w-1/2 p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">1</div>
            <span className="mx-2 text-blue-600">About me</span>
          </div>
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">2</div>
            <span className="mx-2 text-blue-600">Basic Details</span>
          </div>
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">3</div>
            <span className="mx-2 text-blue-600">Experience</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600">4</div>
            <span className="mx-2 text-gray-600">Resume</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600">5</div>
            <span className="mx-2 text-gray-600">Profile</span>
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
