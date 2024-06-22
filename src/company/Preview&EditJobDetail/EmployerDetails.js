import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import EditJobDetail from './EditJobDetail';
import { Link } from 'react-router-dom';

const EmployerDetails = () => {
  const empdetails = useSelector(state => state.emp.empdetails);
  if(empdetails){
    console.log(empdetails);
  }else{
    console.log("empdetails not found!!!");
  }
  const [details, setDetails] = useState({
    username: empdetails.userName,
    contactPerson: empdetails.contactPerson,
    state: empdetails.state || 'not set',
    country: empdetails.country || 'india',
    phoneNumber: empdetails.phone,
    email: empdetails.email,
    address: empdetails.address,
    companyName: empdetails.companyName,
    companyUrl: empdetails.companyUrl,
    city: empdetails.city,
    zipCode: empdetails.zipcode || '400101',
    numberofship: '10',
    companyprofile: 'N/A',
    termandcondition: 'N/A',
    typeofship: 'tanker'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send details to the backend
    console.log('Form submitted:', details);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-customSky1 h-14 flex items-center justify-start p-4">
        <h2 className="font-medium text-base">Company Details</h2>
        <FaEdit className="ml-4 mb-0.5" />
        <button onClick={handleEdit} className="ml-2">
          Edit
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-4 flex flex-wrap gap-4">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={details.username}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Contact Person:</label>
            <input
              type="text"
              name="contactPerson"
              value={details.contactPerson}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>State:</label>
            <input
              type="text"
              name="state"
              value={details.state}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={details.country}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={details.phoneNumber}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={details.address}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={details.companyName}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Company URL:</label>
            <input
              type="url"
              name="companyUrl"
              value={details.companyUrl}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={details.city}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={details.zipCode}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-buttonColor text-white py-2 px-4 rounded-lg mt-4"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="p-4 flex flex-wrap gap-4">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Username:</strong> {details.username}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Contact Person:</strong> {details.contactPerson}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>State:</strong> {details.state}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Country:</strong> {details.country}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Phone Number:</strong> {details.phoneNumber}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Email:</strong> {details.email}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Address:</strong> {details.address}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Company Name:</strong> {details.companyName}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Company URL:</strong>{' '}
              <a href={details.companyUrl}>{details.companyUrl}</a>
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>City:</strong> {details.city}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Zip Code:</strong> {details.zipCode}
            </p>
          </div>
        </div>
      )}

      <EditJobDetail />

      <div className="bg-customSky1 h-24 mt-32 flex items-center justify-between p-4">
        <p className='w-4/6'>
          By selecting <b>Confirm</b>, you agree to this job post reflecting
          your requirements and the application will proceed following ABC's{' '}
          <Link to="https://www.google.co.in/" className="text-blue-500">
            Terms
          </Link>
          ,{' '}
          <Link to="https://www.google.co.in/" className="text-blue-500">
            Cookies
          </Link>{' '}
          and{' '}
          <Link to="https://www.google.co.in/" className="text-blue-500">
            Privacy
          </Link>{' '}
          Policies
        </p>
        <button className="bg-customBlue h-12 w-60 mr-6 rounded-lg text-white">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EmployerDetails;
