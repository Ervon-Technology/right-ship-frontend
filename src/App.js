import React from 'react';
import Sidebar from './company/Sidebar';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Empteam from './company/Manageemp';
import Footer from './company/Footer'
import Login from './company/Login';
import OtpVerify from './company/Otpverify'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route with Sidebar */}
        <Route path="/emp" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
              <Footer />
                <Empteam />
                <Footer />
              </div>
            </div>
          </div>
        } />
        {/* Route without Sidebar (Login Page) */}
        <Route path="/" element={<Login/>} />
        <Route path="/otpverify" element={<OtpVerify/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
