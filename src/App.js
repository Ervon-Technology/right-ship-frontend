import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './company/Sidebar';
import Header from './company/Header';
import Footer from './company/Footer';
import EmployeerDashboard from './company/EmployeerDashboard';
import EmployerDetails from './company/Preview&EditJobDetail/EmployerDetails';
import Empteam from './company/ManageUsers';
import AddJobBasics from './company/AddJobBasics';
import AddPayAndBenefits from './company/AddPayAndBenefits';
import EditJobs from './company/EditJobs/EditJobs';
import ManageUsers from './company/ManageUsers';
import Candidates from './company/Candidates';
import CandidatesDetails from './company/CandidatesDetails';
import JobDescription from './company/JobDescription';
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import RegistrationForm from './company/RegistrationForm';
import Mailsendpopup from './company/helper/mailsendpopup';
import Supports from './company/Supports';
import JobsPage from './company/JobsPage';



import Header3 from './job_seeker/Navbar/Header3';
import Main from './job_seeker/Profile/Main';
import MyJobs from './job_seeker/jobs/MyJobs';
import Setting from './job_seeker/setting/Setting';
import Navbar from "./job_seeker/Navbar/Navbar";
import JobFooter from './job_seeker/footer/JobFooter';
import Signup from "./job_seeker/signup/Signup";
import SignupWithEmail from './job_seeker/signup/SignupWithEmail';
import VerifyWithPhone from './job_seeker/signup/VerifyWithPhone';
import JobLogin from './job_seeker/login/JobLogin';
import VerifyLogin from './job_seeker/login/Verify-login';
import { ToastContainer } from 'react-toastify';
import About from './job_seeker/Resgistraion/About';
import Experience from './job_seeker/Resgistraion/ExpInfo';
import Resume from './job_seeker/Resgistraion/Resume';
import  LandingPage  from './job_seeker/landingpage/Home';
import ChangeMail from './job_seeker/setting/ChangeMail';
import ChangeNumber from './job_seeker/setting/ChangeNumber';
import VerifyMail from './job_seeker/setting/VerifyMail';
import VerifyNumber from './job_seeker/setting/VerifyNumber';
import JobDashboard from './job_seeker/jobs/JobDashboard';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const DefaultLayout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );

  const DefaultLayout2 = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-1">
        <Navbar/>
        <main className="flex-grow">
          {children}
        </main>
        <JobFooter/>
      </div>
    </div>
  );

  const DefaultLayout3 = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-1">
        <Header3 />
        <main className="flex-grow">
          {children}
        </main>
        <JobFooter/>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/companyLogin"
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
        <Route path='/' element={<DefaultLayout2><LandingPage/></DefaultLayout2>} />
        <Route path='/settings' element={<DefaultLayout3><Setting /></DefaultLayout3>} />
        <Route path='/singup-number' element={<DefaultLayout2><Signup /></DefaultLayout2>} />
        <Route path='/signup-email' element={<DefaultLayout2><SignupWithEmail/></DefaultLayout2>} />
        <Route path='/verify-phone' element={<DefaultLayout2><VerifyWithPhone/></DefaultLayout2>} />
        <Route path='/login' element={<DefaultLayout2><JobLogin/></DefaultLayout2>} />
        <Route path='/login-verify' element={<DefaultLayout2><VerifyLogin/></DefaultLayout2>} />
        <Route path='/personalDetails' element={<DefaultLayout2><About/></DefaultLayout2>} />
        <Route path='/experinceDetails' element={<DefaultLayout2><Experience/></DefaultLayout2>} />
        <Route path='/resume&profile' element={<DefaultLayout2><Resume/></DefaultLayout2>} />
        <Route path='/profile' element={<DefaultLayout3><Main /></DefaultLayout3>} />
        <Route path='/myjobs' element={<DefaultLayout3><MyJobs /></DefaultLayout3>} />
        <Route path='/jobdashboard' element={<DefaultLayout3><JobDashboard /></DefaultLayout3>} />
        <Route path='/settings' element={<DefaultLayout3><Setting /></DefaultLayout3>} />
        <Route path='/updateEmail' element={<DefaultLayout3><ChangeMail /></DefaultLayout3>} />
        <Route path='/updateNumber' element={<DefaultLayout3><ChangeNumber /></DefaultLayout3>} />
        <Route path='/verify-updateEmail' element={<DefaultLayout3><VerifyMail /></DefaultLayout3>} />
        <Route path='/verify-updateNumber' element={<DefaultLayout3><VerifyNumber /></DefaultLayout3>} />
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
        <Route path="/companylogin" element={<Login />} /> 
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/Jobsdesc" element={<DefaultLayout><JobDescription /></DefaultLayout>} />
        
      </Routes>
      <ToastContainer/>
    </Router>
  );
};

export default App;
