import React from 'react';
import { Link } from 'react-router-dom';
import AboutImage from './Assets/About.jpg';

const About = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/5 bg-cover bg-center" style={{ backgroundImage: `url(${AboutImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Tell us <span className="text-blue-300">About <span className="bg-white text-blue-900 px-2">you</span></span></h1>
        </div>
      </div>
      <div className="w-3/5 p-8 px-14 bg-white">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">1</div>
            <span className="ms-1 text-black">About me</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue">2</div>
            <span className="text-black">Basic Details</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue">3</div>
            <span className="mx-1 text-black">Experience</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue">4</div>
            <span className="mx-3 text-black">Resume</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue">5</div>
            <span className="mx-4 text-black">Profile</span>
          </div>
        </div>
        <div className='w-full border border-blue-200 -mt-6 mb-10 '></div>
        <form className="space-y-6 px-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="-mb-2">
              <label className="block mb-3 text-sm font-semibold text-gray-700">First Name<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            <div className="-mb-2">
              <label className="block mb-3 text-sm font-semibold text-gray-700">Last Name<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="-mb-2">
              <label className="block mb-3 text-sm font-semibold text-gray-700">Personal Number<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            <div className="-mb-2">
              <label className="block mb-3 text-sm font-semibold text-gray-700">WhatsApp Number</label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="-mb-2">
              <label className="block mb-3 text-sm font-semibold text-gray-700">Email ID<span className="text-red-500">*</span></label>
              <input type="email" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-3 text-sm font-semibold text-gray-700">Gender<span className="text-red-500">*</span></label>
              <select className="w-full border-2 border-blue-200 p-2 rounded">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="mb-4 -mt-5">
              <label className="block mb-3 text-sm font-semibold text-gray-700">Date of Birth<span className="text-red-500">*</span></label>
              <input type="date" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            <div className="mb-4 -mt-5">
              <label className="block mb-3 text-sm font-semibold text-gray-700">City<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            <div className="mb-4 -mt-5">
              <label className="block mb-3 text-sm font-semibold text-gray-700">State<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
          </div>
          <div className="grid grid-cols">
            <div className="mb-4 -mt-4">
              <label className="block mb-3 text-sm font-semibold text-gray-700">Mark your location<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
          </div>
          <div className="flex justify-center">
            <Link to="/details" className="bg-customBlue text-white py-2 px-20 rounded">NEXT</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default About;
