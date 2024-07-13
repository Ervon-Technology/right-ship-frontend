import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Plans = () => {
  const [searchId, setSearchId] = useState('');
  const [plans, setPlans] = useState([
    { order_id: 1, name: 'Company A', plan: 'Standard Plan', purchase_date: '2024-06-29', expire_date: '2025-06-29', transaction_history: 'View Profile' },
    // Add more demo data here as needed
  ]);
  const [searchResult, setSearchResult] = useState(null); // State to store search result
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 5; // Number of plans per page

  useEffect(() => {
    // Initialize the table with all plans when component mounts
    setSearchResult(plans);
  }, [plans]);

  // Function to handle search
  const handleSearch = () => {
    const foundPlan = plans.filter(plan => plan.order_id === parseInt(searchId));
    setSearchResult(foundPlan);
  };

  // Pagination logic
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = searchResult && searchResult.length > 0 ? searchResult.slice(indexOfFirstPlan, indexOfLastPlan) : [];
  const totalPages = Math.ceil(searchResult ? searchResult.length / plansPerPage : 0);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col items-center mx-4">
      <div className="flex justify-between w-full mt-4">
        <h1 className="text-2xl font-bold">Plans</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Export</button>
      </div>
      <div className="border-b border-gray-300 w-full mt-4 mb-4"></div>
      <div className="flex items-center w-full">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Search</h2>
          <input
            type="text"
            className="border border-gray-300 rounded px-3 py-2 mt-2"
            placeholder="Search ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
            onClick={handleSearch}
          >
            Search
          </button>
          {searchResult && searchResult.length === 0 && (
            <p className="mt-2 text-red-500">Cannot find plan with ID: {searchId}</p>
          )}
        </div>
        <div className="flex-1 -ml-96">
          <h2 className="text-lg font-semibold">Sort By</h2>
          {/* Dropdown list for sorting */}
          <select className="border border-gray-300 rounded px-3 py-2 mt-2 w-60">
            <option value="order_id">Order ID</option>
            <option value="name">Name</option>
            {/* Add more sorting options as needed */}
          </select>
        </div>
      </div>
      <div className="w-full mt-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expire Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction History</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPlans.map((plan) => (
              <tr key={plan.order_id}>
                <td className="px-6 py-4 whitespace-nowrap">{plan.order_id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.plan}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.purchase_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.expire_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.transaction_history}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-sky-200 text-black font-bold px-4 py-3 rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </button>
          <div className="mx-2 px-4 py-2 bg-sky-200 text-black font-bold rounded">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="bg-sky-200 text-black font-bold px-4 py-3 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
