import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Createplan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    start_date: '',
    expire_date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://65.0.167.98/subscription/create';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      },
      body: JSON.stringify({
        name: formData.name,
        price: formData.price,
        start_date: formData.start_date,
        expire_date: formData.expire_date,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error('Failed to create plan');
      }

      // If successful, navigate to subscriptions page
      navigate('/subscriptions');
      // console.log('response is ')
    } catch (error) {
      console.error('Failed to create plan:', error);
      // Handle error if needed
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
              placeholder="Premium Plan"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expire Date</label>
            <input
              type="date"
              name="expire_date"
              value={formData.expire_date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" className="px-4 py-2 me-12 bg-gray-300 text-gray-700 rounded-md" onClick={() => navigate('/subscriptions')}>Cancel</button>
            <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Preview</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Createplan;