// SuspendPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SuspendPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuspend = () => {
    alert(`Member ${id} suspended`);
    // Implement actual suspend functionality here
    navigate('/adminrole2');
  };

  const handleCancel = () => {
    navigate('/adminrole2');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-16"> Suspend Member</h1>
      <input
        type="text"
        placeholder={`Reason for suspending member ${id}`}
        className="border border-gray-300 rounded px-4 py-2 mb-4"
        size={37}
      />
     
      <div className="flex mt-4">
        <button 
          className="bg-gray-500 text-white px-4 py-2 m-2 rounded"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button 
          className="bg-yellow-500 text-white px-4 py-2 m-2 rounded"
          onClick={handleSuspend}
        >
          Suspend
        </button>
      </div>
    </div>
  );
};

export default SuspendPage;
