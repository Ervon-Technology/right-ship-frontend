import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import Company from './company/index';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="otpverify" element={<OtpVerify />} />
          <Route path="/cmp" element={<Company/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;