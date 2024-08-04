import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const VerifyLogin = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const otpStatus = useSelector((state) => state.otp.status);
  const otpError = useSelector((state) => state.otp.error);
  const contactInfo = useSelector((state) => state.contact.contactInfo);

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
    // Call an API or handle OTP sending if needed
    // If using Redux or another method to send OTP, dispatch it here
    setTimer(30);
    setCanResend(false);
    // Navigate or handle resend logic
    navigate('/signup-number');
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

        // Call login API after successful OTP verification
        const loginResponse = await fetch('https://api.rightships.com/employee/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobile_no: contactInfo }),
        });

        if (!loginResponse.ok) {
          const errorData = await loginResponse.json();
          throw new Error(errorData.message || 'Failed to log in');
        }

        const loginData = await loginResponse.json();
        console.log('Login successful:', loginData);
        navigate('/home'); // Redirect to the desired page after successful login
      } else {
        throw new Error(verifyData.msg || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error (e.g., show a toast notification)
    }
  };

  return (
    <>
      <section className="flex flex-col items-center py-10 signup">
        <div className="text-2xl font-bold mb-4">
          <img src={logo} alt="Logo" height={70} width={70} />
        </div>
        <div className="bg-white p-6 mt-3 rounded-lg shadow-2xl w-100 max-w-md">
          <h2 className="text-center text-xl font-bold mb-4">Verify OTP</h2>
          <p className="text-center text-sm mb-4">OTP sent to: {contactInfo}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-indigo-900 text-white px-4 py-2 rounded"
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
          <Link className="text-blue-600 mx-28 py-5 text-sm underline underline-offset-8" to="/login">Change Number</Link>
        </div>
      </section>
      <footer className="bg-white"></footer>
    </>
  );
};

export default VerifyLogin;
