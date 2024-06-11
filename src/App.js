import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './company/Home';
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import Navbar from './company/Navbar';
import TEAM from './company/Team';
import Footer from './company/Footer'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="otpverify" element={<OtpVerify />} />
          <Route path="navbar" element={<Navbar/>} />
          <Route path="usermanagement" element={<TEAM/>}/>
          <Route path="footer" element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;