import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';

const EditJobDetail = ({ data }) => {
  const [empdetails, setEmpDetails] = useState({
    numberofship: '',
    companyprofile: 'N/A',
    termandcondition: 'N/A',
    typeofship: 'tanker',
  });

  const [isEmpEditing, setIsEmpEditing] = useState(true);
  const [companyProfileFile, setCompanyProfileFile] = useState(null);
  const [termsAndConditionsFile, setTermsAndConditionsFile] = useState(null);

  useEffect(() => {
    if (data && data.company_detail) {
      setEmpDetails(data.company_detail);
      setIsEmpEditing(false);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpDetails({ ...empdetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'companyprofile') {
      setCompanyProfileFile(files[0]);
    } else if (name === 'termandcondition') {
      setTermsAndConditionsFile(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('numberOfShip', empdetails.numberofship);
      if (companyProfileFile) {
        formData.append('company_profile', companyProfileFile);
      }
      if (termsAndConditionsFile) {
        formData.append('terms_and_conditions', termsAndConditionsFile);
      }
      const id = localStorage.getItem("cmpid");
      const response = await fetch(`http://localhost:3000/company/basicdetails/${id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('token'),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form submitted:', result);
      setIsEmpEditing(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
              type="file"
              name="companyprofile"
              onChange={handleFileChange}
              required
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 lg:w-1/3">
            <label>Term & Condition:</label>
            <input
              type="file"
              name="termandcondition"
              onChange={handleFileChange}
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
        </div>
      )}
    </div>
  );
};

export default EditJobDetail;
