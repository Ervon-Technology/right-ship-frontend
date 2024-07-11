// src/Admin/Subscriptions/Subscriptions.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPlans, selectPlans } from '../../store/planSlice';

const Subscriptions = () => {
  const dispatch = useDispatch();
  const { plans, status, error } = useSelector(selectPlans);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPlans());
    }
  }, [dispatch, status]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subscription Plan</h1>
        <Link to="/create_plan">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Plan</button>
        </Link>
      </div>
      <hr className="mb-4" />

      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      
      {status === 'succeeded' && (
        <>
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
                <td className="text-center py-2">{plan.start_date}</td>
                <td className="text-center py-2">{plan.expire_date}</td>
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
                <div key={index} className="w-1/4 p-4 border rounded bg-blue-300">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="mb-4" />

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Active Plans</h2>
            <div className="flex flex-wrap gap-4">
              {plans.filter(plan => plan.isActive).map((plan, index) => (
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
              {plans.filter(plan => !plan.isActive).map((plan, index) => (
                <div key={index} className="w-1/3 p-4 border rounded bg-red-300">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Subscriptions;
