import React, { useState, useEffect } from 'react';

const Modal5 = ({ isOpen, onClose, height, setHeight, weight, setWeight, sidCard, setSidCard, lowerRank, setLowerRank, medicalHistory, setMedicalHistory, medicalHistoryDesc, setMedicalHistoryDesc }) => {
  const [localHeight, setLocalHeight] = useState(height);
  const [localWeight, setLocalWeight] = useState(weight);
  const [localSidCard, setLocalSidCard] = useState(sidCard);
  const [localLowerRank, setLocalLowerRank] = useState(lowerRank);
  const [localMedicalHistory, setLocalMedicalHistory] = useState(medicalHistory);
  const [localMedicalHistoryDesc, setLocalMedicalHistoryDesc] = useState(medicalHistoryDesc);

  useEffect(() => {
    setLocalHeight(height);
    setLocalWeight(weight);
    setLocalSidCard(sidCard);
    setLocalLowerRank(lowerRank);
    setLocalMedicalHistory(medicalHistory);
    setLocalMedicalHistoryDesc(medicalHistoryDesc);
  }, [height, weight, sidCard, lowerRank, medicalHistory, medicalHistoryDesc]);

  const handleSave = () => {
    setHeight(localHeight);
    setWeight(localWeight);
    setSidCard(localSidCard);
    setLowerRank(localLowerRank);
    setMedicalHistory(localMedicalHistory);
    setMedicalHistoryDesc(localMedicalHistoryDesc);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
        
        <div className="space-y-4">
          <div>
            <label>Height (in CM):</label>
            <input
              type="number"
              value={localHeight}
              onChange={(e) => setLocalHeight(e.target.value)}
              className="border rounded p-1 w-full"
            />
          </div>
          <div>
            <label>Weight (in KG):</label>
            <input
              type="number"
              value={localWeight}
              onChange={(e) => setLocalWeight(e.target.value)}
              className="border rounded p-1 w-full"
            />
          </div>
          <div>
            <label>BMI:</label>
            <p>{(localWeight / ((localHeight / 100) ** 2)).toFixed(1)}</p>
          </div>
          <div>
            <label>SID Card:</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${localSidCard ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setLocalSidCard(true)}
              >
                YES
              </button>
              <button
                className={`px-4 py-2 rounded ${!localSidCard ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setLocalSidCard(false)}
              >
                NO
              </button>
            </div>
          </div>
          <div>
            <label>Willing to accept lower rank:</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${localLowerRank ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setLocalLowerRank(true)}
              >
                YES
              </button>
              <button
                className={`px-4 py-2 rounded ${!localLowerRank ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setLocalLowerRank(false)}
              >
                NO
              </button>
            </div>
          </div>
          <div>
            <label>Medical History:</label>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${localMedicalHistory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setLocalMedicalHistory(true)}
              >
                YES
              </button>
              <button
                className={`px-4 py-2 rounded ${!localMedicalHistory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setLocalMedicalHistory(false)}
              >
                NO
              </button>
            </div>
          </div>
          <div>
            <label>Description of medical history:</label>
            <textarea
              value={localMedicalHistoryDesc}
              onChange={(e) => setLocalMedicalHistoryDesc(e.target.value)}
              className="border rounded p-1 w-full"
            />
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal5;
