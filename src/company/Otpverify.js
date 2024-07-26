import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
const OtpVerify = () => {
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
    const phone = localStorage.getItem("phone");

    if (otpString.length === 6 && phone) {
      try {
        setLoading(true);
        const response = await fetch("https://api.rightships.com/otp/verify_otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ mobile_no:phone, otp: otpString })
        });
        const data = await response.json();
          if(response.ok){
            if (data.code === 200) {
              console.log("OTP verified successfully:", data);
              const response = await fetch("https://api.rightships.com/company/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ "mobile_no": phone})
              });
              const result = await response.json();
              if(response.ok){
                if(result.code===200){
                    localStorage.setItem('company_id',result.data.company_id)
                    localStorage.setItem('user_id',result.data._id)
                    toast.success("OTP verify success");
                    setTimeout(() => {
                      navigate('/employeer-dashboard');
                    }, 1000);
                }else{
                  toast.error("Some internal problem");
                }
              }else{
                toast.error("Some internal problem");
              }
            } else if(data.code === 400) {
              toast.error("Invalid OTP");
            }
            else if(data.code === 201) {
              toast.error(data.message);
            }
          }
          else{
            toast.error("An error occurred. Please try again.");
            setError("An error occurred. Please try again.");
          }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setError("An error occurred. Please try again.");
      }finally {
        setLoading(false); 
      }
    } else {
      setError("Please enter the complete 6-digit OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <ToastContainer />
        {loading &&<Loader/>}
      <div className="p-4 shadow-md bg-white rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">Verify with OTP</h1>
        <p className="text-gray-500">OTP sent to {localStorage.getItem("phone")} </p>
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
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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

export default OtpVerify;
