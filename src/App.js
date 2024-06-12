import React from 'react';
import Sidebar from './company/Sidebar';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Empteam from './company/Manageemp';
import Login from './company/Login';
import OtpVerify from './company/Otpverify'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route with Sidebar */}
        <Route path="/emp" element={
          <div className='flex'>
            <Sidebar />
            <div className="content">
              <Empteam />
            </div>
          </div>
        } />
        <Route path="/users" element={
          <div className='flex'>
            <Sidebar />
            <div className="content">
              <LoadingScreen />
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
