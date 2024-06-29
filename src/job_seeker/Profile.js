import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/mnt/data/Screenshot (361).png')" }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Let's reveal your <span className="text-blue-300">Face</span></h1>
        </div>
      </div>
      <div className="w-1/2 p-8">
        <div className="flex items-center justify-center mb-8">
          {/* Stepper */}
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
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">4</div>
            <span className="mx-2 text-blue-600">Resume</span>
          </div>
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">5</div>
            <span className="mx-2 text-blue-600">Profile</span>
          </div>
        </div>
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold">Add your photo to Profile</h2>
        </div>
        <form className="text-center">
          <div className="mb-4">
            <input type="file" className="border border-gray-300 p-2 rounded w-full max-w-xs mx-auto" />
            <p className="text-xs text-gray-500 mt-2">Upload .jpg & .png file only, max file size 10MB</p>
          </div>
          <div className="flex justify-between">
            <Link to="/resume" className="bg-gray-500 text-white py-2 px-4 rounded">BACK</Link>
            <Link to="/congratulations"><button className="bg-blue-600 text-white py-2 px-4 rounded">SAVE</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
