import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../features/otpSlice';
import { setContactInfo } from '../../features/contactSlice';
import logo from "../../images/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/bgImage.jpg'

const EmployeeSignup = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);

  // Validate the phone number format
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/; // Assuming 10-digit phone numbers
    return phoneRegex.test(number);
  };

  const handleSendOtp = () => {
    if (!phoneNumber.trim()) {
      toast.error("Phone number field cannot be empty!");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number!");
      return;
    }

    dispatch(sendOtp(phoneNumber));
    dispatch(setContactInfo(phoneNumber));
    navigate('/verify-signup-otp'); // Navigate to the OTP verification page
  };

  return (
    <section
    className="relative flex flex-col items-center py-8 h-screen bg-gray-100 bgImage"
   
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-white opacity-80 z-10"></div>
    
    {/* Content */}
    <div className="relative z-20 flex flex-col items-center">
      <ToastContainer />
      <div className="mb-4 z-50">
        <img src={logo} alt="Logo" className="h-24 w-20" />
      </div>
  
      <div className="bg-white p-10 mt-3 rounded-lg shadow-lg border w-full max-w-md">
      <p className="text-sm mb-3 font-bold text-gray-600">
         Find your dream job with Right Ships
        </p>
        <h2 className="text-2xl font-semibold mb-6">
          Register using Number
        </h2>
        
        <input
          type="tel"
          placeholder="Enter the phone number"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-customBlue"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          onClick={handleSendOtp}
          className={`w-full py-4 rounded-md text-white font-medium ${
            otpStatus === 'loading'
              ? 'bg-customBlue'
              : 'bg-customBlue hover:bg-customBlue2'
          } transition duration-300`}
          disabled={otpStatus === 'loading'}
        >
          {otpStatus === 'loading' ? 'Sending...' : 'Send OTP'}
        </button>
        {otpStatus === 'failed' && (
          <p className="text-red-600 mt-4 text-center">{otpError}</p>
        )}
        <p className="text-center mt-4">
          <Link
            to="/email-register"
            className="text-blue-600 block text-center text-md underline mt-6 hover:text-customBlue2"
          >
            Register with Email
          </Link>
        </p>
      </div>
    </div>
  </section>
  
  );
};

export default EmployeeSignup;
