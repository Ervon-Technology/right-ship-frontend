import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Ship from '../company/Assets/Ship.png';
import { addShipType, removeShipType, addRank, removeRank } from './Slice/Empslice';

const AddJobBasics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedShipTypes, setSelectedShipTypes] = useState([]);
  const [selectedRanks, setSelectedRanks] = useState([]);

  const handleShipTypeChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedShipTypes([...selectedShipTypes, id]);
      dispatch(addShipType(id));
    } else {
      setSelectedShipTypes(selectedShipTypes.filter((type) => type !== id));
      dispatch(removeShipType(id));
    }
  };

  const handleRankChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedRanks([...selectedRanks, id]);
      dispatch(addRank(id));
    } else {
      setSelectedRanks(selectedRanks.filter((rank) => rank !== id));
      dispatch(removeRank(id));
    }
  };

  const handleContinue = () => {
    if (selectedShipTypes.length === 0 || selectedRanks.length === 0) {
      alert('Please select at least one item from both Ship Types and Ranks.');
    } else {
      navigate('/add-pay-and-benefits');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen my-6">
      <div className="py-10 bg-customSky1 flex justify-around items-center w-full max-w-4xl px-6">
        <h1 className="text-3xl font-bold">Add Job Basics</h1>
        <img src={Ship} alt="ship" height={120} width={120} />
      </div>
      <div className="bg-customSky2 shadow-md rounded-md p-20 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full">
          <div className="space-y-4 p-4 border rounded-md w-full bg-white">
            <h2 className="text-xl font-semibold">Ship Type</h2>
            {["small", "tanker", "high", "passengerShip", "bulkCarrier", "fishingVessel"].map((type) => (
              <div key={type}>
                <input type="checkbox" id={type} onChange={handleShipTypeChange} />
                <label htmlFor={type} className="ml-2 text-sm font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</label>
              </div>
            ))}
          </div>
          <div className="space-y-4 p-4 border rounded-md w-full bg-white">
            <h2 className="text-xl font-semibold">Rank</h2>
            {["captain", "chiefOfficer", "secondOfficer", "thirdOfficer", "chiefEngineer", "secondEngineer", "thirdEngineer", "fourthEngineer", "electricalOfficer", "deckCadet", "engineCadet"].map((rank) => (
              <div key={rank}>
                <input type="checkbox" id={rank} onChange={handleRankChange} />
                <label htmlFor={rank} className="ml-2 text-sm font-medium">{rank.charAt(0).toUpperCase() + rank.slice(1)}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <Link to="/emp" className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            &larr; Back
          </Link>
          <div onClick={handleContinue} className="bg-customBlue hover:bg-customBlue2 text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">
            Continue &rarr;
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddJobBasics;
