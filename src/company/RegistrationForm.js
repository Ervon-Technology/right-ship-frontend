import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaBuilding, FaGlobe, FaEnvelope, FaCity, FaIdCard, FaMapMarkerAlt } from 'react-icons/fa';
import Loader from './Loader';
import MailSendPopup from './helper/mailsendpopup';

const InputField = ({ icon: Icon, label, value, onChange, required, type = 'text', prefix, textarea }) => (
  <div className="relative mb-6">
    <label className="block text-gray-700 text-lg font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      {textarea ? (
        <textarea
          className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <div className="flex">
          {prefix && (
            <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-600 text-sm">
              {prefix}
            </span>
          )}
          <input
            type={type}
            className={`w-full p-4 ${prefix ? '' : 'pl-12'} border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          />
        </div>
      )}
    </div>
  </div>
);

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="w-full bg-gray-300 rounded-full h-2 mb-6">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
    ></div>
  </div>
);

const RegistrationForm = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [websiteURL, setWebsiteURL] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [licenseRPSL, setLicenseRPSL] = useState('');
  const [address, setAddress] = useState('');
  const [countryCode] = useState('+91');
  const [showPopup, setShowPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);
  const totalSteps = 3;

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobileNo = (mobileNo) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(mobileNo));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateMobileNo(mobileNo)) {
      toast.error('Mobile number must be exactly 10 digits.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format.');
      return;
    }

    setLoading(true);
    senddata();
  };

  const senddata = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/company/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          website_url: websiteURL,
          mobile_no: `${mobileNo}`,
          email,
          city: city,
          licenseRPSL,
          address: address,
          admin_verify: false,
        }),
      });

      const data = await response.json();
      if (response.ok && data.code === 200) {
        setIsRegistered(true);
        toast.success('Successfully registered! Please check your email to verify.');
      } else {
        toast.error(`Error ${data.code}: ${data.msg || 'Error while registering.'}`);
      }
    } catch (error) {
      toast.error('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        if (!firstName || !lastName || !companyName) {
          toast.error('Please fill in all required fields.');
          return false;
        }
        break;
      case 2:
        if (!mobileNo || !email || !city) {
          toast.error('Please fill in all required fields.');
          return false;
        }
        break;
      case 3:
        if (!address) {
          toast.error('Please fill in all required fields.');
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <InputField icon={FaUser} label="First Name" value={firstName} onChange={setFirstName} required />
            <InputField icon={FaUser} label="Last Name" value={lastName} onChange={setLastName} required />
            <InputField icon={FaBuilding} label="Company Name" value={companyName} onChange={setCompanyName} required />
            <InputField icon={FaGlobe} label="Website URL" value={websiteURL} onChange={setWebsiteURL} required type="url" />
          </>
        );
      case 2:
        return (
          <>
            <InputField label="Mobile No." value={mobileNo} onChange={setMobileNo} required type="tel" prefix={countryCode} />
            <InputField icon={FaEnvelope} label="Email" value={email} onChange={setEmail} required type="email" />
            <InputField icon={FaCity} label="City" value={city} onChange={setCity} required />
            <InputField icon={FaIdCard} label="License RPSL" value={licenseRPSL} onChange={setLicenseRPSL} />
          </>
        );
      case 3:
        return (
          <>
            <InputField icon={FaMapMarkerAlt} label="Address" value={address} onChange={setAddress} required textarea />
          </>
        );
      default:
        return null;
    }
  };

  const renderForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white p-8 rounded-t-xl">
        <h2 className="text-3xl font-semibold">Register Your Company</h2>
        <p className="mt-2 text-sm">Fill in the details below to get started.</p>
      </div>

      <div className="p-8">
        <ProgressBar currentStep={step} totalSteps={totalSteps} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Previous
              </button>
            )}
            {step < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
                disabled={loading}
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden p-8 text-center"
    >
      <h2 className="text-3xl font-semibold text-green-500">Registration Successful!</h2>
      <p className="mt-4 text-gray-600">A verification link has been sent to your email. Please verify your account.</p>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => setIsRegistered(false)}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200 p-6">
      <ToastContainer />
      {loading && <Loader />}
      {showPopup && <MailSendPopup />}
      {isRegistered ? renderSuccess() : renderForm()}
    </div>
  );
};

export default RegistrationForm;
