import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Background from "../../images/background.jpg";

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employeeId, mobile_no } = location.state || {}; // Retrieve from state

  const [formData, setFormData] = useState({
    name: '',
    mobile_no: mobile_no || '',
    whatsappNumber: '',
    gender: '',
    country: '',
    email: '',
    dob: '',
    availability: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    console.log('Form data updated:', { ...formData, [name]: value });
  };

  const handleNext = async () => {
    console.log('Submitting form data:', formData);
    console.log('Employee ID:', employeeId);

    const requiredFields = ['name', 'mobile_no', 'whatsappNumber', 'gender', 'country', 'email', 'dob', 'availability'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!employeeId) {
      setError('Employee ID is required.');
      return;
    }

    try {
      const response = await axios.post('https://api.rightships.com/employee/update', {
        employee_id: employeeId,
        ...formData
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);

      if (response.status === 200) {
        console.log('Update successful:', response.data);
        navigate('/experienceDetails');
      } else {
        console.error('Failed to update:', response);
        setError('Failed to update employee details. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setError(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
      } else {
        console.error('Error:', error);
        setError('An error occurred during update. Please try again.');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-2/5 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}></div>
      <div className="w-full md:w-3/5 h-screen overflow-y-auto bg-white flex justify-center">
        <div className="container-fluid w-9/12">
          <h1 className="text-4xl font-semibold mt-14 mb-2">Your Personal Details</h1>
          <h6 className='text-lg font-semibold mb-4'>Manish Sir</h6>
          {error && (
            <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">
              {error}
            </div>
          )}
          <form className="space-y-6">
            <div className="grid grid-cols-1">
              <label className='text-base'>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full border-2 border-gray-200 py-2.5 px-5 rounded-lg mt-1"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className='text-base'>Mobile Number</label>
                <input
                  type="text"
                  name="mobile_no"
                  placeholder="Enter your mobile number"
                  className="w-full border-2 border-gray-200 py-2.5 px-5 rounded-lg mt-1"
                  onChange={handleChange}
                  value={formData.mobile_no}
                />
              </div>
              <div>
                <label className='text-base'>Whatsapp Number</label>
                <input
                  type="text"
                  name="whatsappNumber"
                  placeholder="Enter your WhatsApp number"
                  className="w-full border-2 border-gray-200 py-2.5 px-5 rounded-lg mt-1"
                  onChange={handleChange}
                  value={formData.whatsappNumber}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className='text-base'>Gender</label>
                <select
                  name="gender"
                  className="w-full border-2 border-gray-200 py-2.5 px-4 rounded mt-1"
                  onChange={handleChange}
                  value={formData.gender}
                >
                  <option value="">Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className='text-base'>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your country"
                  className="w-full border-2 border-gray-200 py-2.5 px-5 rounded-lg mt-1"
                  onChange={handleChange}
                  value={formData.country}
                />
              </div>
            </div>
            <div className="grid grid-cols-1">
              <label className='text-base'>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email id"
                className="w-full border-2 border-gray-200 py-2.5 px-5 rounded-lg mt-1"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className='text-base'>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="w-full border-2 border-gray-200 py-2.5 px-5 mt-1 rounded-lg"
                  onChange={handleChange}
                  value={formData.dob}
                />
              </div>
              <div>
                <label className='text-base'>Date of Availability</label>
                <input
                  type="date"
                  name="availability"
                  className="w-full border-2 border-gray-200 py-2.5 px-5 mt-1 rounded-lg"
                  onChange={handleChange}
                  value={formData.availability}
                />
              </div>
            </div>
            <div className="flex justify-start">
              <button type='button' className="bg-customBlue text-white font-bold py-2.5 rounded w-24 text-center" onClick={handleNext}>
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
