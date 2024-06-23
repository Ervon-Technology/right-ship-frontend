import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditJobDetail from './EditJobDetail';
import { Link } from 'react-router-dom';

const EmployerDetails = () => {
  const [details, setDetails] = useState({
    username: '',
    contactPerson: '',
    country: '',
    phoneNumber: '',
    email: '',
    address: '',
    companyName: '',
    companyUrl: '',
    city: '',
  });
  let cmp;
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('cmpid');
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/company/getcmp/${id}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "authorization": token,
          }
        });
        const data = await response.json();
        if (response.ok) {
          if (data && data.companies) {
            cmp = data.companies[0];
            setDetails({
              username: cmp.userName || '',
              contactPerson: cmp.contactPerson || '',
              // state: cmp.state || '',
              country: cmp.country || 'india',
              phoneNumber: cmp.phone || '',
              email: cmp.email || '',
              address: cmp.address || '',
              companyName: cmp.companyName || '',
              companyUrl: cmp.companyUrl || '',
              city: cmp.city || '',
              // zipCode: cmp.zipCode || '',
              // numberofship: data.companies.numberofship || '',
              // companyprofile: data.companies.companyprofile || '',
              // termandcondition: data.companies.termandcondition || '',
              // typeofship: data.companies.typeofship || ''
            });
          }
        } else {
          console.log(data.error);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, []);

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
          {Object.keys(details).map((key) => (
            <div key={key} className="flex flex-col w-full md:w-1/2 lg:w-1/3">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type={key === "email" ? "email" : key === "phoneNumber" ? "tel" : "text"}
                name={key}
                value={details[key]}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full md:w-auto bg-buttonColor text-white py-2 px-4 rounded-lg mt-4"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="p-4 flex flex-wrap gap-4">
          {Object.keys(details).map((key) => (
            <div key={key} className="flex flex-col w-full md:w-1/2 lg:w-1/3">
              <p>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {details[key]}
              </p>
            </div>
          ))}
        </div>
      )}

      <EditJobDetail data={cmp}/>

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
