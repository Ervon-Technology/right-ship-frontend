import React, { useState } from 'react';

const SuspendMemberModal = ({ member, onClose, onSuspend }) => {
  const [reason, setReason] = useState('');

  const handleSuspend = () => {
    const updatedMember = { ...member, status: 'Suspended', reason };
    onSuspend(updatedMember);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-8 text-center">Suspend Member</h2>
        <input
          type="text"
          placeholder="Select the duration for suspension:"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-center mt-4 gap-4">
          <button
            type="button"
            className="bg-gray-300 text-black font-semibold px-6 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded"
            onClick={handleSuspend}
          >
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendMemberModal;