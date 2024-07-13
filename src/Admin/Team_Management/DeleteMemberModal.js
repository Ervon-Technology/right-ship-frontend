import React from 'react';

const DeleteMemberModal = ({ member, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete(member.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4 text-center">Delete Member</h2>
        <p className="mb-4">Are you sure you want to delete {member.name}?</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;