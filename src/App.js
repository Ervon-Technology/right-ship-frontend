// import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import Sidebar from './company/Sidebar';
// import Header from './company/Header';
// import Footer from './company/Footer';
// import EmployeerDashboard from './company/EmployeerDashboard';
// import EmployerDetails from './company/Preview&EditJobDetail/EmployerDetails';
// import Empteam from './company/ManageUsers';
// import AddJobBasics from './company/AddJobBasics';
// import AddPayAndBenefits from './company/AddPayAndBenefits';
// import EditJobs from './company/EditJobs/EditJobs';
// import ManageUsers from './company/ManageUsers';
// import Candidates from './company/Candidates';
// import CandidatesDetails from './company/CandidatesDetails';
// import JobDescription from './company/JobDescription';
// import Login from './company/Login';
// import OtpVerify from './company/Otpverify';
// import RegistrationForm from './company/RegistrationForm';
// import Header3 from './job_seeker/Header3';
// import Header2 from './job_seeker/Header2';
// import Home from './job_seeker/home';
// // import CandidateLogin from './job_seeker/CandidateLogin';
// // import CandidateOtpverify from './job_seeker/CandidateOtpverify';
// import JobDashboard from './job_seeker/Job_Dashboard';
// import About from './job_seeker/About';
// import Details from './job_seeker/Details';
// import Experience from './job_seeker/Experience';
// import Resume from './job_seeker/Resume';
// import Profile from './job_seeker/Profile';
// import Congratulations from './job_seeker/Congratulations';
// import CandidateProfile from './job_seeker/CandidateProfile/CandidateProfile';
// import MyJobs from './job_seeker/MyJobs';
// import Settings from './job_seeker/Settings';
// import Mailsendpopup from './company/helper/mailsendpopup';
// import Supports from './company/Supports';
// import JobsPage from './company/JobsPage';
// import Navbar from './job_seeker/Navbar/Navbar';

import Navbar from "./job_seeker/Navbar/Navbar";
import Signup from "./job_seeker/signup/Signup";
import SignupWithEmail from './job_seeker/signup/SignupWithEmail';
import VerifyWithPhone from './job_seeker/signup/VerifyWithPhone';
import Footer from './job_seeker/footer/Footer';
import Login from './job_seeker/login/Login';
import VerifyLogin from './job_seeker/login/Verify-login';
import { ToastContainer } from 'react-toastify';
import About from './job_seeker/Resgistraion/About';
import Experience from './job_seeker/Resgistraion/ExpInfo';
import Resume from './job_seeker/Resgistraion/Resume';
import  Home  from './job_seeker/landingpage/Home';
import Setting from './job_seeker/setting/Setting';
import ChangeMail from './job_seeker/setting/ChangeMail';
import ChangeNumber from './job_seeker/setting/ChangeNumber';
import VerifyMail from './job_seeker/setting/VerifyMail';
import VerifyNumber from './job_seeker/setting/VerifyNumber';
import Main from './job_seeker/Profile/Main';
import MyJobs from './job_seeker/jobs/InitialJob';
import JobDashboard from './job_seeker/jobs/InitialJobs2';

