import React from 'react';
import { Link } from 'react-router-dom';
import background from './Assets/Congrats.png';

const Congratulations = () => {
  return (
    <div className="relative flex h-screen items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute inset-0 bg-white opacity-90"></div>
      <div className="relative text-center">
        <div className="mb-4">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-customBlue flex items-center justify-center">
            <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-semibold text-green-600 font-aclonica">Congratulations</h1>
          <p className="text-lg text-white">Your profile is created</p>
        </div>
        <Link to="/candidate_login" className="bg-customBlue hover:bg-customBlue2 text-white py-2 px-8 rounded-lg">Login</Link>
      </div>
    </div>
  );
};

export default Congratulations;
