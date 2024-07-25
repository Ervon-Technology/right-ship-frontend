import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EmployerDetails = () => {
  const [details, setDetails] = useState({
    first_name: '',
    last_name: '',
    state: '',
    country: '',
    mobile_no: '',
    email: '',
    address: '',
    company_name: '',
    website_url: '',
    city: '',
  });
  const [shipDetails, setShipDetails] = useState({
    numberOfShips: '',
    typeOfShip: '',
    companyProfile: '',
    termsAndConditions: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyId = localStorage.getItem('company_id');
        const response = await fetch('https://api.rightships.com/company/get', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company_id: companyId }),
        });
        const data = await response.json();
        if (response.ok && data.code === 200) {
          const cmp = data.data[0];
          console.log(cmp);
          setDetails({
            first_name: cmp.first_name || '',
            last_name: cmp.last_name || '',
            country: cmp.country || 'India',
            mobile_no: cmp.mobile_no || '',
            email: cmp.email || '',
            address: cmp.address || '',
            company_name: cmp.company_name || '',
            website_url: cmp.website_url || '',
            city: cmp.city || '',
          });
          setShipDetails({
            numberOfShips: cmp.number_of_ships || 'N/A',
            typeOfShip: cmp.type_of_ship || 'N/A',
            companyProfile: cmp.company_profile || 'N/A',
            termsAndConditions: cmp.terms_and_conditions || 'N/A',
          });
        } else {
          setError(data.msg || 'Error fetching company details');
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.rightships.com/company/update', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: `${localStorage.getItem('company_id')}`,
          ...details,
        }),
      });
      const data = await response.json();
      if (response.ok && data.code === 200) {
        console.log('Company details updated successfully');
        setIsEditing(false);
      } else {
        setError(data.msg || 'Error updating company details');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="h-14 flex items-center justify-between p-4" style={{ backgroundColor: '#DDE5FF' }}>
        <h2 className="font-medium text-black">Company Details</h2>
        <button onClick={handleEdit} className="text-black flex items-center">
          <FaEdit className="mr-2" /> Edit
        </button>
      </div>

      {error && <p className="text-red-500 p-4">{error}</p>}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="p-8 flex flex-wrap gap-4">
          {Object.keys(details).map((key) => (
            <div key={key} className="flex flex-col w-full md:w-1/2 lg:w-1/3">
              <label className="mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
              <input
                type={key === 'email' ? 'email' : key === 'phoneNumber' ? 'tel' : 'text'}
                name={key}
                value={details[key]}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
          >
            Save
          </button>
        </form>
      ) : (
        <div>
          <div className="flex flex-wrap gap-4 p-8">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="flex flex-col w-full md:w-1/2 lg:w-1/3 mb-4">
                <p>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 mt-4">
            <div className="h-14 flex items-center justify-between p-4" style={{ backgroundColor: '#DDE5FF' }}>
            <h3 className="font-medium text-lg mb-4">Employees Personal Details</h3>
              <button onClick={handleEdit} className="text-black flex items-center">
                <FaEdit className="mr-2" /> Edit
              </button>
            </div>
            <div className="flex flex-wrap gap-4 p-8">
              {Object.entries(shipDetails).map(([key, value]) => (
                <div key={key} className="flex flex-col w-full md:w-1/2 lg:w-1/3 mb-4">
                  <p>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="h-24 mt-32 flex items-center justify-between p-4" style={{ backgroundColor: '#DDE5FF' }}>
        <p className="text-black w-4/6">
          By selecting <b>Confirm</b>, you agree to this job post reflecting
          your requirements and application will be processed following ABC's{' '}
          <Link to="https://www.google.co.in/" className="underline">
            Terms
          </Link>
          ,{' '}
          <Link to="https://www.google.co.in/" className="underline">
            Cookies
          </Link>{' '}
          and{' '}
          <Link to="https://www.google.co.in/" className="underline">
            Privacy
          </Link>{' '}
          Policies.
        </p>
        <button className="bg-blue-500 h-12 w-60 mr-6 rounded-lg text-white">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default EmployerDetails;