const App = () => {
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     setLoggedIn(true);
  //   }
  // }, []);

  // const DefaultLayout = ({ children }) => (
  //   <div className="flex flex-col min-h-screen">
  //     <div className="flex flex-1">
  //       <Sidebar />
  //       <div className="flex flex-col flex-1">
  //         <Header />
  //         <main className="flex-grow">
  //           {children}
  //         </main>
  //         <Footer />
  //       </div>
  //     </div>
  //   </div>
  // );

  // const DefaultLayout2 = ({ children }) => (
  //   <div className="flex flex-col min-h-screen">
  //     <div className="flex flex-col flex-1">
  //       <Header2 />
  //       <main className="flex-grow">
  //         {children}
  //       </main>
  //     </div>
  //   </div>
  // );

  // const DefaultLayout3 = ({ children }) => (
  //   <div className="flex flex-col min-h-screen">
  //     <div className="flex flex-col flex-1">
  //       <Header3 />
  //       <main className="flex-grow">
  //         {children}
  //       </main>
  //     </div>
  //   </div>
  // );

  return (
    <>
    <Navbar/>    
    <BrowserRouter>    
      <Routes>
        {/* <Route
          path="/"
          element={
            loggedIn ? (
              <DefaultLayout>
                <EmployeerDashboard />
              </DefaultLayout>
            ) : (
              <RegistrationForm />
            )
          }
        /> 
        {/* <Route path='mail' element={<Mailsendpopup />} />
        <Route path='/settings' element={<DefaultLayout3><Settings /></DefaultLayout3>} />
        <Route path='/my_jobs' element={<DefaultLayout3><MyJobs /></DefaultLayout3>} />
        <Route path='/candidate_profile' element={<DefaultLayout3><CandidateProfile /></DefaultLayout3>} />
        <Route path='/congratulations' element={<Congratulations />} />
        <Route path='/profile' element={<DefaultLayout2><Profile /></DefaultLayout2>} />
        <Route path='/resume' element={<DefaultLayout2><Resume /></DefaultLayout2>} />
        <Route path='/experience' element={<DefaultLayout2><Experience /></DefaultLayout2>} />
        <Route path='/details' element={<DefaultLayout2><Details /></DefaultLayout2>} />
        <Route path='/about' element={<DefaultLayout2><About /></DefaultLayout2>} />
        <Route path='/job_dashboard' element={<DefaultLayout3><JobDashboard /></DefaultLayout3>} />
        <Route path='/candidate_Otpverify' element={<CandidateOtpverify />} />
        <Route path='/candidate_login' element={<CandidateLogin />} />
        <Route path='/jobs_home' element={<Home />} />
        <Route path="/employeer-dashboard" element={<DefaultLayout><EmployeerDashboard /></DefaultLayout>} />
        <Route path="/preview-edit-job-detail" element={<DefaultLayout><EmployerDetails /></DefaultLayout>} />
        <Route path="/emp" element={<DefaultLayout><Empteam /></DefaultLayout>} />
        <Route path="/add-job-basics" element={<DefaultLayout><AddJobBasics /></DefaultLayout>} />
        <Route path="/add-pay-and-benefits" element={<DefaultLayout><AddPayAndBenefits /></DefaultLayout>} />
        <Route path="/edit-jobs" element={<DefaultLayout><EditJobs /></DefaultLayout>} />
        <Route path="/candidates" element={<DefaultLayout><Candidates /></DefaultLayout>} />
        <Route path="/jobs" element={<DefaultLayout><JobsPage/></DefaultLayout>} />
        <Route path="/candidate-details" element={<DefaultLayout><CandidatesDetails /></DefaultLayout>} />
        <Route path="/edit-job-details" element={<DefaultLayout><EmployerDetails /></DefaultLayout>} />
        <Route path="/manage-users" element={<DefaultLayout><ManageUsers /></DefaultLayout>} />
        <Route path="/support" element={<DefaultLayout><Supports /></DefaultLayout>} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/Jobsdesc" element={<DefaultLayout><JobDescription /></DefaultLayout>} /> */}
        <Route path="/signup-number" element={<Signup/>} />
        <Route path="/signup-email" element={<SignupWithEmail/>}/>
        <Route path="/verify-phone" element={<VerifyWithPhone/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/login-verify" element={<VerifyLogin/>}/>
        <Route path="/personalDetails" element={<About/>}/>
        <Route path="/experinceDetails" element={<Experience/>}/>
        <Route path="/resume&profile" element={<Resume/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/setting" element={<Setting/>}/>
        <Route path="/changemail" element={<ChangeMail/>}/>
        <Route path="/changenumber" element={<ChangeNumber/>}/>
        <Route path="/verifymail" element={<VerifyMail/>}/>
        <Route path="/verifynumber" element={<VerifyNumber/>}/>
        <Route path="/profile" element={<Main/>}/>
        <Route path="/myjobs" element={<MyJobs/>}/>
        <Route path="/jobdashboard" element={<JobDashboard/>}/>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
    <Footer/>
    </>
  );
};

export default App;
