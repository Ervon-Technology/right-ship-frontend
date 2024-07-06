import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setempdetails } from '../slice/Empslice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './CandidateLoader';

const CandidateOtpVerify = () => {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [resendTimer, setResendTimer] = useState(120);
    const [error, setError] = useState("");
    const timerInterval = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const startTimer = () => {
            timerInterval.current = setInterval(() => {
                setResendTimer(prevTimer => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(timerInterval.current);
                        return 0;
                    }
                });
            }, 1000);
        };

        startTimer();
        return () => clearInterval(timerInterval.current);
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                document.getElementById(`otp-input-${index + 1}`)?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`)?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join("");
        const email = localStorage.getItem("email");

        if (otpString.length === 6 && email) {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/company/loginotp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, otp: otpString })
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("OTP verified successfully:", data);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('cmpid', data.company.id);
                    dispatch(setempdetails(data.company));
                    toast.success("OTP verify success");
                    setTimeout(() => {
                        navigate('/jobdashboard'); // Redirect to job dashboard
                    }, 1000);
                } else {
                    setError("Failed to verify OTP. Please try again.");
                }
            } catch (error) {
                console.error("Error verifying OTP:", error);
                setError("An error occurred. Please try again.");
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            setError("Please enter the complete 6-digit OTP.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <ToastContainer />
            {loading && <Loader />}
            <div className="p-5 px-10 shadow-md bg-white rounded-md">
                <h1 className="text-2xl font-semibold mb-4 text-black">Verify with OTP</h1>
                <p className="text-gray-500">OTP sent to {localStorage.getItem("email")}</p>
                <form onSubmit={handleSubmit} className="space-y-3 flex flex-col items-center">
                    <div className="flex space-x-2 mt-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                maxLength={1}
                                className="w-10 p-2 border border-gray-300 rounded text-center text-black"
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-customBlue hover:bg-customBlue2 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75"
                    >
                        Verify OTP
                    </button>
                </form>
                <p className="text-gray-500">
                    Resend OTP in:{" "}
                    <span className="text-black font-bold">
                        {`${String(Math.floor(resendTimer / 60)).padStart(2, '0')}:${String(resendTimer % 60).padStart(2, '0')}`}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default CandidateOtpVerify;
