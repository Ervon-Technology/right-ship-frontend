import React from 'react';
import { Link } from 'react-router-dom';
import DetailsImage from './Assets/Details.jpg'

const Details = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${DetailsImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Fill the <span className="text-blue-300">Details</span></h1>
        </div>
      </div>
      <div className="w-1/2 p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center flex-col ">
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
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-2 text-black">Experience</span>
          </div>
          <div className="w-16 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-2 text-black">Resume</span>
          </div>
          <div className="w-16 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-2 text-black">Profile</span>
          </div>
        </div>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Select last ship type<span className="text-red-500">*</span></label>
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>Tanker</option>
              <option>Cargo</option>
              <option>Cruise</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Last company worked for<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Designation<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="flex justify-between">
            <Link to="/about" className="bg-gray-500 text-white py-2 px-4 rounded">BACK</Link>
            <Link to="/experience" className="bg-blue-600 text-white py-2 px-4 rounded">NEXT</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
