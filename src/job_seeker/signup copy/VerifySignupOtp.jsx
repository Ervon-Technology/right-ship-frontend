import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifySignupOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);
  const contactInfo = useSelector((state) => state.contact.contactInfo);

  useEffect(() => {
    if (!contactInfo) {
      toast.error("No contact information found. Please start the signup process again.");
      navigate('/register');
    }
  }, [contactInfo, navigate]);

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSendOtp = () => {
    setTimer(30);
    setCanResend(false);
    navigate('/register');
  };

  const handleVerifyOtp = async () => {
    try {
      const isEmail = contactInfo.includes('@');
      const payload = isEmail
        ? { email: contactInfo, otp }
        : { mobile_no: contactInfo, otp };

      const response = await fetch(`${process.env.REACT_APP_API_URL}/otp/verify_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }

      if (data.code === 200) {
        const employeeId = data.employee_id;

        const registrationResponse = await fetch(`${process.env.REACT_APP_API_URL}/employee/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(isEmail ? { email: contactInfo } : { mobile_no: contactInfo }),
        });

        const registrationData = await registrationResponse.json();

        if (!registrationResponse.ok) {
          throw new Error(registrationData.message || 'Failed to register employee');
        }

        if (registrationData.code === 200) {
          toast.success('Contact verified and employee registered successfully!');
          navigate('/employee-registration', {
            replace: true, // Use replace to prevent navigating back to this page
            state: { employeeId: registrationData.employee._id, contactInfo },
          });
        } else {
          throw new Error(registrationData.msg || 'Failed to register employee');
        }
      } else {
        throw new Error(data.msg || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <section className="flex flex-col items-center py-20 h-screen bg-gray-100">
      <ToastContainer />
      <div className="mb-4">
        <img src={logo} alt="Logo" className="h-24 w-20 mx-auto" />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Verify OTP</h2>
        <p className="text-center text-sm text-gray-600 mb-6">OTP sent to: {contactInfo}</p>
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyOtp}
          className={`w-full py-4 rounded-md text-white font-medium ${otpStatus === 'loading' ? 'bg-customBlue' : 'bg-customBlue hover:bg-customBlue2'} transition duration-300`}
          disabled={otpStatus === 'loading'}
        >
          {otpStatus === 'loading' ? 'Verifying...' : 'Verify OTP'}
        </button>
        {otpStatus === 'failed' && <p className="text-red-600 mt-4 text-center">{otpError}</p>}
        <p className="text-center mt-4 text-sm text-gray-600">
          {canResend ? (
            <button
              onClick={handleSendOtp}
              className="text-blue-600 underline hover:text-customBlue2 text-md"
            >
              Resend OTP
            </button>
          ) : (
            `Resend OTP in: ${formatTime(timer)}`
          )}
        </p>
        <Link className="text-blue-600 block text-center text-md underline mt-6 hover:text-customBlue2" to="/register">
          Change Contact Info
        </Link>
      </div>
    </section>
  );
};

export default VerifySignupOtp;
