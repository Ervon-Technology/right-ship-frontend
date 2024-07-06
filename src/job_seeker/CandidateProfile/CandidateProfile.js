import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, LogOut, SquarePen, Share2 } from 'lucide-react';
import Image from '../Assets/Profile.jpg';
import Modal1 from './Modal1';
import Modal2 from './Modal2';
import Modal3 from './Modal3';
import Modal4 from './Modal4';
import Modal5 from './Modal5';

const CandidateProfile = () => {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [isModal4Open, setIsModal4Open] = useState(false);
  const [isModal5Open, setIsModal5Open] = useState(false);

  // State for Basic Details
  const [lastShipType, setLastShipType] = useState('Passenger');
  const [experience, setExperience] = useState(Array(7).fill('Passenger'));
  const [lastRank, setLastRank] = useState('Passenger');
  const [appliedRank, setAppliedRank] = useState('Passenger');

  // State for License Holdings
  const [coc, setCoc] = useState('India');
  const [cop, setCop] = useState('India');
  const [watchKeeping, setWatchKeeping] = useState('India');

  // State for COVID-19 Vaccination
  const [vaccinationStatus, setVaccinationStatus] = useState({
    firstDose: false,
    secondDose: false,
    boosterDose: false,
  });

  // State for Others Details
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(64.4);
  const [sidCard, setSidCard] = useState(true);
  const [lowerRank, setLowerRank] = useState(true);
  const [medicalHistory, setMedicalHistory] = useState(true);
  const [medicalHistoryDesc, setMedicalHistoryDesc] = useState(
    'Description of medical history Description of medical history Description of medical history Description of medical history Description of medical history Description of medical history'
  );

  // State for Resume
  const [resumeFile, setResumeFile] = useState(null);

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side */}
        <div className="flex flex-col gap-6 md:w-1/3">
          {/* Box 1 */}
          <div className="px-6 pt-5 rounded-lg shadow-md bg-white flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center ml-6">
                  <img
                    src={Image}
                    alt="Akash Prajapati"
                    className="rounded-full h-24 w-24 object-cover"
                  />
                  <div className="ml-8 -mt-8">
                    <h2 className="text-3xl font-semibold">Akash Prajapati</h2>
                    <p className="text-gray-600">Chief Officer</p>
                  </div>
                </div>
                <button className="text-gray-600">
                  <SquarePen size={20} />
                </button>
              </div>
              <div className="flex justify-around mb-8">
                <p>Total sea experience: <br/><strong>256 Months 3 Days</strong></p>
                <p>Last rank experience: <br/><strong>36 Months 5 Days</strong></p>
              </div>
              <button className="text-customBlue font-semibold mx-auto flex">
                <Share2 className='mx-2 p-0.5'/> share profile
              </button>
            </div>
          </div>
          
          {/* Box 2 */}
          <div className="p-6 rounded-lg shadow-md bg-white flex flex-col">
            <div className="flex justify-end mb-4">
              <button className="text-gray-600">
                <SquarePen size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 mx-4 -mt-6 gap-10 mb-4">
              <p>Email ID: <br /><strong>anacreation4004@gmail.com</strong></p>
              <p className='ml-10'>Personal Number: <br /><strong>85912 43369</strong></p>
              <p>Date of Birth: <br /><strong>10-08-2005</strong></p>
              <p className='ml-10'>WhatsApp Number: <br /><strong>85912 43369</strong></p>
              <p>Current Location: <br /><strong>Mumbai / Maharashtra</strong></p>
              <p className='ml-10'>Gender: <br /><strong>Male</strong></p>
            </div>
            <Link to="https://maps.google.com" className="text-blue-700 font-semibold mx-4">
              google.maps.link.mumbai
            </Link>
          </div>

          {/* Logout Button */}
          <button className=" bg-red-500 text-white px-4 py-2 mx-auto rounded-md shadow-md w-44 flex items-center justify-center">
            <LogOut size={20} className="inline-block mr-2" /> Logout
          </button>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          {/* Basic Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Basic Details</h3>
              <button className="text-gray-600" onClick={() => setIsModal1Open(true)}>
                <SquarePen size={20} />
              </button>
            </div>
            <p>Last ship type: <strong>{lastShipType}</strong></p>
            <p>Experience on different types of ships:</p>
            <ul className="list-disc list-inside space-y-1 border border-gray-300 rounded-md w-96 px-3 py-1 my-2">
              {experience.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
            <p>Last rank: <strong>{lastRank}</strong></p>
            <p>Applied rank: <strong>{appliedRank}</strong></p>
          </div>

          {/* License Holdings */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">License Holdings</h3>
              <button className="text-gray-600" onClick={() => setIsModal2Open(true)}>
                <SquarePen size={20} />
              </button>
            </div>
            <p>COC: <strong>{coc}</strong></p>
            <p>COP: <strong>{cop}</strong></p>
            <p>Watch keeping: <strong>{watchKeeping}</strong></p>
          </div>
          
          {/* COVID-19 Vaccination */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">COVID-19 Vaccination</h3>
              <button className="text-gray-600" onClick={() => setIsModal3Open(true)}>
                <SquarePen size={20} />
              </button>
            </div>
            <p>1st Dose: <strong>{vaccinationStatus.firstDose ? 'Completed' : 'Not Completed'}</strong></p>
            <p>2nd Dose: <strong>{vaccinationStatus.secondDose ? 'Completed' : 'Not Completed'}</strong></p>
            <p>Booster Dose: <strong>{vaccinationStatus.boosterDose ? 'Completed' : 'Not Completed'}</strong></p>
          </div>

          {/* Upload Resume */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Resume</h3>
              <button className="text-gray-600" onClick={() => setIsModal4Open(true)}>
                <SquarePen size={20} />
              </button>
            </div>
            {resumeFile ? (
              <div className="flex items-center">
                <FileText size={20} className="mr-2" />
                <p>{resumeFile.name}</p>
              </div>
            ) : (
              <p>No resume uploaded</p>
            )}
          </div>

          {/* Other Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Other Details</h3>
              <button className="text-gray-600" onClick={() => setIsModal5Open(true)}>
                <SquarePen size={20} />
              </button>
            </div>
            <p>Height: <strong>{height} cm</strong></p>
            <p>Weight: <strong>{weight} kg</strong></p>
            <p>SID Card: <strong>{sidCard ? 'Available' : 'Not Available'}</strong></p>
            <p>Lower Rank: <strong>{lowerRank ? 'Yes' : 'No'}</strong></p>
            <p>Medical History: <strong>{medicalHistory ? 'Yes' : 'No'}</strong></p>
            {medicalHistory && <p>Description: <strong>{medicalHistoryDesc}</strong></p>}
          </div>
        </div>
      </div>

      <Modal1 
        isOpen={isModal1Open} 
        onClose={() => setIsModal1Open(false)}
        setLastShipType={setLastShipType}
        setExperience={setExperience}
        setLastRank={setLastRank}
        setAppliedRank={setAppliedRank}
        lastShipType={lastShipType}
        experience={experience}
        lastRank={lastRank}
        appliedRank={appliedRank}
      />
      <Modal2 
        isOpen={isModal2Open} 
        onClose={() => setIsModal2Open(false)}
        setCoc={setCoc}
        setCop={setCop}
        setWatchKeeping={setWatchKeeping}
        coc={coc}
        cop={cop}
        watchKeeping={watchKeeping}
      />
      <Modal3 
        isOpen={isModal3Open} 
        onClose={() => setIsModal3Open(false)}
        setVaccinationStatus={setVaccinationStatus}
        vaccinationStatus={vaccinationStatus}
      />
      <Modal4 
        isOpen={isModal4Open} 
        onClose={() => setIsModal4Open(false)}
        setResumeFile={setResumeFile}
      />
      <Modal5 
        isOpen={isModal5Open} 
        onClose={() => setIsModal5Open(false)}
        setHeight={setHeight}
        setWeight={setWeight}
        setSidCard={setSidCard}
        setLowerRank={setLowerRank}
        setMedicalHistory={setMedicalHistory}
        setMedicalHistoryDesc={setMedicalHistoryDesc}
        height={height}
        weight={weight}
        sidCard={sidCard}
        lowerRank={lowerRank}
        medicalHistory={medicalHistory}
        medicalHistoryDesc={medicalHistoryDesc}
      />
    </div>
  );
};

export default CandidateProfile;
