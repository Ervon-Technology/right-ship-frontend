import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import Company from './company/index';
import Empteam from './company/Manageemp';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="otpverify" element={<OtpVerify />} />
          <Route path="/cmp" element={<Company/>}/>
          <Route path="/emp" element={<Empteam/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;