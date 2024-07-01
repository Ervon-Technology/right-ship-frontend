import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DetailsImage from './Assets/Details.jpg';

const Details = () => {
  // State for height, weight, and BMI
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');

  // Function to calculate BMI
  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBMI(bmiValue);
    } else {
      setBMI('');
    }
  };

  // Event handler for height input change
  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    calculateBMI();
  };

  // Event handler for weight input change
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
    calculateBMI();
  };

  return (
    <div className="flex">
      <div className="w-2/5 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${DetailsImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-500 bg-opacity-20">
          <h1 className="text-white text-3xl font-bold flex flex-col">
            Fill the<span className="bg-white text-customBlue text-7xl pe-2">Details</span>
          </h1>
        </div>
      </div>
      <div className="w-3/5 bg-white p-8 h-screen overflow-y-auto">
        <div className="flex items-center justify-center mb-8">
          {/* Navigation Steps */}
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">1</div>
            <span className="ms-1 text-black">About me</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 text-white border-4 border-customBlue">2</div>
            <span className="text-black">Basic Details</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-1 text-black">Experience</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-3 text-black">Resume</span>
          </div>
          <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 border-4 border-customBlue"></div>
            <span className="mx-4 text-black">Profile</span>
          </div>
        </div>
        <div className='w-full border border-blue-200 -mt-6 mb-10 '></div>

        {/* Form Section */}
        <form className="px-16">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* First Row of Inputs */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Select last ship type<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Experience on different type of ships<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            {/* Second Row of Inputs */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Last Rank<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Applied Rank<span className="text-red-500">*</span></label>
              <input type="text" className="w-full border-2 border-blue-200 p-2 rounded" />
            </div>
          </div>

          {/* License Holding Section */}
          <div className="mb-4">
            <label className="block mb-4 text-lg text-center py-2 rounded-md font-medium text-white bg-customBlue">License Holding</label>
            <div className="grid grid-cols-3 gap-4">
              {/* Checkbox for COP */}
              <div className="flex items-center ms-12">
                <input type="checkbox" className="form-checkbox" />
                <label className="ml-2">for COP</label>
              </div>
              {/* Checkbox for COC */}
              <div className="flex items-center ms-10">
                <input type="checkbox" className="form-checkbox" />
                <label className="ml-2">for COC</label>
              </div>
              {/* Checkbox for Watch Keeping */}
              <div className="flex items-center ms-4">
                <input type="checkbox" className="form-checkbox" />
                <label className="ml-2">for watch keeping</label>
              </div>
              {/* Input for COP details */}
              <div className="flex flex-col">
                <label className="block mb-1 text-sm font-semibold">Enter COP details</label>
                <input type="text" className="border-2 border-blue-200 p-2 rounded" />
              </div>
              {/* Input for COC details */}
              <div className="flex flex-col">
                <label className="block mb-1 text-sm font-semibold">Enter COC details</label>
                <input type="text" className="border-2 border-blue-200 p-2 rounded" />
              </div>
              {/* Input for Watch Keeping details */}
              <div className="flex flex-col">
                <label className="block mb-1 text-sm font-semibold">Enter Watch Keeping details</label>
                <input type="text" className="border-2 border-blue-200 p-2 rounded" />
              </div>
            </div>
          </div>
          <div className='w-full border border-blue-200 mb-8 '></div>
          {/* COVID-19 Vaccination Section */}
          <div className="mb-4 text-center">
            <label className="block mb-1 text-lg py-2 rounded-md font-medium text-white bg-customBlue">COVID-19 Vaccination</label>
            <div className="flex justify-center gap-4">
              <div className="flex items-center mx-6 my-6">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">1st Dose</span>
              </div>
              <div className="flex items-center mx-6 my-6">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">2nd Dose</span>
              </div>
              <div className="flex items-center mx-6 my-6">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Booster Dose</span>
              </div>
            </div>
          </div>

          {/* Height, Weight, BMI Section */}
          <div className="mb-4 flex space-x-24 border-2 border-blue-200 bg-blue-100 py-6 px-12">
            <div className="w-1/3">
              <label className="block mb-1 text-sm font-semibold text-gray-700">Height (in cm)</label>
              <input
                type="number"
                value={height}
                onChange={handleHeightChange}
                className="w-full border-2 border-blue-200 p-2 rounded"
              />
            </div>
            <div className="w-1/3">
              <label className="block mb-1 text-sm font-semibold text-gray-700">Weight (in kg)</label>
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                className="w-full border-2 border-blue-200 p-2 rounded"
              />
            </div>
            <div className="w-1/3">
              <label className="block mb-1 text-sm font-semibold text-gray-700">BMI</label>
              <input
                type="text"
                value={bmi}
                readOnly
                className="w-full border-2 border-blue-200 p-2 rounded"
              />
            </div>
          </div>

          {/* Additional Questions Section */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700">Have SID Card?</label>
            <div className="flex space-x-4">
              <button type="button" className="bg-customBlue text-white py-2 px-4 rounded font-bold w-32 ">
                YES
              </button>
              <button type="button" className="bg-white border border-customBlue text-customBlue font-bold py-2 px-4 rounded w-32">
                NO
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700">Are you willing to accept lower rank?</label>
            <div className="flex space-x-4">
              <button type="button" className="bg-customBlue text-white py-2 px-4 rounded font-bold w-32 ">
                YES
              </button>
              <button type="button" className="bg-white border border-customBlue text-customBlue font-bold py-2 px-4 rounded w-32">
                NO
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700">Any medical history?</label>
            <div className="flex space-x-4">
              <button type="button" className="bg-customBlue text-white py-2 px-4 rounded font-bold w-32 ">
                YES
              </button>
              <button type="button" className="bg-white border border-customBlue text-customBlue font-bold py-2 px-4 rounded w-32">
                NO
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-700">If "Yes", Describe</label>
            <textarea className="w-full border-2 border-blue-200 p-2 rounded" rows="3"></textarea>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4">
            <Link to="/about" className="bg-white text-customBlue border font-bold border-customBlue py-2 px-4 rounded w-48 text-center">
              BACK
            </Link>
            <Link to="/experience" className="bg-customBlue text-white font-bold py-2 px-4 rounded w-48 text-center">
              NEXT
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
