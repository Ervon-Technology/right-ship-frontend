// import React from 'react'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../../features/otpSlice';
import logo from "../../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';


const SignupWithEmail = () => {
    let navigate=useNavigate()
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);
  console.log(otpStatus)

  const handleSendOtp = () => {
    dispatch(sendOtp(email));
    navigate('/verify-phone')
  };

  return (
    <section className="flex flex-col items-center py-10 signup">
      <div className="text-2xl font-bold mb-4 "><img src={logo} alt="" height={70} width={70}/></div>
      <div className="bg-white p-6 mt-3 rounded-lg shadow-2xl w-100 max-w-md">
        <h2 className="text-center text-xl font-bold mb-4">Signup with Email</h2>
        <input
          type="text"
          placeholder="Enter the your email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <Link to="/signup-number" className="text-blue-600">Signup with Phone Number</Link>
        </p>
      </div>
    </section>
  )
}

export default SignupWithEmail
