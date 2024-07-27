import React, { useState } from 'react';

const Settings = () => {
  const [accountType, ] = useState('Professional');
  const [email, ] = useState('demo@gmail.com');
  const [password, ] = useState('********');
  const [mobileNumber, ] = useState('+91 86983935363');
  const [accountActivation, ] = useState('Not Activated');

  const handleAccountTypeChange = () => {
    // Functionality to change account type
  };

  const handleEmailChange = () => {
    // Functionality to change email
  };

  const handlePasswordChange = () => {
    // Functionality to change password
  };

  const handleMobileNumberChange = () => {
    // Functionality to change mobile number
  };

  const handleSignOut = () => {
    // Functionality to sign out
  };

  return (
    <div className="w-1/2 mx-auto p-6 font-sans">
      <h1 className="text-2xl mb-6 font-bold">Account Setting</h1>
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Account type:</span>
          <button 
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 hover:bg-gray-200"
            onClick={handleAccountTypeChange}
          >
            Job Seeker
          </button>
        </div>
        <span className="block text-sm -mt-2">{accountType}</span>
      </div>
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Account activation</span>
          <button 
            className="bg-red-500 text-white rounded px-8 py-2 hover:bg-red-600"
            onClick={() => {}}
          >
            {accountActivation}
          </button>
        </div>
        <span className="block text-sm -mt-2">verification</span>
      </div>
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Email</span>
          <button 
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 hover:bg-gray-200"
            onClick={handleEmailChange}
          >
            Change email
          </button>
        </div>
        <span className="block text-sm -mt-2">{email}</span>
      </div>
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Password</span>
          <button 
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 hover:bg-gray-200"
            onClick={handlePasswordChange}
          >
            Change password
          </button>
        </div>
        <span className="block text-sm -mt-2">{password}</span>
      </div>
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <span className="font-bold">Mobile number</span>
          <button 
            className="bg-gray-100 border border-gray-300 rounded px-6 py-2 hover:bg-gray-200"
            onClick={handleMobileNumberChange}
          >
            Change number
          </button>
        </div>
        <span className="block text-sm -mt-2">{mobileNumber}</span>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <span>xyz1235995623@gmail.com</span>
        <button 
          className="bg-red-500 text-white border-none rounded px-6 py-2 hover:bg-red-600"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Settings;
