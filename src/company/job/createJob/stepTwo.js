import React from 'react';

const StepTwo = ({ nextStep, prevStep, benefits, formData, handleInputChange }) => {
  const handleBenefitSelect = (benefit) => {
    const updatedBenefits = formData.benefits.includes(benefit)
      ? formData.benefits.filter((b) => b !== benefit)
      : [...formData.benefits, benefit];
    handleInputChange('benefits')(updatedBenefits);
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white border-2 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Benefits and Enter Job Description</h2>

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-600 mb-2">Benefits:</h3>
        <div className="grid grid-cols-4 gap-2">
          {benefits.map((benefit, index) => (
            <button
              key={index}
              className={`py-2 px-3 rounded border transition-colors ${
                formData.benefits.includes(benefit)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
              }`}
              onClick={() => handleBenefitSelect(benefit)}
            >
              {benefit}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-600 mb-2">Job Description:</h3>
        <textarea
          value={formData.jobDescription}
          onChange={(e) => handleInputChange('jobDescription')(e.target.value)}
          placeholder="Enter job description here..."
          className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="">
        <button
          onClick={prevStep}
          className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors me-4"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className={`py-2 px-4 rounded-lg transition-colors bg-green-600 text-white hover:bg-green-700`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
