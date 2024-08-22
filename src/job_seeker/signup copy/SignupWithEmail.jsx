import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../features/otpSlice';
import { setContactInfo } from '../../features/contactSlice';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';

const SignupWithEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = () => {
    if (!email.trim()) {
      toast.error("Email field cannot be empty!");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    dispatch(sendOtp(email));
    dispatch(setContactInfo(email));
    navigate('/verify-signup-otp'); // Navigate to the OTP verification page
  };

  return (
    <section className="flex flex-col items-center py-20 h-screen bg-gray-100">
      <ToastContainer />
      <div className="mb-4">
        <img src={logo} alt="Logo" className="h-24 w-20 mx-auto" />
      </div>
      <div className="bg-white p-8 mt-3 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign Up with Email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleSendOtp}
          className={`w-full py-4 rounded-md text-white font-medium ${otpStatus === 'loading' ? 'bg-customBlue' : 'bg-customBlue hover:bg-customBlue2'} transition duration-300`}
          disabled={otpStatus === 'loading'}
        >
          {otpStatus === 'loading' ? 'Sending...' : 'Send OTP'}
        </button>
        {otpStatus === 'failed' && <p className="text-red-600 mt-4 text-center">{otpError}</p>}
        <p className="text-center mt-6">
          <Link to="/register" className="text-blue-600 block text-center text-md underline mt-6 hover:text-customBlue2">
            Signup with Phone Number
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignupWithEmail;
