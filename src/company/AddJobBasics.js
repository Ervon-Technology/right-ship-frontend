import React from 'react';
import Ship from '../company/Assets/Ship.png';

function AddJobBasics() {
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
            <div>
              <input type="checkbox" id="small" />
              <label htmlFor="small" className="ml-2 text-sm font-medium">Small</label>
            </div>
            <div>
              <input type="checkbox" id="tanker" />
              <label htmlFor="tanker" className="ml-2 text-sm font-medium">Tanker</label>
            </div>
            <div>
              <input type="checkbox" id="high" />
              <label htmlFor="high" className="ml-2 text-sm font-medium">High</label>
            </div>
            <div>
              <input type="checkbox" id="passengerShip" />
              <label htmlFor="passengerShip" className="ml-2 text-sm font-medium">Passenger Ship</label>
            </div>
            <div>
              <input type="checkbox" id="bulkCarrier" />
              <label htmlFor="bulkCarrier" className="ml-2 text-sm font-medium">Bulk Carrier</label>
            </div>
            <div>
              <input type="checkbox" id="fishingVessel" />
              <label htmlFor="fishingVessel" className="ml-2 text-sm font-medium">Fishing Vessel</label>
            </div>
          </div>
          <div className="space-y-4 p-4 border rounded-md w-full bg-white">
            <h2 className="text-xl font-semibold">Rank</h2>
            <div>
              <input type="checkbox" id="captain" />
              <label htmlFor="captain" className="ml-2 text-sm font-medium">Captain</label>
            </div>
            <div>
              <input type="checkbox" id="chiefOfficer" />
              <label htmlFor="chiefOfficer" className="ml-2 text-sm font-medium">Chief Officer</label>
            </div>
            <div>
              <input type="checkbox" id="secondOfficer" />
              <label htmlFor="secondOfficer" className="ml-2 text-sm font-medium">Second Officer</label>
            </div>
            <div>
              <input type="checkbox" id="thirdOfficer" />
              <label htmlFor="thirdOfficer" className="ml-2 text-sm font-medium">Third Officer</label>
            </div>
            <div>
              <input type="checkbox" id="chiefEngineer" />
              <label htmlFor="chiefEngineer" className="ml-2 text-sm font-medium">Chief Engineer</label>
            </div>
            <div>
              <input type="checkbox" id="secondEngineer" />
              <label htmlFor="secondEngineer" className="ml-2 text-sm font-medium">Second Engineer</label>
            </div>
            <div>
              <input type="checkbox" id="thirdEngineer" />
              <label htmlFor="thirdEngineer" className="ml-2 text-sm font-medium">Third Engineer</label>
            </div>
            <div>
              <input type="checkbox" id="fourthEngineer" />
              <label htmlFor="fourthEngineer" className="ml-2 text-sm font-medium">Fourth Engineer</label>
            </div>
            <div>
              <input type="checkbox" id="electricalOfficer" />
              <label htmlFor="electricalOfficer" className="ml-2 text-sm font-medium">Electrical Officer</label>
            </div>
            <div>
              <input type="checkbox" id="deckCadet" />
              <label htmlFor="deckCadet" className="ml-2 text-sm font-medium">Deck Cadet</label>
            </div>
            <div>
              <input type="checkbox" id="engineCadet" />
              <label htmlFor="engineCadet" className="ml-2 text-sm font-medium">Engine Cadet</label>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button className="bg-white hover:customBlue text-gray-700 font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">&larr;&nbsp; Back</button>
          <button className="bg-customBlue text-white font-bold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700">Continue &nbsp; &rarr;</button>
        </div>
      </div>
    </div>
  );
}

export default AddJobBasics;
