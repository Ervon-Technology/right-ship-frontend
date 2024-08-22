import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import VerifyNumber from './VerifyNumber';
import axios from 'axios';

Modal.setAppElement('#root'); // Required for accessibility, make sure your root element id is 'root'

const ChangeNumber = () => {
  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const email = useSelector((state) => state.contact.email);
  const employeeId = useSelector((state) => state.employee.employee_id);
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactPlaceholder, setContactPlaceholder] = useState('+91 6372778345');
  const [otpStatus, setOtpStatus] = useState('idle');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const response = await axios.post('https://api.rightships.com/employee/get', {
          mobile_no: contactInfo, 
          user_type: 'employee',
        });

        const data = response.data;
        // Set placeholders based on the response
        setContactPlaceholder(data.mobile_no || '+91 6372778345');
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [contactInfo]);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSendOtp = async () => {
    setOtpStatus('loading');
    try {
      await axios.post('https://api.rightships.com/otp/send_otp', {
        mobile_no: number,
        user_type: 'employee',
      });

      setOtpStatus('succeeded');
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      setOtpStatus('failed');
      setOtpError('Failed to send OTP. Please try again.');
      console.error('Error sending OTP:', error);
    }
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
        placeholder={contactPlaceholder}
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
        <VerifyNumber closeModal={closeModal}  />
      </Modal>
    </div>
  );
};

export default ChangeNumber;
