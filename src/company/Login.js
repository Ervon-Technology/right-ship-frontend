import React from 'react'

const Login = () => {


const handleotp = ()=>{
    window.location = '/otpverify'
}
    return (
        <div>
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
                        />
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleotp}>
                        Send OTP
                    </button>
                </div>
            </div>

        </div>
    )
}
export default Login;
