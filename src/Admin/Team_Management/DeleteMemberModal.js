import React from 'react';

const DeleteMemberModal = ({ member, onClose, onDelete }) => {
  const handleConfirmDelete = () => {
    onDelete(member.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-5 text-center">Delete Member</h2>
        <p className="text-center">Are you sure you want to delete this member?</p>
        <p className="text-center mb-4">This action cannot be undone.</p>
        <div className="flex justify-center mt-5 gap-4">
          <button
            type="button"
            className="bg-gray-300 text-black font-semibold px-6 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white font-semibold px-6 py-2 rounded"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;
