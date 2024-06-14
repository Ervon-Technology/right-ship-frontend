import React from 'react';
import Sidebar from './company/Sidebar';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Empteam from './company/Manageemp';
import AddJobBasics from './company/AddJobBasics';
import Footer from './company/Footer'
import Login from './company/Login';
import OtpVerify from './company/Otpverify'
import Header from './company/Header';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/emp" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <Empteam />
                <Footer />
              </div>
            </div>
          </div>} /> 
        <Route path="/create-new" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <AddJobBasics />
                <Footer />
              </div>
            </div>
          </div>} /> 

          
        <Route path="/create-new" element={<AddJobBasics />} />
        <Route path="/" element={<Login/>} />
        <Route path="/otpverify" element={<OtpVerify/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
