import React from 'react';
import Select from 'react-select';

const StepOne = ({ nextStep, shipDatas, rankDatas, formData, handleInputChange }) => {
  // Handle changes for ships and ranks using react-select
  const handleShipsChange = (selectedOptions) => {
    handleInputChange('ships')(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const handleRanksChange = (selectedOptions) => {
    handleInputChange('ranks')(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Step 1: Job Details</h2>

      {/* Select Ships with Searchable Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Ships:</label>
        <Select
          isMulti
          options={shipDatas.map(ship => ({ label: ship, value: ship }))}
          value={formData.ships.map(ship => ({ label: ship, value: ship }))}
          onChange={handleShipsChange}
          placeholder="Search and select ships..."
          className="w-full"
        />
      </div>

      {/* Select Ranks with Searchable Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Select Ranks:</label>
        <Select
          isMulti
          options={rankDatas.map(rank => ({ label: rank, value: rank }))}
          value={formData.ranks.map(rank => ({ label: rank, value: rank }))}
          onChange={handleRanksChange}
          placeholder="Search and select ranks..."
          className="w-full"
        />
      </div>

      {/* Job Description Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Job Description:</label>
        <textarea
          value={formData.jobDescription}
          onChange={(e) => handleInputChange('jobDescription')(e.target.value)}
          placeholder="Enter job description..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
    </div>
  );
};

export default StepOne;
