import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChangeMail = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOtp = () => {
    // Add logic to send OTP
    console.log('Send OTP to', email);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md -mt-24">
        <h2 className="text-2xl font-bold ">Change Mail</h2>
        <div className="space-y-4 ">
          <input
            type="email"
            value={email}
            placeholder='demo@gmail.com'
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendOtp}
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          ><Link to='/verifymail'>
            Send OTP
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeMail;
