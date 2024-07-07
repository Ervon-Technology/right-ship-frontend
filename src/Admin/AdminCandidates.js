import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const AdminCandidates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://api.example.com/candidates');
//         setData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

  // Dummy data for demonstration
  const dummyData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', created: '2024-01-01', plan: 'Standard Plan' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Non Active', created: '2024-01-02', plan: '-' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', created: '2024-01-03', plan: 'Standard Plan' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', status: 'Non Active', created: '2024-01-04', plan: '-' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 'Active', created: '2024-01-05', plan: 'Standard Plan' },
    { id: 6, name: 'Dana White', email: 'dana@example.com', status: 'Non Active', created: '2024-01-06', plan: '-' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Candidate List</h1>
      <hr className="my-4" />
      
      <div className="flex space-x-4">
        <div>
          <h2 className="font-semibold">Search</h2>
          <input
            type="search"
            placeholder="Search..."
            className="border rounded p-2"
            size={24}
          />
        </div>
        
        <div>
          <h2 className="font-semibold">Email Verification</h2>
          <select className="border rounded p-2 w-72" >
            <option>Verified</option>
            <option>Not Verified</option>
          </select>
        </div>

        <div>
          <h2 className="font-semibold">Job Type</h2>
          <select className="border rounded p-2 w-72">
            <option>Full-time</option>
            <option>Part-time</option>
          </select>
        </div>

        <div>
          <h2 className="font-semibold">Sort By</h2>
          <select className="border rounded p-2 w-72">
            <option>Name</option>
            <option>Email</option>
          </select>
        </div>
      </div>

      <table className="min-w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-200">
            <th className="border p-2">#</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created Time</th>
            <th className="border p-2">Plan</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Comment out this part and use dummyData for now */}
          {/*
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center p-4">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="7" className="text-center p-4">{error}</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border p-2">{item.id}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.status}</td>
                <td className="border p-2">{item.created}</td>
                <td className="border p-2">{item.plan}</td>
                <td className="border p-2">
                  <FaEye className="inline-block" />
                </td>
              </tr>
            ))
          )}
          */}

          {/* Use this dummy data for now */}
          {dummyData.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.email}</td>
              <td className="border p-2">{item.status}</td>
              <td className="border p-2">{item.created}</td>
              <td className="border p-2">{item.plan}</td>
              <td className="border p-2">
                <FaEye className="inline-block" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex  items-center mt-10 ms-80">
        <button className="p-2 bg-blue-300 rounded ms-44"><IoIosArrowBack /></button>
        <span className='bg-blue-300 ms-5 p-1 px-7 rounded-lg font-bold'>pages 1 of 1</span>
        <button className="p-2 bg-blue-300 rounded ms-5"><IoIosArrowForward /></button>
      </div>
    </div>
  );
};

export default AdminCandidates;