import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../images/logo.png';

const MobileNumberForm = ({ onOtpRequested }) => {
    const [contactInfo, setContactInfo] = useState('');
    const [otpStatus, setOtpStatus] = useState('idle');
    const [otpError, setOtpError] = useState('');

    const handleRequestOtp = async () => {
        setOtpStatus('loading');
        try {
            const isEmail = contactInfo.includes('@');
            const payload = isEmail ? { email: contactInfo } : { mobile_no: contactInfo };

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/otp/send_otp`, payload);
            console.log(response.data);

            if (response.data.code === 200) {
                onOtpRequested(contactInfo);
                setOtpStatus('success');
                toast.success('OTP sent successfully!');
            } else {
                setOtpStatus('failed');
                setOtpError('Failed to send OTP. Please try again.');
                toast.error('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setOtpStatus('failed');
            setOtpError('Error requesting OTP. Please try again.');
            toast.error('Error requesting OTP. Please try again.');
        }
    };

    return (
        <section className="relative flex flex-col items-center py-20 h-screen bg-gray-100 bgImage">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white opacity-80 z-10"></div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center">
                <ToastContainer />
                <div className="mb-4">
                    <img src={logo} alt="Logo" className="h-24 w-20" />
                </div>
                <div className="bg-white p-10 mt-3 rounded-lg shadow-lg border w-full max-w-md">
                    <h2 className="text-center text-2xl font-semibold mb-6">Log in to Rightship</h2>
                    <input
                        type="text"
                        value={contactInfo}
                        placeholder="Enter your phone number or email"
                        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-customBlue"
                        onChange={(e) => setContactInfo(e.target.value)}
                    />
                    <button
                        onClick={handleRequestOtp}
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
                </div>
            </div>
        </section>
    );
};

export default MobileNumberForm;
