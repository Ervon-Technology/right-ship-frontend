import React from 'react';
import Sidebar from './company/Sidebar';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeerDashboard from './company/EmployeerDashboard';
import EmployerDetails from './company/Preview&EditJobDetail/EmployerDetails';
import Empteam from './company/Manageemp';
import AddJobBasics from './company/AddJobBasics';
import AddPayAndBenefits from './company/AddPayAndBenefits';
import EditJobs from './company/EditJobs/EditJobs';
import ManageUsers from './company/ManageUsers';
import Candidates from './company/Candidates';
import CandidatesDetails from './company/CandidatesDetails';
import JobDescription from './company/JobDescription';
import Footer from './company/Footer'
import Login from './company/Login';
import OtpVerify from './company/Otpverify'
import Header from './company/Header';
import RegistrationForm from './company/RegistrationForm';
// import Nav from './jobseekres/Nav';
import Home from './jobseekres/Home';
import Help from './admin/Help';
import SubscriptionPlans from './admin/Adminrole';
import Createplan from './admin/Createplan';
import SubscriptionDashboard from './admin/SubscriptionDashboard';
import CandidatePage from './admin/Candidate';
import CompanyList from './admin/CompanyList';
import Planlist from './admin/Planlist';
import Dashboard from './admin/Dashboard';




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
        <Route path="/edit-jobs" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <EditJobs />
                <Footer />
              </div>
            </div>
          </div>} /> 
        <Route path="/candidates" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <Candidates />
                <Footer />
              </div>
            </div>
          </div>} /> 
        <Route path="/jobs" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <JobDescription />
                <Footer />
              </div>
            </div>
          </div>} /> 
        <Route path="/candidate-details" element={
          <div className='flex min-h-screen'>
            <Sidebar />
            <div className="flex flex-col flex-1">
              <div className='flex-grow'>
                <Header />
                <CandidatesDetails />
                <Footer />
              </div>
            </div>
          </div>} /> 
        <Route path="/edit-job-details" element={
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
          <Route path="/" element={<RegistrationForm/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/otpverify" element={<OtpVerify/>} />
        <Route path="/jobnav" element={<Home/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/adminrole" element={<SubscriptionPlans/>} />
        <Route path="/createplan" element={<Createplan/>} />
        <Route path="/subscriptiondashboard" element={<SubscriptionDashboard/>} />
        <Route path="/candidatelist" element={<CandidatePage/>} />
        <Route path="/companylist" element={<CompanyList/>} />
        <Route path="/planlist" element={<Planlist/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;



