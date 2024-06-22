import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [phone, setPhone] = useState('');

    const handleotp = async () => { 
        try {
            const response = await fetch('http://localhost:3000/company/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phone
                })
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(`OTP sent to ${data.email}`);
                localStorage.setItem('email', data.email);
                setTimeout(() => {
                    window.location = '/otpverify';
                }, 3000);
            } else {
                // Handle non-successful response
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error while sending OTP:', error.message);
            toast.error('Failed to send OTP. Please try again.');
        }
    }

    return (
        <div>
            <ToastContainer />
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
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleotp}>
                        Send OTP
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
