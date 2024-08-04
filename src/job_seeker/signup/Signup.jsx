// src/components/Signup.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../features/otpSlice';
import { setContactInfo } from '../../features/contactSlice';
import logo from "../../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
    let navigate=useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);

  const handleSendOtp = () => {
    dispatch(sendOtp(phoneNumber));
    dispatch(setContactInfo(phoneNumber));
    navigate('/verify-phone')

  };

  return (
    <section className="flex flex-col items-center py-10 signup h-screen">
      <div className="text-2xl font-bold mb-4 "><img src={logo} alt="" height={70} width={70}/></div>
      <div className="bg-white p-6 mt-3 rounded-lg shadow-2xl border  w-100 max-w-md">
        <h2 className="text-center text-xl font-bold mb-4">Signup with Phone Number</h2>
        <input
          type="text"
          placeholder="Enter the phone number"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          onClick={handleSendOtp}
          className="w-full bg-indigo-900 text-white px-4 py-2 rounded"
          disabled={otpStatus === 'loading'}
        >
          {otpStatus === 'loading' ? 'Sending...' : 'Send OTP'}
        </button>
        {otpStatus === 'failed' && <p className="text-red-600 mt-4">{otpError}</p>}
        <p className="text-center mt-4">
          <Link to="/signup-email" className="text-blue-600">Signup with Email</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
