import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '../../features/employeeRegistrationSlice';
import Background from "../../images/background.jpg";
import { Link } from 'react-router-dom';

const About = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.employee);

  const [formData, setFormData] = useState({
    name: data.name,
    mobile_no: data.mobile_no,
    whatsappNumber: data.whatsappNumber,
    gender: data.gender,
    country: data.country,
    email: data.email,
    dob: data.dob,
    availability: data.availability
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    dispatch(updateData({ [name]: value }));
  };
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-2/5 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}></div>
      <div className="w-full md:w-3/5 h-screen overflow-y-auto bg-white flex justify-center">
        <div className="container-fluid w-9/12">
          <h1 className="text-4xl font-semibold mt-14 mb-2">Your Personal Details</h1>
          <h6 className='text-lg font-semibold mb-4'>Manish Sir</h6>
          <form className="space-y-6" >
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
            <div className="grid grid-col-1">
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
              <button  className="bg-customBlue text-white font-bold py-2.5 rounded w-24 text-center"><Link to='/experinceDetails'>
                Next
                </Link>
              </button>
            </div>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
