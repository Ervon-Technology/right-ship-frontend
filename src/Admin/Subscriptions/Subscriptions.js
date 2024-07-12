import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Subscriptions = () => {
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const plans = [{
    "_id": "668f91e3c8315a65dd4bc44e",
    "created_date": "Thu, 11 Jul 2024 08:03:47 GMT",
    "expire_date": "2024-10-11",
    "name": "Nishikant Sahoo",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668f91e3c8315a65dd4bc44e"
  },
  {
    "_id": "668fb8efc8315a65dd4bc450",
    "created_date": "Thu, 11 Jul 2024 10:50:23 GMT",
    "expire_date": "2024-10-11",
    "name": "ankita dhall",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668fb8efc8315a65dd4bc450"
  },
  {
    "_id": "668fd4fbc8315a65dd4bc454",
    "created_date": "Thu, 11 Jul 2024 12:50:03 GMT",
    "expire_date": "2024-10-11",
    "name": "nishi",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668fd4fbc8315a65dd4bc454"
  },
  {
    "_id": "668fd99fc8315a65dd4bc455",
    "created_date": "Thu, 11 Jul 2024 13:09:51 GMT",
    "expire_date": "2024-10-11",
    "name": "aman ",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668fd99fc8315a65dd4bc455"
  },
  {
    "_id": "668fdbb2c8315a65dd4bc456",
    "created_date": "Thu, 11 Jul 2024 13:18:42 GMT",
    "expire_date": "2024-10-11",
    "name": "chuchu",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668fdbb2c8315a65dd4bc456"
  },
  {
    "_id": "668fdbefc8315a65dd4bc457",
    "created_date": "Thu, 11 Jul 2024 13:19:43 GMT",
    "expire_date": "2024-10-11",
    "name": "nishi1",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668fdbefc8315a65dd4bc457"
  },
  {
    "_id": "668fe815c8315a65dd4bc45b",
    "created_date": "Thu, 11 Jul 2024 14:11:33 GMT",
    "expire_date": "2024-10-11",
    "name": "chaku",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668fe815c8315a65dd4bc45b"
  },
  {
    "_id": "668fe91ac8315a65dd4bc45c",
    "created_date": "Thu, 11 Jul 2024 14:15:54 GMT",
    "expire_date": "2024-10-11",
    "name": "niahi3",
    "price": "10000",
    "start_date": "2024-07-11",
    "subscription_id": "668fe91ac8315a65dd4bc45c"
  },]
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
          {plans.map((plan, index) => (
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
          {plans.map((plan, index) => (
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
