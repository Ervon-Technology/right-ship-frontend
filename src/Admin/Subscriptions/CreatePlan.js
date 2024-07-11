// src/components/Createplan.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlan } from '../../slice/planSlice';
import { fetchPlans   } from '../../slice/planSlice';
import { useNavigate } from 'react-router-dom';

const Createplan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    features: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlan = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      duration: formData.duration,
      features: formData.features,
      startDate: '-',
      expireDate: '-',
      
    };
    dispatch(addPlan(newPlan)) // Dispatch addPlan action to add new plan
    .then(() => {
      dispatch(fetchPlans()); // Fetch updated plans after adding new plan
      navigate('/subscriptions');
    })
    .catch((error) => {
      console.error('Failed to add plan:', error);
      // Handle error if needed
    });

    navigate('/subscriptions');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <h1 className="text-xl font-bold text-left">Plan Management</h1>
        <h2 className="text-lg font-semibold">Create Subscription Plan</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Booster Plan"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Get high recommend"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                placeholder="0-3 months"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <input
              type="text"
              name="features"
              placeholder="Plan feature"
              value={formData.features}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" className="px-4 py-2 me-12 bg-gray-300 text-gray-700 rounded-md" onClick={() => navigate('/')}>Cancel</button>
            <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Preview</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createplan;
