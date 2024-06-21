import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    websiteURL: '',
    mobileNo: '',
    email: '',
    city: '',
    licenseRPSL: '',
    address: ''
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { ...formData, mobileNo: `${countryCode}${formData.mobileNo}` });
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
      <nav className="w-full bg-white border-b border-gray-300">
        <div className="max-w-6xl mx-auto flex justify-between items-center h-12">
          <div className="flex items-center h-full"> 
            <a href="#" className="font-semibold text-gray-800 bg-gray-200 h-full flex items-center px-4">RightShips</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 ml-4">Jobs</a>
            <a href="#" className="text-gray-600 hover:text-gray-800 ml-4">Companies</a>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">Login</button>
            <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700">Register</button>
            <div className="relative" ref={dropdownRef}>
              <button onClick={handleDropdownClick} className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                Company Account
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
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
        <div className="bg-blue-900 text-white p-4 rounded-t-lg">
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
                value={formData.firstName}
                onChange={handleChange}
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
                value={formData.lastName}
                onChange={handleChange}
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
                value={formData.companyName}
                onChange={handleChange}
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
                value={formData.websiteURL}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="mobileNo">Mobile No. <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="p-2 border border-gray-300 rounded-l bg-blue-900 text-white flex items-center">
                  {countryCode}
                </div>
                <input
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  className="w-full p-2 border border-gray-300 rounded-r"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="email">Email ID <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2" htmlFor="licenseRPSL">License RPSL (optional)</label>
              <input
                type="text"
                id="licenseRPSL"
                name="licenseRPSL"
                className="w-full p-2 border border-gray-300 rounded"
                value={formData.licenseRPSL}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="address">Address <span className="text-red-500">*</span></label>
            <textarea
              id="address"
              name="address"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" className="px-4 py-2 bg-gray-100 text-black border border-gray-500 rounded font-semibold hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-900 text-white rounded font-semibold hover:bg-blue-700">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
