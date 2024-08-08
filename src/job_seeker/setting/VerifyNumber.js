// src/components/VerifyNumber.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const VerifyNumber = ({ closeModal }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);
  const contactInfo = useSelector((state) => state.contact.contactInfo);
  const dispatch = useDispatch();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleSendOtp = () => {
    // Dispatch the resend OTP action here
    // dispatch(sendOtp(contactInfo));
    setTimer(30);
    setCanResend(false);
  };

  const handleVerifyOtp = async () => {
    try {
      const verifyResponse = await fetch('https://api.rightships.com/otp/verify_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile_no: contactInfo, otp }),
      });

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.message || 'Failed to verify OTP');
      }

      const verifyData = await verifyResponse.json();
      if (verifyData.code === 200) {
        console.log('OTP verified successfully:', verifyData);

        // Call update API after successful OTP verification
        const updateResponse = await fetch('https://api.rightships.com/employee/update', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employee_id: '669b88908c9761528b0cfbb6', // Replace with the actual employee ID
            name: 'Aniket', // Replace with the actual name to be updated
          }),
        });

        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
          throw new Error(errorData.message || 'Failed to update employee');
        }

        const updateData = await updateResponse.json();
        console.log('Employee updated successfully:', updateData);
        closeModal(); // Close the modal after successful update
        navigate('/profile'); // Redirect to the desired page after successful update
      } else {
        throw new Error(verifyData.msg || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error (e.g., show a toast notification)
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyOtp}
          className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={otpStatus === 'loading'}
        >
          {otpStatus === 'loading' ? 'Verifying...' : 'Verify OTP'}
        </button>
        {otpStatus === 'failed' && <p className="text-red-600 mt-4">{otpError}</p>}
        <p className="text-center mt-4">
          {canResend ? (
            <button
              onClick={handleSendOtp}
              className="text-blue-600 underline text-sm underline-offset-8"
            >
              Resend OTP
            </button>
          ) : (
            `Resend OTP in: ${formatTime(timer)}`
          )}
        </p>
    
      </div>
    </div>
  );
};

export default VerifyNumber;
