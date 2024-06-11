import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 shadow-md bg-white rounded-md text-center">
        <h1 className="text-2xl font-semibold mb-4 text-black">Home Page</h1>
        <a
          href="/login"
          className="block w-64 p-3 my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Go to Login Page
        </a>
        <a
          href="/otpverify"
          className="block w-64 p-3 my-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Verify OTP
        </a>
        <a
          href="/usermanage"
          className="block w-64 p-3 my-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          user management
        </a>
      </div>
    </div>
  );
};

export default Home;
