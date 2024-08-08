import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../features/otpSlice';
import { setContactInfo } from '../../features/contactSlice';
import Modal from 'react-modal';
import VerifyNumber from './VerifyNumber';
import { useNavigate } from 'react-router-dom';
// import './changenumber.css'

Modal.setAppElement('#root'); // Required for accessibility, make sure your root element id is 'root'

const ChangeNumber = () => {
  const navigate=useNavigate()
  const [number, setNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSendOtp = () => {
    dispatch(sendOtp(number));
    dispatch(setContactInfo(number));
    // navigate('/verifynumber')
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Change Number</h2>
      <input
        type="text"
        value={number}
        placeholder='+91 6372778345'
        onChange={handleNumberChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSendOtp}
        className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        disabled={otpStatus === 'loading'}
      >
        {otpStatus === 'loading' ? 'Sending...' : 'Send OTP'}
      </button>
      {otpStatus === 'failed' && <p className="text-red-600 mt-4">{otpError}</p>}
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Verify OTP"
        className="w-full max-w-md p-8 bg-white shadow-md rounded-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <VerifyNumber closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ChangeNumber;
