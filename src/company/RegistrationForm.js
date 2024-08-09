import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import Loader from './Loader';
import MailSendPopup from './helper/mailsendpopup';
import Logo from '../images/logo.png';

const RegistrationForm = () => {
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef(null);

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

    // Validate form inputs
    if (!validateMobileNo(mobileNo)) {
      toast.error('Mobile number must be exactly 10 digits.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format.');
      return;
    }

    setLoading(true);
    console.log('Form submitted:', {
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      Website_URL: websiteURL,
      mobile_no: `${mobileNo}`,
      email,
      City: city,
      licenseRPSL,
      Address: address,
    });
    senddata();
  };

  const senddata = async () => {
    try {
      const response = await fetch('https://api.rightships.com/company/register', {
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
      console.log('data',data);
      if (response.ok) {
        if (data.code === 200) {
          console.log('Verify link has been sent to your email. Please verify.');
          console.log(data.msg);
          setShowPopup(true);
        }else if(data.code === 409) {
          toast.error(`Error ${data.code}: ${data.msg || "Error while registering."}`);
          console.log('Error response:', data);
        }else{
          toast.error(`Error ${data.code}: ${data.msg || "Error while registering."}`);
          console.log('Error response:', data);
        }
      }
      else{
        toast.error(`Error ${data.code}: ${data.msg || "Error while registering."}`);
        console.log('Error response:', data);
      }
    } catch (error) {
      console.log(error.message);
      toast.error('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <ToastContainer />
      {loading && <Loader />}
      {showPopup && <MailSendPopup/>}
      <nav className="w-full bg-white border-b border-gray-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center h-12">
          <div className="flex items-center h-full">
            <Link className="flex"><img src={Logo} alt="Logo" height={40} width={40} /> <p className="font-bold text-gray-800 mt-2 px-4">RIGHTSHIP</p></Link>
            <Link to="/jobs_home"><p className="text-black font-bold hover:text-customBlue hover:font-bold mx-4">Jobs</p></Link>
            <Link><p className="text-black font-bold hover:text-customBlue hover:font-bold mx-4">Companies</p></Link>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-customBlue border border-blue-600 rounded hover:bg-blue-50">Login</button>
            <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">Register</button>
            <div className="relative" ref={dropdownRef}>
              <button onClick={handleDropdownClick} className="px-3 py-1 text-black-600  rounded hover:bg-blue-50">
                For employers
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  {/* <a href="/admin_dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Admin</a> */}
                  <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Company Login</a>
                  <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Company Registration</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="w-full max-w-4xl mt-6 bg-white border border-gray-400 rounded-lg shadow-md">
        <div className="bg-customBlue text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Please fill out the form for registration</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2" htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="lastName">Last Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="companyName">Company Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full p-2 border border-gray-300 rounded"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="websiteURL">Website URL <span className="text-red-500">*</span></label>
              <input
                type="url"
                id="websiteURL"
                name="websiteURL"
                className="w-full p-2 border border-gray-300 rounded"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="mobileNo">Mobile No. <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="p-2 border border-gray-300 rounded-l bg-customBlue text-white flex items-center">
                  {countryCode}
                </div>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  className="w-full p-2 border border-gray-300 rounded-r"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="city">City <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full p-2 border border-gray-300 rounded"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="licenseRPSL">License RPSL</label>
              <input
                type="text"
                id="licenseRPSL"
                name="licenseRPSL"
                className="w-full p-2 border border-gray-300 rounded"
                value={licenseRPSL}
                onChange={(e) => setLicenseRPSL(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="address">Address <span className="text-red-500">*</span></label>
            <textarea
              id="address"
              name="address"
              className="w-full p-2 border border-gray-300 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-customBlue text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
