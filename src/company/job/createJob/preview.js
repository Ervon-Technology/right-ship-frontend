import React from 'react';

const Preview = ({ formData, prevStep, handlePublish }) => {
  return (
    <div className="w-full p-6 bg-white shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview Job Details</h2>

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-600 mb-2">Ships:</h3>
        <ul className="list-disc list-inside">
          {formData.ships.map((ship, index) => (
            <li key={index} className="text-gray-700">{ship}</li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-600 mb-2">Ranks:</h3>
        <ul className="list-disc list-inside">
          {formData.ranks.map((rank, index) => (
            <li key={index} className="text-gray-700">{rank}</li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-600 mb-2">Job Description:</h3>
        <pre className="text-gray-700">{formData.jobDescription}</pre>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-600 mb-2">Start Date: (Optional)</h3>
        <p className="text-gray-700">{formData.startDate}</p>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-600 mb-2">End Date:</h3>
        <p className="text-gray-700">{formData.endDate}</p>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="">
        <button
          onClick={prevStep}
          className="py-3 px-5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors me-4"
        >
          Edit
        </button>
        <button
          onClick={handlePublish}
          className="py-3 px-5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Preview;
