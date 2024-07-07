import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Subscriptions = () => {
  const [plans] = useState([
    { id: 1, name: 'Premium Plan', price: '599/-', startDate: '-', expireDate: '-' },
    { id: 2, name: 'Basic Plan', price: '299/-', startDate: '-', expireDate: '-' },
    { id: 3, name: 'Enterprise Plan', price: '999/-', startDate: '-', expireDate: '-' },
  ]);

  const [activePlans] = useState([
    { id: 1, name: 'Premium Plan', description: 'Includes all features', },
    { id: 2, name: 'Basic Plan', description: 'Limited features', },
  ]);

  const [expiredPlans] = useState([
    { id: 1, name: 'Starter Plan', description: 'Basic features only', },
  ]);


    // Fetch plans from backend
//   useEffect(() => {
//     // Example API calls, replace with your backend endpoints

//   }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subscription Plan</h1>
        <Link to="/create_plan"><button className="bg-blue-500 text-white px-4 py-2 rounded">Create Plan</button></Link>
      </div>
      <hr className="mb-4" />
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Created Plan</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Plan Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Start Date</th>
              <th className="py-2">Expire Date</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={index}>
                <td className="text-center py-2"><input type="checkbox" /></td>
                <td className="text-center py-2">{plan.name}</td>
                <td className="text-center py-2">{plan.price}</td>
                <td className="text-center py-2">{plan.startDate}</td>
                <td className="text-center py-2">{plan.expireDate}</td>
                <td className="text-center py-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6" className="text-right py-10 mt-44">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Activate All Plans</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Activate Selected Plans</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="mb-4" />
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">All Plans</h2>
        <div className="flex flex-wrap gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="w-1/4 p-4 border  rounded bg-blue-300 ">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p>{/* Placeholder for description */}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="mb-4" />

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Active Plans</h2>
        <div className="flex flex-wrap gap-4">
          {activePlans.map((plan, index) => (
            <div key={index} className="w-1/3 p-4 border rounded bg-green-200">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="mb-4" />

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Expired Plans</h2>
        <div className="flex flex-wrap gap-4">
          {expiredPlans.map((plan, index) => (
            <div key={index} className="w-1/3 p-4 border rounded bg-red-300">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;