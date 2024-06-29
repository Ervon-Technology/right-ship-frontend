import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './company/Sidebar';
import Header from './company/Header';
import Footer from './company/Footer';
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
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import RegistrationForm from './company/RegistrationForm';
import Home from './job_seeker/home';
import CandidateLogin from './job_seeker/CandidateLogin';
import CandidateOtpverify from './job_seeker/CandidateOtpverify'
import JobDashboard from './job_seeker/Job_Dashboard';
import About from './job_seeker/About'
import Details from './job_seeker/Details';
import Experience from './job_seeker/Experience';
import Resume from './job_seeker/Resume';
import Profile from './job_seeker/Profile';
import Congratulations from './job_seeker/Congratulations';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const DefaultLayout = ({ children }) => (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
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
        <Route path='/congratulations' element={<Congratulations />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/resume' element={<Resume />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/details' element={<Details />} />
        <Route path='/about' element={<About />} />
        <Route path='/job_dashboard' element={<JobDashboard />} />
        <Route path='/candidate_Otpverify' element={<CandidateOtpverify />} />
        <Route path='/candidate_login' element={<CandidateLogin />}/>
        <Route path='/jobs_home' element={<Home />} />
        <Route path="/employeer-dashboard" element={<DefaultLayout><EmployeerDashboard /></DefaultLayout>} />
        <Route path="/preview-edit-job-detail" element={<DefaultLayout><EmployerDetails /></DefaultLayout>} />
        <Route path="/emp" element={<DefaultLayout><Empteam /></DefaultLayout>} />
        <Route path="/add-job-basics" element={<DefaultLayout><AddJobBasics /></DefaultLayout>} />
        <Route path="/add-pay-and-benefits" element={<DefaultLayout><AddPayAndBenefits /></DefaultLayout>} />
        <Route path="/edit-jobs" element={<DefaultLayout><EditJobs /></DefaultLayout>} />
        <Route path="/candidates" element={<DefaultLayout><Candidates /></DefaultLayout>} />
        <Route path="/jobs" element={<DefaultLayout><JobDescription /></DefaultLayout>} />
        <Route path="/candidate-details" element={<DefaultLayout><CandidatesDetails /></DefaultLayout>} />
        <Route path="/edit-job-details" element={<DefaultLayout><EmployerDetails /></DefaultLayout>} />
        <Route path="/manage-users" element={<DefaultLayout><ManageUsers /></DefaultLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/otpverify" element={<OtpVerify />} />
      </Routes>
    </Router>
  );
};

export default App;
