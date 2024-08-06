import React, { useState } from 'react';

const VerifyNumber = () => {
  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md -mt-24">
        <h2 className="text-2xl font-bold ">Veify OTP</h2>
        <div className="space-y-4 ">
          <input
            type="number"
            placeholder='Enter OTP'
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Verify Otp
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyNumber;
