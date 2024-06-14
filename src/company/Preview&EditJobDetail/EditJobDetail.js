import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const EditJobDetail = () => {
  const [empdetails, setEmpDetails] = useState({
    numberofship: '10',
    companyprofile: 'N/A',
    termandcondition: 'N/A',
    typeofship: 'tanker',
  });

  const [isEmpEditing, setIsEmpEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpDetails({ ...empdetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send empdetails to the backend
    console.log('Form submitted:', empdetails);
    setIsEmpEditing(false);
  };

  const handleEdit = () => {
    setIsEmpEditing(true);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="bg-customSky1 h-16 mt-8 w-full flex items-center px-4">
        <h2 className="font-medium text-base">Employees Personal Details</h2>
        <div className="flex items-center">
          <FaEdit className="ml-4 mr-2 mb-1" />
          <button onClick={handleEdit} className="text-black">
            Edit
          </button>
        </div>
      </div>

      {isEmpEditing ? (
        <form onSubmit={handleSubmit} className="p-4 flex flex-wrap gap-4">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Number Of Ship:</label>
            <input
              type="text"
              name="numberofship"
              value={empdetails.numberofship}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Company Profile:</label>
            <input
              type="text"
              name="companyprofile"
              value={empdetails.companyprofile}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Term & Condition:</label>
            <input
              type="text"
              name="termandcondition"
              value={empdetails.termandcondition}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Type Of Ship:</label>
            <input
              type="text"
              name="typeofship"
              value={empdetails.typeofship}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>
          <button
            className="w-full md:w-auto bg-buttonColor text-white py-2 px-4 rounded-lg mt-4"
            type="submit"
          >
            Save
          </button>
        </form>
      ) : (
        <div className="p-4 flex flex-wrap gap-4">
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Number Of Ship:</strong> {empdetails.numberofship}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Company Profile:</strong> {empdetails.companyprofile}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Term & Condition:</strong> {empdetails.termandcondition}
            </p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <p>
              <strong>Type Of Ship:</strong> {empdetails.typeofship}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJobDetail;
