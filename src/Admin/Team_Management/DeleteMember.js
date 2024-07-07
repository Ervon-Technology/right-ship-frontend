// DeletePage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleConfirmDelete = () => {
    alert(`Confirmed deletion`);
    // Implement actual delete functionality here
    navigate('/admin_team_management');
  };

  const handleCancel = () => {
    navigate('/admin_team_management');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4"> Delete Member</h1>
      <p>Are you sure you want to delete member{id}?</p>
      <p>This action cannot be undone</p>
      <div className="flex mt-4">
        <button 
          className="bg-gray-500 text-white px-4 py-2 m-2 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="bg-red-500 text-white px-4 py-2 m-2 rounded"
          onClick={handleConfirmDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteMember;