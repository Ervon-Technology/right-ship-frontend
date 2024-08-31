import React from 'react';
import { useHistory } from 'react-router-dom';

const VerificationPending = () => {
 

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Account Verification Pending</h1>
        <p className="text-gray-600 mb-6">
          Your account is currently awaiting verification by the admin. You will be notified once your account has been approved.
          Until then, you cannot access the platform features.
        </p>
        <div className="flex justify-center mt-6">
          <button
            // onClick={}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPending;
