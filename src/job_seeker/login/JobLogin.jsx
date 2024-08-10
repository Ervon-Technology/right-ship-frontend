import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../features/otpSlice';
import { setContactInfo } from '../../features/contactSlice';
import logo from "../../images/logo.png";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);

  const handleSendOtp = () => {
    dispatch(sendOtp(phoneNumber));
    dispatch(setContactInfo(phoneNumber));
    navigate('/login-verify');
  };

  return (
    <section className="flex flex-col items-center mt-20 h-screen">
      <div className="mb-4">
        <img src={logo} alt="Logo" height={70} width={70} />
      </div>
      <div className="bg-white p-11 mt-3 rounded-lg shadow-2xl border w-full max-w-md">
        <h2 className="text-center text-xl font-bold mb-8">Login to Rightship</h2>
        <input
          type="text"
          placeholder="Enter the phone number"
          className="w-full px-5 py-5 mb-4 border border-gray-300 rounded-lg"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          onClick={handleSendOtp}
          className="w-full bg-indigo-900 text-white px-5 py-5 rounded-lg text-lg font-light"
          disabled={otpStatus === 'loading'}
        >
          {otpStatus === 'loading' ? 'Sending...' : 'Send OTP'}
        </button>
        {otpStatus === 'failed' && <p className="text-red-600 mt-4">{otpError}</p>}
      </div>
    </section>
  );
};

export default Login;
