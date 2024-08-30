import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PublicProfile = () => {
  const { employeeId } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/employee/get`, {
          employee_id: employeeId,
        });

        setProfileData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [employeeId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6 lg:p-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={profileData.profile || "https://i2.pickpik.com/photos/711/14/431/smile-profile-face-male-preview.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover shadow-md"
          />
          <div className="lg:ml-8 mt-6 lg:mt-0">
            <h2 className="text-2xl font-bold text-gray-900">{profileData.firstName} {profileData.lastName}</h2>
            <p className="text-gray-600">{profileData.presentRank}</p>
            <p className="text-gray-600">Applied Rank: {profileData.appliedRank}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700"><strong>Date Of Availability:</strong> {profileData.availability}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>SID:</strong> {profileData.sid}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>US Visa:</strong> {profileData.usVisa}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Nationality:</strong> {profileData.nationality}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Date of Birth:</strong> {profileData.dob}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Age:</strong> {profileData.age}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Gender:</strong> {profileData.gender}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700"><strong>Email:</strong> {profileData.email}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Mobile No:</strong> {profileData.mobile_no}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>WhatsApp Number:</strong> {profileData.whatsappNumber}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Rank Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700"><strong>Applied Rank:</strong> {profileData.appliedRank}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Last Rank:</strong> {profileData.presentRank}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Vessel Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700"><strong>Vessel Applied For:</strong> {profileData.appliedVessel}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Last Vessel:</strong> {profileData.presentVessel}</p>
            </div>
            <div className="lg:col-span-2">
              <p className="text-gray-700"><strong>Experience In Vessel:</strong> {profileData.vesselExp.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Experience Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700"><strong>Total Sea Exp (Years):</strong> {profileData.totalSeaExperienceYear}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Total Sea Exp (Months):</strong> {profileData.totalSeaExperienceMonth}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Last Rank Exp (Months):</strong> {profileData.presentRankExperienceInMonth}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Certificates</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700"><strong>COC:</strong> {profileData.coc}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>COP:</strong> {profileData.cop}</p>
            </div>
            <div className="lg:col-span-2">
              <p className="text-gray-700"><strong>Watchkeeping:</strong> {profileData.watchkeeping}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900">Other Information</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-gray-700"><strong>Height (cm):</strong> {profileData.height}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Weight (kg):</strong> {profileData.weight}</p>
            </div>
            <div className="lg:col-span-2">
              <p className="text-gray-700"><strong>BMI:</strong> {profileData.bmi}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PublicProfile;
