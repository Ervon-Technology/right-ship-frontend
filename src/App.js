import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './company/Home';
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import Usermanage from './company/Usermanage';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="otpverify" element={<OtpVerify />} />
          <Route path="usermanage" element={<Usermanage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;