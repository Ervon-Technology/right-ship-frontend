import React, { useState, useEffect } from 'react';

const EditMemberModal = ({ member, onClose, onSave }) => {
  const [updatedMember, setUpdatedMember] = useState(member);

  useEffect(() => {
    setUpdatedMember(member);
  }, [member]);

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
        <h2 className="text-xl font-bold mb-4">Edit Member</h2>
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Name</label>
          <input
            className="mb-4 p-2 border bg-gray-200"
            type="text"
            name="name"
            value={updatedMember.name}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Email</label>
          <input
            className="mb-4 p-2 border bg-gray-200"
            type="email"
            name="email"
            value={updatedMember.email}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Role</label>
          <input
            className="mb-4 p-2 border bg-gray-200"
            type="text"
            name="role"
            value={updatedMember.role}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Status</label>
          <input
            className="mb-4 p-2 border bg-gray-200"
            type="text"
            name="status"
            value={updatedMember.status}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Description</label>
          <textarea
            className="mb-4 p-2 border bg-gray-200"
            name="description"
            value={updatedMember.description}
            onChange={handleChange}
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;