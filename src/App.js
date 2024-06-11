import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './company/Home';
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
<<<<<<< HEAD
import Usermanage from './company/Usermanage';
=======
import Navbar from './company/Navbar';
>>>>>>> 48ab1cb36dadcb368849a7e0b1daab88979203f9
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="otpverify" element={<OtpVerify />} />
<<<<<<< HEAD
          <Route path="usermanage" element={<Usermanage/>} />
=======
          <Route path="navbar" element={<Navbar/>} />
>>>>>>> 48ab1cb36dadcb368849a7e0b1daab88979203f9
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;