import { useState, useEffect } from "react";
import React from 'react';

const ManageUsers = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    status: 'active',
    role: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editTeamId, setEditTeamId] = useState(null);

  const company_id = localStorage.getItem("company_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.rightships.com/company/team/get", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ company_id })
        });
        const result = await response.json();
        const teamMembers = result.team_members || [];
        setData(teamMembers);
        setFilteredData(teamMembers);
      } catch (err) {
        console.log(err.message);
        setData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, [company_id]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const result = data.filter(user => {
        const name = user.name || '';
        const email = user.email || '';
        return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               email.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setFilteredData(result);
    }
  }, [searchQuery, data]);

  const handleAddUserClick = () => {
    setShowPopup(true);
    setEditMode(false);
    setFormData({
      name: '',
      email: '',
      mobile_no: '',
      status: 'active',
      role: ''
    });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = editMode ? 'https://api.rightships.com/company/team/edit' : 'https://api.rightships.com/company/team/add';
      const payload = editMode ? { ...formData, team_id: editTeamId } : { ...formData, company_id };

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const response = await fetch("https://api.rightships.com/company/team/get", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company_id })
      });
      const result = await response.json();
      const teamMembers = result.team_members || [];
      setData(teamMembers);
      setFilteredData(teamMembers);
      setShowPopup(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditUserClick = (user) => {
    setShowPopup(true);
    setEditMode(true);
    setFormData({
      name: user.name,
      email: user.email,
      mobile_no: user.mobile_no,
      status: user.status,
      role: user.role
    });
    setEditTeamId(user._id);
  };

  const handleDeleteUserClick = async (team_id) => {
    try {
      await fetch('https://api.rightships.com/company/team/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_id }),
      });

      const response = await fetch("https://api.rightships.com/company/team/get", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company_id })
      });
      const result = await response.json();
      const teamMembers = result.team_members || [];
      setData(teamMembers);
      setFilteredData(teamMembers);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!Array.isArray(data) || data.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-container p-4">
      <div className="container mx-auto h-full">
        <div className="border border-gray-300 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Show All
              </button>
              <input
                className="border border-gray-300 ml-4 px-4 py-2 w-full sm:w-auto rounded"
                type="text"
                placeholder="Search by name & email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="border border-gray-300 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleAddUserClick}
            >
              Add User
            </button>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">
                    <input className="h-4 w-4 border-gray-300 rounded" type="checkbox" />
                  </th>
                  <th className="px-4 py-2 text-left font-medium">Name</th>
                  <th className="px-4 py-2 text-left font-medium">Email</th>
                  <th className="px-4 py-2 text-left font-medium">Contact</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Role</th>
                  <th className="px-4 py-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-4 py-2">
                      <input className="h-4 w-4 border-gray-300 rounded" type="checkbox" />
                    </td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.mobile_no}</td>
                    <td className="px-4 py-2">{user.status}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleEditUserClick(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDeleteUserClick(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Mobile No</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.mobile_no}
                  onChange={(e) => setFormData({ ...formData, mobile_no: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Role</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 border border-gray-300 rounded"
                  onClick={handlePopupClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {editMode ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
