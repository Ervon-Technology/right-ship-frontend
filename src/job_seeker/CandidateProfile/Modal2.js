import React, { useState } from 'react';

const Modal2 = ({ isOpen, onClose, coc, setCoc, cop, setCop, watchKeeping, setWatchKeeping }) => {
  if (!isOpen) return null;

  const handleCocChange = (e) => setCoc(e.target.value);
  const handleCopChange = (e) => setCop(e.target.value);
  const handleWatchKeepingChange = (e) => setWatchKeeping(e.target.value);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-lg font-bold mb-4">Frame 1000007531</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label>COC:</label>
            <input type="text" value={coc} onChange={handleCocChange} className="border p-2 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <label>COP:</label>
            <input type="text" value={cop} onChange={handleCopChange} className="border p-2 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <label>Watch keeping:</label>
            <input type="text" value={watchKeeping} onChange={handleWatchKeepingChange} className="border p-2 rounded" />
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md" onClick={onClose}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal2;
