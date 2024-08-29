import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FiEdit3, FiCheck, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';

const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/company/get`,
          { company_id: user.company_id },
          {
            headers: {
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
          }
        );
        setCompany(response.data.data[0]);
        setEditedCompany(response.data.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [user.company_id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCompany(company);
  };

  const handleSave = async () => {
    delete editedCompany._id;
    editedCompany.company_id = user.company_id;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/company/update`,
        editedCompany
      );
      setCompany(editedCompany);
      setIsEditing(false);

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Company updated successfully!',
        showConfirmButton: false,
        timer: 1500 // Disappears after 1.5 seconds
      });
    } catch (error) {
      console.error('Error updating company data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCompany((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!company) {
    return <div className="flex justify-center items-center h-screen">No company data available.</div>;
  }

  const renderField = (label, field, type = 'text') => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-1">{label}:</label>
      {isEditing ? (
        <input
          type={type}
          name={field}
          value={editedCompany[field] || ''}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
      ) : (
        <p className="text-gray-800">{company[field] || 'Not Provided'}</p>
      )}
    </div>
  );

  const formatDate = (dateObj) => {
    return dateObj && dateObj.$date ? new Date(dateObj.$date).toLocaleString() : 'N/A';
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600  p-6 flex justify-between items-center">
          <h3 className="text-base sm:text-2xl font-bold text-white">Company Profile</h3>
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="text-white bg-transparent hover:bg-white hover:text-indigo-600 border border-white rounded-full p-2 transition duration-300"
            >
              <FiEdit3 size={20} />
            </button>
          )}
        </div>
        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
              {renderField('Company Name', 'company_name')}
              {renderField('Website', 'website_url', 'url')}
              {renderField('City', 'city')}
              {renderField('Country', 'country')}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              {renderField('Admin Name', 'first_name')}
              {renderField('Email', 'email', 'email')}
              {renderField('Mobile Number', 'mobile_no', 'tel')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Verification Status</h2>
              <p className="text-gray-700"><strong>Verified:</strong> {company.verified ? 'Yes' : 'No'}</p>
              <p className="text-gray-700"><strong>Admin Verified:</strong> {company.admin_verify ? 'Yes' : 'No'}</p>
              {renderField('License RPSL', 'license_rpsl')}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Timestamps</h2>
              <p className="text-gray-700"><strong>Created Date:</strong> {formatDate(company.created_date)}</p>
              <p className="text-gray-700"><strong>Last Updated:</strong> {formatDate(company.updated_date)}</p>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none transition duration-300"
              >
                 Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
