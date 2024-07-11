// src/Admin/Subscriptions/CreatePlan.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPlan } from '../../store/planSlice';

const CreatePlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    features: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = new Date();
    const expireDate = new Date();
    const [months] = formData.duration.split('-').map(Number);
    expireDate.setMonth(startDate.getMonth() + months);

    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      start_date: startDate.toISOString().split('T')[0],
      expire_date: expireDate.toISOString().split('T')[0],
      features: formData.features,
    };

    try {
      await dispatch(createPlan(data));
      navigate('/subscriptions');
    } catch (error) {
      console.error('Error:', error);
    }
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
              value={formData.name}
              onChange={handleChange}
              placeholder="Booster Plan"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Get high recommend"
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
                value={formData.duration}
                onChange={handleChange}
                placeholder="0-3 months"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Features</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Plan feature"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
            <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Preview</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
