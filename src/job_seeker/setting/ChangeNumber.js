import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChangeNumber = () => {
  const [number, setNumber] = useState('');

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSendOtp = () => {
    // Add logic to send OTP
    console.log('Send OTP to', number);
  };

  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md -mt-24">
        <h2 className="text-2xl font-bold ">Change Numbber</h2>
        <div className="space-y-4 ">
          <input
            type="number"
            value={number}
            placeholder='+91 6372778345'
            onChange={handleNumberChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         <button
            onClick={handleSendOtp}
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          ><Link to='/verifynumber'>
            Send OTP
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeNumber;
