import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CandidateDetail = () => {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const data = {
    employee_id: candidateId
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      setLoading(true);
      try {
        const response = await axios.post('https://api.rightships.com/employee/get', data);
        setCandidate(response.data.data[0]);
      } catch (err) {
        console.error('Error fetching candidate details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!candidate) {
    return <p className="text-center text-xl mt-8 text-gray-600">No candidate found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen ">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              loading="lazy"
              className="w-full object-cover md:w-48 h-full"
              src={candidate.profile_photo || 'https://via.placeholder.com/150'}
              alt={candidate.name}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {candidate.presentRank || 'Candidate'}
            </div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-gray-900">
              {candidate.name}
            </h1>
            <div className="mt-4">
              <a
                href={candidate.resume}
                download={`${candidate.name}-resume.pdf`}
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Download Resume
              </a>
            </div>
            <div className="mt-4">
              {!showEmail ? (
                <button
                  onClick={() => setShowEmail(true)}
                  className="text-blue-600 underline"
                >
                  View Email
                </button>
              ) : (
                <p className="text-gray-600">{candidate.email || 'N/A'}</p>
              )}
            </div>
            <div className="mt-2">
              {!showPhoneNumber ? (
                <button
                  onClick={() => setShowPhoneNumber(true)}
                  className="text-blue-600 underline"
                >
                  View Number
                </button>
              ) : (
                <p className="text-gray-600">{candidate.mobile_no || 'N/A'}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <InfoCard title="Personal Information">
          <InfoItem label="Available From" value={candidate.dateOfAvailability} />
          <InfoItem label="Date of Birth" value={candidate.dateOfBirth} />
          <InfoItem label="Gender" value={candidate.gender} />
        </InfoCard>

        <InfoCard title="Professional Experience">
          <InfoItem label="Total Sea Experience" value={candidate.experience?.seaExperience || 'N/A'} />
          <InfoItem label="Last Vessel Type" value={candidate.lastVesselType || 'N/A'} />
          <InfoItem label="Vessel Applied For" value={candidate.appliedVessel || 'N/A'} />
        </InfoCard>

        <InfoCard title="Certifications">
          <InfoItem label="License (COC)" value={candidate.licenseHolding?.coc || 'N/A'} />
          <InfoItem label="COP" value={candidate.licenseHolding?.cop || 'N/A'} />
          <InfoItem label="Watch Keeping" value={candidate.licenseHolding?.watchKeeping || 'N/A'} />
        </InfoCard>

        <InfoCard title="Last Sea Experience">
          <ItemList value={candidate.pastvesselExp} />
        </InfoCard>

        <InfoCard title="Additional Details">
          <InfoItem label="Height" value={candidate.others?.height || 'N/A'} />
          <InfoItem label="Weight" value={candidate.others?.weight || 'N/A'} />
          <InfoItem label="SID Card" value={candidate.others?.sidCard || 'N/A'} />
          <InfoItem label="Open to Lower Rank" value={candidate.others?.willingToAcceptLowerRank || 'N/A'} />
        </InfoCard>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">Error: {error} (Showing dummy data)</p>}
    </div>
  );
};

const InfoCard = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out">
    <div className="px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  </div>
);

const ItemList = ({ value }) => {
  if (!Array.isArray(value) || value.length === 0) {
    return <p className="text-gray-900">N/A</p>;
  }

  return (
    <ul>
      {value.map((val, index) => (
        <li key={index}>{val}</li>
      ))}
    </ul>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    {icon ? <span className="text-xl mr-3">{icon}</span> : ""}
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || 'N/A'}</p>
    </div>
  </div>
);

export default CandidateDetail;