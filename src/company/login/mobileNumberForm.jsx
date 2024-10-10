import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../../images/logo.png';


const MobileNumberForm = ({ onOtpRequested }) => {
    
    const [mobileNumber, setMobileNumber] = useState('');
    const [otpStatus, setOtpStatus] = useState('idle');
    const [otpError, setOtpError] = useState('');

    const verifyUserExists = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/details`, {
                mobile_no: mobileNumber,
                user_type: 'company' // Assuming 'employee' is the user type; modify as needed
            });

            return response.data; // Assuming 'exists' is a field that returns true if the user exists
        } catch (error) {
            console.error('Error verifying user existence:', error);
            return false;
        }
    };

    const handleRequestOtp = async () => {
        
        setOtpStatus('loading');

        try {

            const userExists = await verifyUserExists();
            
            if (!userExists) {
                setOtpStatus('failed');
                setOtpError('Company User does not exist. Please register.');
                toast.error('Company User does not exist. Please register.');
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/otp/send_otp`, { mobile_no: mobileNumber });
            console.log(response.data);
            if (response.data.code === 200) {
                onOtpRequested(mobileNumber);
                setOtpStatus('success');
            } else {
                setOtpStatus('failed');
                setOtpError('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setOtpStatus('failed');
            setOtpError('Error requesting OTP. Please try again.');
        }
    };

    return (
        <section className="flex flex-col items-center py-20 h-screen bg-gray-100">
            <ToastContainer />
            <div className="mb-4">
                <img src={logo} alt="Logo" className="h-24 w-20" />
            </div>
            <div className="bg-white p-10 mt-3 rounded-lg shadow-lg border w-full max-w-md">
                <h2 className="text-center text-2xl font-semibold mb-6">Log in as Company</h2>
                <input
                    type="text"
                    value={mobileNumber}
                    placeholder="Enter the phone number"
                    className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-customBlue"
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
                <button
                    onClick={handleRequestOtp}
                    className={`w-full py-4 rounded-md text-white font-medium ${otpStatus === 'loading' ? 'bg-customBlue' : 'bg-customBlue hover:bg-customBlue2'} transition duration-300`}
                    disabled={otpStatus === 'loading'}
                >
                    {otpStatus === 'loading' ? 'Sending...' : 'Send OTP'}
                </button>
                {otpStatus === 'failed' && <p className="text-red-600 mt-4 text-center">{otpError}</p>}
                
                <div className='text-center'>- or -</div>
                
                {/* Register Link as a button */}
                <Link
                    target="_blank"
                    to="/company/register"
                    className="w-full block text-center mt-4 py-4 rounded-md text-customBlue font-medium border border-customBlue transition duration-300 hover:bg-customBlue hover:text-white"
                >
                    Register
                </Link>
            </div>
        </section>
    );
};

export default MobileNumberForm;
