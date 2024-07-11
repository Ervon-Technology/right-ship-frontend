import React, { useState } from 'react';

const EditMemberModal = ({ member, onClose, onSave }) => {
  const [updatedMember, setUpdatedMember] = useState(member);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedMember);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Member</h2>
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Name</label>
          <input
            className="mb-4 p-2 border bg-gray-200 rounded"
            type="text"
            name="name"
            value={updatedMember.name}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Email</label>
          <input
            className="mb-4 p-2 border bg-gray-200 rounded"
            type="email"
            name="email"
            value={updatedMember.email}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Role</label>
          <input
            className="mb-4 p-2 border bg-gray-200 rounded"
            type="text"
            name="role"
            value={updatedMember.role}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Status</label>
          <select
            className="mb-4 p-2 border bg-gray-200 rounded"
            name="status"
            value={updatedMember.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <label className="mb-2 font-bold">Description</label>
          <textarea
            className="mb-4 p-2 border bg-gray-200 rounded"
            name="description"
            value={updatedMember.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
