import React from 'react';
import Sidebar from './company/Sidebar';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeerDashboard from './company/EmployeerDashboard';
import EmployerDetails from './company/Preview&EditJobDetail/Preview&EditJob';
import Empteam from './company/Manageemp';
import AddJobBasics from './company/AddJobBasics';
import AddPayAndBenefits from './company/AddPayAndBenefits';
import ManageUsers from './company/ManageUsers';
import Footer from './company/Footer'
import Login from './company/Login';
import OtpVerify from './company/Otpverify'
import Header from './company/Header';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employeer-dashboard" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <EmployeerDashboard />
                <Footer />
              </div>
            </div>
          </div>} /> 
        <Route path="/preview-edit-job-detail" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <EmployerDetails />
                <Footer />
              </div>
            </div>
          </div>} /> 
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
        <Route path="/add-job-basics" element={
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
        <Route path="/add-pay-and-benefits" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <AddPayAndBenefits />
                <Footer />
              </div>
            </div>
          </div>} /> 
        <Route path="/manage-users" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <ManageUsers />
                <Footer />
              </div>
            </div>
          </div>} /> 

        <Route path="/" element={<Login/>} />
        <Route path="/otpverify" element={<OtpVerify/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
