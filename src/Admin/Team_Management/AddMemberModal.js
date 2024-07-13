import React, { useState } from 'react';
import axios from 'axios';

const AddMemberModal = ({ onClose, onSave }) => {
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
    joinedDate: new Date().toLocaleDateString(),
    description: '',
    permissions: ['admin', 'user'] // Assuming these are default permissions
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(newMember);
      setSaving(false);
      onClose(); // Close the modal on successful save
    } catch (error) {
      console.error('Failed to add team member:', error);
      setSaving(false);
      // Handle error as needed
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Add Member</h2>
        <div className="flex flex-col">
          <label className="mb-2 font-bold">Name</label>
          <input
            className="mb-4 p-2 border bg-gray-200 rounded"
            type="text"
            name="name"
            value={newMember.name}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Email</label>
          <input
            className="mb-4 p-2 border bg-gray-200 rounded"
            type="email"
            name="email"
            value={newMember.email}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Role</label>
          <input
            className="mb-4 p-2 border bg-gray-200 rounded"
            type="text"
            name="role"
            value={newMember.role}
            onChange={handleChange}
          />
          <label className="mb-2 font-bold">Status</label>
          <select
            className="mb-4 p-2 border bg-gray-200 rounded"
            name="status"
            value={newMember.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
          <label className="mb-2 font-bold">Description</label>
          <textarea
            className="mb-4 p-2 border bg-gray-200 rounded"
            name="description"
            value={newMember.description}
            onChange={handleChange}
          />
          <div className="flex justify-center mt-4 gap-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-6 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`bg-blue-500 text-white px-6 py-2 rounded ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;