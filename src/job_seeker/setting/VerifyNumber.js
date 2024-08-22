import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VerifyNumber = ({ closeModal }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);
  const employeeId = useSelector((state) => state.auth.user._id);
  const contactInfo = useSelector((state) =>  state.auth.user.mobile_no);
  const state = useSelector((state) => state);
  console.log(state);
  console.log(employeeId)
  const dispatch = useDispatch();
  const [contact, setContact] = useState('');

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch('https://api.rightships.com/employee/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ employee_id: employeeId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contact information');
        }

        const data = await response.json();
        setContact(data.data[0].mobile_no);
      } catch (error) {
        console.error('Error fetching contact information:', error);
      }
    };

    if (employeeId) {
      fetchContactInfo();
    }
  }, [employeeId]);

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
  
        const verifyData = await verifyResponse.json();
        console.log('Server Response:', verifyData);
  
        // Check if the server indicated success with code 200
        if (verifyData.code !== 200) {
            throw new Error(verifyData.message || 'Failed to verify OTP');
        }
  
        console.log('OTP verified successfully:', verifyData);
  
        // Proceed with the update API call after OTP verification
        const updatePayload = {
            employee_id: employeeId,
            // mobile_no: contactInfo,
        };
  
        const updateResponse = await fetch('https://api.rightships.com/employee/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePayload),
        });
  
        const updateData = await updateResponse.json();
        if (updateData.code !== 200) { // Adjusted to check for code 200
            throw new Error(updateData.message || 'Failed to update employee');
        }
  
        console.log('Employee updated successfully:', updateData);
  
        closeModal(); // Close the modal after successful update
        navigate('/profile'); // Redirect to the profile page after update
  
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
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
