import React from 'react';

const SearchBar = () => (
  <div className="my-12 text-center">
    <h2 className="text-4xl font-semibold mb-2 text-gray-800">Find Your Dream Job Now</h2>
    <p className="mb-6 text-gray-600">Over 500,000 jobs for you to explore</p>
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Enter skills, designation, companies"
        className="p-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border border-gray-300 rounded-l-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200"
      />
      <button className="bg-customBlue text-white px-6 py-4 rounded-r-full shadow-md hover:bg-customDarkBlue transition duration-200">
        Search
      </button>
    </div>
  </div>
);

export default SearchBar;
