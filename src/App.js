import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './img.css';

// Layout Imports
import DefaultLayout from '../src/component/layout/defaultLayout';
import EmployeeLayout from '../src/component/layout/employeeLayout';
import CompanyLayout from '../src/component/layout/companyLayout';

// Page Imports
import HomePage from './job_seeker/landingpage/Home';
import NotFoundPage from './pageNotFound';
import CompanyOtpAuth from './company/login/login';
import RegistrationForm from './company/registrationForm';
import EmployeeOtpAuth from './job_seeker/login/employeelogin';
import EmployeeSignup from './job_seeker/signup/Signup';
import VerifySignupOtp from './job_seeker/signup/VerifySignupOtp';
import EmployeeRegistration from './job_seeker/Registration/EmployeeRegistration';
import JobDashboard from './job_seeker/jobs/JobDashboard';
import PrivacyPolicy from './company/privacyPolicy';
import Terms from './company/terms';
import SignupWithEmail from './job_seeker/signup/SignupWithEmail';
import EmployeeProfile from './job_seeker/employeeProfile/EmployeeProfile';
import CreateJobStepForm from './company/job/createJob/step';
import JobPostList from './company/job/jobPostList';
import CandidatesTable from './company/candidates/candidateList';
import CandidateDetail from './company/candidates/candidateDetail';
import JobDetail from './company/job/jobdetail';
import CompanyManageUsers from './company/manageUsers';
import CompanyProfile from './company/setting';
import Setting from './job_seeker/setting/Setting';
import JobBoard from './job_seeker/jobs/MyJobs';
import PublicProfile from './job_seeker/employeeProfile/PublicProfile'; // Import the PublicProfile component
import ContactUs from './contactUs';
import VerificationPending from './Pages/AccountVerify';
import AllCandidatesTable from './company/candidates/allCandidateList';



const App = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user; // Determine if a user is logged in

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          user.role === 'employee' ? (
            <>
            <Route element={<EmployeeLayout />}>
              <Route path="/settings" element={<Setting />} />
              <Route path="/jobs" element={<JobDashboard />} />
              <Route path="/profile" element={<EmployeeProfile />} />
              <Route path="/my-jobs" element={<JobBoard />} />
              <Route path="*" element={<JobDashboard />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/public-profile/:employeeId" element={<PublicProfile />} /> {/* Public profile route */}
            </Route>
            <Route element={<DefaultLayout />}>
              <Route path="/public-profile/:employeeId" element={<PublicProfile />} /> {/* Public profile route */} 
            </Route>
            </>
          ) : (
            <>
            <Route element={<CompanyLayout />}>
            {user.company && user.company.admin_verify === true ? (
                <>
                  <Route path="/create/job" element={<CreateJobStepForm />} />
                  <Route path="/post/job" element={<JobPostList />} />
                  <Route path="/post/job/detail/:id" element={<JobDetail />} />
                  <Route path="/job/candidates" element={<CandidatesTable />} />
                  <Route path="/all/candidates" element={<AllCandidatesTable />} />
                  <Route path="/job/candidates/detail/:candidateId" element={<CandidateDetail />} />
                  <Route path="/manage/company/team" element={<CompanyManageUsers />} />
                  <Route path="/setting" element={<CompanyProfile />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<JobPostList />} />
                </>
              ) : (
                // If not verified, show a message or redirect
                <Route path="/*" element={<VerificationPending />} />
              )} 
            </Route>
            <Route element={<DefaultLayout />}>
              <Route path="/public-profile/:employeeId" element={<PublicProfile />} /> {/* Public profile route */} 
            </Route>
            </>
          )
        ) : (
          <>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobDashboard />} />
              <Route path="/company/login" element={<CompanyOtpAuth />} />
              <Route path="/login" element={<EmployeeOtpAuth />} />
              <Route path="/register" element={<EmployeeSignup />} />
              <Route path='/email-register' element={<SignupWithEmail />} />
              <Route path='/verify-signup-otp' element={<VerifySignupOtp />} />
              <Route path="/employee-registration" element={<EmployeeRegistration />} />
              <Route path="*" element={<NotFoundPage />} />     
              
            </Route>
            <Route path="/company/register" element={<RegistrationForm />} />
            <Route path="/public-profile/:employeeId" element={<PublicProfile />} /> {/* Public profile route */}
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </>
        )}
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
