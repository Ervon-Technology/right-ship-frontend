import React, { useState } from 'react';

const StepOne = ({ nextStep, shipDatas, rankDatas, formData, handleInputChange }) => {
  const [isShipOpen, setIsShipOpen] = useState(true);
  const [isRankOpen, setIsRankOpen] = useState(true);

  const handleShipSelect = (ship) => {
    const updatedShips = formData.ships.includes(ship)
      ? formData.ships.filter((s) => s !== ship)
      : [...formData.ships, ship];
    handleInputChange('ships')(updatedShips);
  };

  const handleRankSelect = (rank) => {
    const updatedRanks = formData.ranks.includes(rank)
      ? formData.ranks.filter((r) => r !== rank)
      : [...formData.ranks, rank];
    handleInputChange('ranks')(updatedRanks);
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-md border-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h2>

      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsShipOpen(!isShipOpen)}
        >
          <h3 className="text-md font-medium text-gray-600">Ships</h3>
          <span className="text-lg text-gray-600">{isShipOpen ? '−' : '+'}</span>
        </div>
        {isShipOpen && (
          <div className="grid grid-cols-4 gap-2 mt-2 max-h-48 overflow-y-auto">
            {shipDatas.map((ship, index) => (
              <button
                key={index}
                className={`py-2 px-3 rounded border transition-colors ${
                  formData.ships.includes(ship)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
                }`}
                onClick={() => handleShipSelect(ship)}
              >
                {ship}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsRankOpen(!isRankOpen)}
        >
          <h3 className="text-md font-medium text-gray-600">Ranks</h3>
          <span className="text-lg text-gray-600">{isRankOpen ? '−' : '+'}</span>
        </div>
        {isRankOpen && (
          <div className="grid grid-cols-4 gap-2 mt-2 max-h-48 overflow-y-auto">
            {rankDatas.map((rank, index) => (
              <button
                key={index}
                className={`py-2 px-3 rounded border transition-colors ${
                  formData.ranks.includes(rank)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
                }`}
                onClick={() => handleRankSelect(rank)}
              >
                {rank}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={nextStep}
        disabled={formData.ships.length === 0 || formData.ranks.length === 0}
      >
        Next
      </button>
    </div>
  );
};

export default StepOne;
