import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Ship from '../company/Assets/Ship.png';
import { setDescription, addBenefit, removeBenefit } from './Slice/Empslice';

const AddPayAndBenefits = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipTypes, ranks, description, benefits } = useSelector((state) => state.emp);
  const benefitsList = [
    'Health Insurance', 'Dental Insurance', 'Vision Insurance',
    'Retirement Plan', 'Paid Time Off', 'Life Insurance',
    'Disability Insurance', 'Flexible Schedule', 'Work From Home',
    'Employee Discount', 'Gym Membership', 'Stock Options',
    'Tuition Reimbursement', 'Professional Development',
    'Parental Leave', 'Commuter Benefits', 'Relocation Assistance',
    'Housing Stipend'
  ];

  const handleDescriptionChange = (event) => {
    dispatch(setDescription(event.target.value));
  };

  const handleBenefitChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      dispatch(addBenefit(value));
    } else {
      dispatch(removeBenefit(value));
    }
  };

  const handleContinue = () => {
    if (benefits.length === 0 || description.trim() === '') {
      alert('Please select at least one benefit and provide a job description.');
    } else {
      navigate('/edit-jobs');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-6">
      <div className="py-10 bg-customSky1 flex justify-around items-center w-full max-w-4xl px-6">
        <h1 className="text-3xl font-bold">Add Pay and Benefits</h1>
        <img src={Ship} alt="ship" height={120} width={120} />
      </div>
      <div className="bg-customSky2 shadow-md rounded-lg p-14">
        <div className="mb-10 bg-white">
          <h5 className="text-lg font-bold mb-4">Benefits</h5>
          <div className="grid grid-cols-3 gap-2 border-solid border-2 border-sky-200 rounded-lg p-6 px-8">
            {benefitsList.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`benefit-${index}`}
                  name="benefits"
                  value={benefit}
                  checked={benefits.includes(benefit)}
                  onChange={handleBenefitChange}
                  className="mr-1"
                />
                <label htmlFor={`benefit-${index}`} className='text-sm'>{benefit}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h5 className="text-lg font-bold mb-4">Add Job Description</h5>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter job description here"
            className="w-full p-2 border border-sky-200 rounded-md h-40 mb-4"
          ></textarea>
          <div className="flex justify-between mt-">
            <Link to="/add-job-basics" className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&larr; Back</Link>
            <button onClick={handleContinue} className="bg-customBlue hover:bg-customBlue2 text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">Continue &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPayAndBenefits;
