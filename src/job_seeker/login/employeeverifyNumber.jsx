import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../images/logo.png';
import { login } from '../../features/authSlice';

const OtpVerificationForm = ({ contactInfo }) => {
    const [otp, setOtp] = useState('');
    const [otpStatus, setOtpStatus] = useState('idle');
    const [otpError, setOtpError] = useState('');
    const [timer, setTimer] = useState(60); 
    const [canResend, setCanResend] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const authState = useSelector(state => state.auth);
    
    const handleVerifyOtp = async () => {
        setOtpStatus('loading');
        
        try {
            const isEmail = contactInfo.includes('@');
            const payload = isEmail ? { email: contactInfo, otp } : { mobile_no: contactInfo, otp };

            const response = await axios.post('https://api.rightships.com/otp/verify_otp', payload);
            console.log(response.data);

            if (response.data.code === 200) {
                setOtpStatus('success');
                await dispatch(login(payload));
                navigate('/profile', { replace: true });
            } else {
                setOtpStatus('failed');
                setOtpError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setOtpStatus('failed');
            setOtpError('Error verifying OTP. Please try again.');
        }
    };

    const handleSendOtp = async () => {
        setOtpStatus('loading');
        try {
            const isEmail = contactInfo.includes('@');
            const payload = isEmail ? { email: contactInfo } : { mobile_no: contactInfo };

            const response = await axios.post('https://api.rightships.com/otp/send_otp', payload);
            if (response.data.code === 200) {
                setOtpStatus('success');
                setCanResend(false);
                setTimer(60); 
            } else {
                setOtpStatus('failed');
                setOtpError('Failed to resend OTP. Please try again.');
            }
        } catch (error) {
            setOtpStatus('failed');
            setOtpError('Error resending OTP. Please try again.');
        }
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prevTimer) => prevTimer - 1), 1000);
        } else {
            clearInterval(interval);
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <section
  className="relative flex flex-col items-center py-20 h-screen bg-gray-100 bgImage"
  
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-white opacity-80 z-10"></div>

  {/* Content */}
  <div className="relative z-20 flex flex-col items-center">
    <div className="mb-4">
      <img src={logo} alt="Logo" className="h-24 w-20" />
    </div>
    <div className="bg-white p-10 mt-3 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-center text-2xl font-semibold mb-4">Verify OTP</h2>
      <p className="text-center text-sm mb-4">OTP sent to: {contactInfo}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-customBlue"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        onClick={handleVerifyOtp}
        className={`w-full py-4 rounded-md text-white font-medium ${
          otpStatus === 'loading' || authState.loading
            ? 'bg-customBlue'
            : 'bg-customBlue hover:bg-customBlue2'
        } transition duration-300`}
        disabled={otpStatus === 'loading' || authState.loading}
      >
        {otpStatus === 'loading' || authState.loading ? 'Verifying...' : 'Verify OTP'}
      </button>
      {(otpStatus === 'failed' || authState.error) && (
        <p className="text-red-600 mt-4">{otpError || authState.error}</p>
      )}
      <p className="text-center mt-4">
        {canResend ? (
          <button
            onClick={handleSendOtp}
            className="text-blue-700 underline text-sm"
          >
            Resend OTP
          </button>
        ) : (
          `Resend OTP in: ${formatTime(timer)}`
        )}
      </p>
      <Link
        className="text-blue-700 block text-center text-sm underline mt-4"
        to="/login"
      >
        Change Contact Info
      </Link>
    </div>
  </div>
</section>
    );
};

export default OtpVerificationForm;
