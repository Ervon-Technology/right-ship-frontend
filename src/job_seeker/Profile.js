import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './Assets/Profile.jpg'
const Profile = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${ProfileImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Let's reveal your <span className="text-blue-300">Face</span></h1>
        </div>
      </div>
      <div className="w-1/2 p-8">
        <div className="flex items-center justify-center mb-8">
          {/* Stepper */}
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">1</div>
            <span className="mx-2 text-black">About me</span>
          </div>
          <div className="w-16 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">2</div>
            <span className="mx-2 text-black">Basic Details</span>
          </div>
          <div className="w-16 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">3</div>
            <span className="mx-2 text-black">Experience</span>
          </div>
          <div className="w-16 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">4</div>
            <span className="mx-2 text-black">Resume</span>
          </div>
          <div className="w-16 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">5</div>
            <span className="mx-2 text-black">Profile</span>
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
