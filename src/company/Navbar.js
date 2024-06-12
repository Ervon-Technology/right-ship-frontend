import { useState, useEffect } from "react";
import React from 'react';

const Empteam = () => {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://655500aa63cafc694fe75243.mockapi.io/crud-youtube", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setData(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleDropdownToggle = (index) => {
    const newData = [...data];
    newData[index].expanded = !newData[index].expanded;
    setData(newData);
  };

  if (data.length === 0) {
    // If data is empty, show a loading indicator or message
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-[1105px] mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input
              className="h-4 w-4 border-gray-300 rounded mr-2"
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label className="font-medium">Select All</label>
          </div>
          <div className="flex items-center">
            <input
              className="border border-blue-300 px-4 py-2 rounded-lg w-full sm:w-auto mr-2"
              type="text"
              placeholder="Search by name & Email"
            />
            <button className="border border-blue-300 px-4 py-2 rounded-lg w-full sm:w-auto mr-2">Add User</button>
          </div>
        </div>
        
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border-collapse border border-blue-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-blue-300 px-4 py-2 text-left font-medium">Select</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-medium">Name</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-medium">Email</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-medium">Contact</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-medium">Status</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-medium">Role</th>
                <th className="border border-blue-300 px-4 py-2 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((userData, index) => (
                <React.Fragment key={index}>
                  <tr className="bg-white border border-blue-300">
                    <td className="border border-blue-300 px-4 py-2">
                      <input className="h-4 w-4 border-gray-300 rounded" type="checkbox" />
                    </td>
                    <td className="border border-blue-300 px-4 py-2">{userData.name}</td>
                    <td className="border border-blue-300 px-4 py-2">{userData.email}</td>
                    <td className="border border-blue-300 px-4 py-2">{userData.contact}</td>
                    <td className="border border-blue-300 px-4 py-2">{userData.status}</td>
                    <td className="border border-blue-300 px-4 py-2">{userData.role}</td>
                    <td className="border border-blue-300 px-4 py-2 relative">
                      <button
                        className="focus:outline-none"
                        onClick={() => handleDropdownToggle(index)}
                      >
                        <img
                          width="24"
                          height="24"
                          src="https://img.icons8.com/material-rounded/24/menu-2.png"
                          alt="menu-2"
                        />
                      </button>
                      {userData.expanded && (
                        <div
                          style={{
                            position: "absolute",
                            zIndex: 10,
                            top: "100%",
                            right: 0,
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            borderRadius: "0.5rem",
                            padding: "0.5rem 0",
                          }}
                        >
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            Option 1
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            Option 2
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            Option 3
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Empteam;
