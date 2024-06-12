import React, { useEffect, useState, useRef } from "react";

const OtpVerify = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize an array of 6 empty strings
  const [resendTimer, setResendTimer] = useState(120); // Initial timer value (in seconds)
  const timerInterval = useRef(null); // Ref to store the interval reference

  useEffect(() => {
    // Function to start the countdown timer
    const startTimer = () => {
      console.log("Timer started"); // Log to check if the timer starts
      timerInterval.current = setInterval(() => {
        setResendTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(timerInterval.current); // Clear interval when timer reaches 0
            return 0;
          }
        });
      }, 1000);
    };

    // Start the countdown timer when the component mounts
    startTimer();

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(timerInterval.current);
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  const handleChange = (element, index) => {
    const value = element.target.value;
    if (/^[0-9]?$/.test(value)) {
      // Allow only digits
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if a digit was entered
      if (value && index < 5) {
        const nextIndex = index + 1;
        document.getElementById(`otp-input-${nextIndex}`)?.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    // Move to the previous input if backspace is pressed and the current input is empty
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      event.preventDefault();
      const prevIndex = index - 1;
      document.getElementById(`otp-input-${prevIndex}`)?.focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const otpString = otp.join("");
    // Simulate verification of OTP (replace with actual logic)
    console.log("Verifying OTP:", otpString);
  };

  // Convert timer value to minutes and seconds
  const minutes = Math.floor(resendTimer / 60);
  const seconds = resendTimer % 60;
const handlecmp = ()=>{
  window.location = '/emp'
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 shadow-md bg-white rounded-md">
        <h1 className="text-2xl font-semibold mb-4 text-black">Verify with OTP</h1>
        <p className="text-gray-500">OTP sent to +91 8876544569</p>
        <form onSubmit={handleSubmit} className="space-y-3 flex flex-col items-center">
          <div className="flex space-x-2 mt-2">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-10 p-2 border border-gray-300 rounded text-center text-black"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            onClick={handlecmp}
          >
            Verify OTP
          </button>
        </form>
        <p className="text-gray-500">
          Resend OTP in:{" "}
          <span className="text-black font-bold">
            {`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
