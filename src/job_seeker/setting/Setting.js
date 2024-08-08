import React, { useState } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ChangeMail from './ChangeMail';
import ChangeNumber from './ChangeNumber';

Modal.setAppElement('#root'); // Set the app root element for accessibility

function Setting() {
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);

  const openMailModal = () => setIsMailModalOpen(true);
  const closeMailModal = () => setIsMailModalOpen(false);

  const openNumberModal = () => setIsNumberModalOpen(true);
  const closeNumberModal = () => setIsNumberModalOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 -mt-24 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Security Mail</p>
              <p className="text-sm text-gray-500">demo@gmail.com</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700" onClick={openMailModal}>
              <FaRegEdit className='text-black' />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Security Number</p>
              <p className="text-sm text-gray-500">91 8693895363</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700" onClick={openNumberModal}>
              <FaRegEdit className='text-black' />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-4 py-2 font-medium text-white bg-red-500 rounded-sm hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>

      {/* Modal for ChangeMail */}
      <Modal
        isOpen={isMailModalOpen}
        onRequestClose={closeMailModal}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <ChangeMail />
        <button className="mt-4 w-full px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600" onClick={closeMailModal}>
          Close
        </button>
      </Modal>

      {/* Modal for ChangeNumber */}
      <Modal
        isOpen={isNumberModalOpen}
        onRequestClose={closeNumberModal}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <ChangeNumber />
        <button className="mt-4 w-full px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600" onClick={closeNumberModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Setting;
