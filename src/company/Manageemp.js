import { useState, useEffect } from "react";
import React from 'react';
import {EllipsisVertical } from 'lucide-react'


const Empteam = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://666995dc2e964a6dfed5c163.mockapi.io/Akash", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setData(data);
        setFilteredData(data);  // Initialize filteredData with fetched data
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(result);
  }, [searchQuery, data]);

  const handleDropdownToggle = (index) => {
    const newData = [...filteredData];
    newData[index].expanded = !newData[index].expanded;
    setFilteredData(newData);  // Update the state with the modified data
  };


  const handleAddUserClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
  };

  if (data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-container p-4  overflow-hidden">
      <div className="container mx-auto h-full">
        <div className=" border-2 border-gray-300 px-4 py-2  mx-auto h-full">
          <div className="flex justify-between pt-2 items-center mb-4">
            <div className="flex items-center">
              <label className="font-medium hover:bg-sky-800 px-4 py-2 border-2  border-gray-300 hover:text-white rounded hover:border-white">Show All</label>
              <input
                className="border-2 border-gray-300  ml-4 px-4 py-2 w-full sm:w-auto mr-2"
                type="text"
                placeholder="Search by name & Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <button
                className="border-2 border-gray-300 px-4 py-2 w-full sm:w-auto mr-2 hover:bg-sky-800 hover:font-bold hover:text-white rounded-sm hover:border-white"
                onClick={handleAddUserClick}
              >
                Add User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto mt-4 h-full border-5 border-blue-300">
            <div style={{ maxHeight: "425px", overflowY: "auto" }}>
              <table className="min-w-full bg-white border-collapse border-2 border-gray-300">
                <thead className="bg-gray-100 ">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium" style={{ minWidth: '50px' }}>
                      <input className="h-4 w-4 border-gray-300 rounded" type="checkbox" />
                    </th>
                    <th className="px-4 py-2 text-left font-medium" style={{ minWidth: '100px' }}>Name</th>
                    <th className="px-4 py-2 text-left font-medium" style={{ minWidth: '200px' }}>Email</th>
                    <th className="px-4 py-2 text-left font-medium" style={{ minWidth: '100px' }}>Contact</th>
                    <th className="px-4 py-2 text-left font-medium" style={{ minWidth: '100px' }}>Status</th>
                    <th className="px-4 py-2 text-left font-medium" style={{ minWidth: '100px' }}>Role</th>
                    <th className="px-4 py-2 text-left font-medium" style={{ minWidth: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((userData, index) => (
                    <tr key={index} className="border-2 border-gray-300 bg-white h-8">
                      <td className="px-4 py-2">
                        <input className="h-4 w-4 border-gray-300 rounded" type="checkbox" />
                      </td>
                      <td className="px-4 py-2">{userData.name}</td>
                      <td className="px-4 py-2">{userData.email}</td>
                      <td className="px-4 py-2">{userData.contact}</td>
                      <td className="px-4 py-2">{userData.status}</td>
                      <td className="px-4 py-2">{userData.role}</td>
                      <td className="px-4 py-2 relative">
                        <button
                          className="focus:outline-none"
                          onClick={() => handleDropdownToggle(index)}
                        >
                          <EllipsisVertical />
                        </button>
                        {userData.expanded && (
                          <div
                            className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg py-1 z-10"
                          >
                            <i

                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                              Option 1
                            </i>
                            <i

                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                              Option 2
                            </i>
                            <i

                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            >
                              Option 3
                            </i>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  name="sendInvite"
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Send an Invite
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className="font-medium hover:bg-sky-800 px-4 py-2 border-2 border-gray-300 hover:text-white rounded-sm hover:border-white"
                  type="submit"
                  onClick={handlePopupClose}
                >
                  Cancel
                </div>
                <button
                  className="font-medium hover:bg-sky-800 px-4 py-2 border-2 border-gray-300 hover:text-white rounded-sm hover:border-white"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empteam;
