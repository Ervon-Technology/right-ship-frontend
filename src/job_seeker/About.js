import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/mnt/data/Screenshot (357).png')" }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Tell us <span className="text-blue-300">About you</span></h1>
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
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600">2</div>
            <span className="mx-2 text-gray-600">Basic Details</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600">3</div>
            <span className="mx-2 text-gray-600">Experience</span>
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
            <label className="block mb-1 text-sm font-medium text-gray-700">First Name<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Last Name<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Personal Number<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">WhatsApp Number</label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Email ID<span className="text-red-500">*</span></label>
            <input type="email" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Gender<span className="text-red-500">*</span></label>
            <select className="w-full border border-gray-300 p-2 rounded">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Date of Birth<span className="text-red-500">*</span></label>
            <input type="date" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/3">
              <label className="block mb-1 text-sm font-medium text-gray-700">City<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border border-gray-300 p-2 rounded" />
            </div>
            <div className="w-1/3">
              <label className="block mb-1 text-sm font-medium text-gray-700">State<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border border-gray-300 p-2 rounded" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">Mark your location<span className="text-red-500">*</span></label>
            <input type="text" className="w-full border border-gray-300 p-2 rounded" />
          </div>
          <div className="flex justify-end">
            <Link to="/details" className="bg-blue-600 text-white py-2 px-4 rounded">NEXT</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default About;
