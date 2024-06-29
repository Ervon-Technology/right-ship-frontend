import React from 'react';
import { Link } from 'react-router-dom';

const Congratulations = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/mnt/data/Screenshot (363).png')" }}>
      <div className="text-center">
        <div className="mb-4">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-customBlue flex items-center justify-center">
            <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-green-500">congratulations</h1>
          <p className="text-lg text-gray-700">your profile is created</p>
        </div>
        <Link to="/candidate_login" className="bg-customBlue hover:bg-customBlue2 text-white py-2 px-8 rounded-lg">Login</Link>
      </div>
    </div>
  );
};

export default Congratulations;
