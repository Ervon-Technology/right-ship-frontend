import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://65.0.167.98/subscription/get', {});
      const plansData = response.data.data || [];
      setPlans(plansData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const editPlan = async (subscriptionId, newName) => {
    try {
      const response = await axios.post('http://65.0.167.98/subscription/edit', {
        name: newName,
        subscription_id: subscriptionId
      });
      const updatedPlan = response.data.data || [];
      const updatedPlans = plans.map(plan => {
        if (plan.subscription_id === subscriptionId) {
          return updatedPlan;
        }
        return plan;
      });
      setPlans(updatedPlans);
    } catch (error) {
      console.error('Edit Error:', error);
    }
  };

  const deletePlan = async (subscriptionId) => {
    try {
      const response = await axios.post('http://65.0.167.98/subscription/delete', {
        subscription_id: subscriptionId
      });
      const deleteedPlans = plans.filter(plan => plan.subscription_id !== subscriptionId);
      setPlans(deleteedPlans);
      console.log(response)
    } catch (error) {
      console.error('Delete Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentDate = getCurrentDate();

  const activePlans = plans.filter(plan => {
    return plan.startDate <= currentDate && plan.expireDate >= currentDate;
  });

  const expiredPlans = plans.filter(plan => {
    return plan.expireDate < currentDate;
  });

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Subscription Plan</h1>
        <Link to="/create_plan">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Plan</button>
        </Link>
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
                <td className="text-center py-2">
                  <input type="checkbox" />
                </td>
                <td className="text-center py-2">{plan.name}</td>
                <td className="text-center py-2">{plan.price}</td>
                <td className="text-center py-2">{plan.startDate}</td>
                <td className="text-center py-2">{plan.expireDate}</td>
                <td className="text-center py-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => editPlan(plan.subscription_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deletePlan(plan.subscription_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6" className="text-right py-10 mt-44">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Activate All Plans
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Activate Selected Plans
                </button>
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