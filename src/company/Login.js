import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.rightships.com/user/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile_no: phone,
          user_type: 'company'
        })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (data.code === 200) {
          handleOtp();
        } else if (data.code === 404) {
          toast.error('User Not Found');
        } else if (data.code === 500) {
          toast.error('Please verify your email first.');
        }
      }else if(!response.ok){
        if (data.code === 404) {
            toast.error('User Not Found');
        } else {
            toast.error('Failed to check user details. Please try again.');
          }
      }
       else {
        toast.error('Failed to check user details. Please try again.');
      }
    } catch (error) {
      console.error('Error while checking user details:', error.message);
      toast.error('Failed to check user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.rightships.com/otp/send_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile_no: phone
        })
      });
      const data = await response.json();
      console.log('otpdata', data);
      if (response.ok) {
        toast.success(`OTP sent to ${phone}`);
        localStorage.setItem('phone', phone);
        setTimeout(() => {
          window.location = '/otpverify';
        }, 1000);
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error while sending OTP:', error.message);
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      {loading && <Loader />}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Enter Phone Number</h2>
          <p className="text-gray-600 mb-4">Enter your registered phone number here</p>
          <div className="flex mb-4">
            <select
              className="inline-flex items-center px-1 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="91">🇮🇳 +91</option>
              <option value="1">🇺🇸 +1</option>
              <option value="44">🇬🇧 +44</option>
              {/* Add more options for other country codes */}
            </select>
            <input
              type="text"
              className="flex-1 px-2 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0000000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogin}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
