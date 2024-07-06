import React, { useState, useEffect } from 'react';
import { SquarePen } from 'lucide-react';

const Modal1 = ({ 
  isOpen, 
  onClose, 
  lastShipType = '', 
  setLastShipType, 
  experience = [], 
  setExperience, 
  lastRank = '', 
  setLastRank, 
  appliedRank = '', 
  setAppliedRank 
}) => {
  const [isEditingLastShipType, setIsEditingLastShipType] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingLastRank, setIsEditingLastRank] = useState(false);
  const [isEditingAppliedRank, setIsEditingAppliedRank] = useState(false);

  const [localLastShipType, setLocalLastShipType] = useState(lastShipType);
  const [localExperience, setLocalExperience] = useState(experience);
  const [localLastRank, setLocalLastRank] = useState(lastRank);
  const [localAppliedRank, setLocalAppliedRank] = useState(appliedRank);

  useEffect(() => {
    setLocalLastShipType(lastShipType);
    setLocalExperience(experience);
    setLocalLastRank(lastRank);
    setLocalAppliedRank(appliedRank);
  }, [lastShipType, experience, lastRank, appliedRank]);

  const handleSave = () => {
    setLastShipType(localLastShipType);
    setExperience(localExperience);
    setLastRank(localLastRank);
    setAppliedRank(localAppliedRank);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p>Last ship type:</p>
            <div className="flex items-center space-x-2">
              {isEditingLastShipType ? 
                <input 
                  type="text" 
                  value={localLastShipType} 
                  onChange={(e) => setLocalLastShipType(e.target.value)}
                  className="border rounded p-1" 
                /> : <p><strong>{localLastShipType}</strong></p>}
              <button className="text-gray-600" onClick={() => setIsEditingLastShipType(!isEditingLastShipType)}>
                <SquarePen size={20} />
              </button>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <p>Experience on different types of ships:</p>
              <button className="text-gray-600" onClick={() => setIsEditingExperience(!isEditingExperience)}>
                <SquarePen size={20} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-2 border rounded mt-2">
              {localExperience.map((exp, index) => (
                <div key={index} className="flex justify-between items-center">
                  {isEditingExperience ? 
                    <input 
                      type="text" 
                      value={exp} 
                      onChange={(e) => {
                        const newExperience = [...localExperience];
                        newExperience[index] = e.target.value;
                        setLocalExperience(newExperience);
                      }}
                      className="border rounded p-1 w-full" 
                    /> : <p>{exp}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>Last rank:</p>
            <div className="flex items-center space-x-2">
              {isEditingLastRank ? 
                <input 
                  type="text" 
                  value={localLastRank} 
                  onChange={(e) => setLocalLastRank(e.target.value)}
                  className="border rounded p-1" 
                /> : <p><strong>{localLastRank}</strong></p>}
              <button className="text-gray-600" onClick={() => setIsEditingLastRank(!isEditingLastRank)}>
                <SquarePen size={20} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>Applied rank:</p>
            <div className="flex items-center space-x-2">
              {isEditingAppliedRank ? 
                <input 
                  type="text" 
                  value={localAppliedRank} 
                  onChange={(e) => setLocalAppliedRank(e.target.value)}
                  className="border rounded p-1" 
                /> : <p><strong>{localAppliedRank}</strong></p>}
              <button className="text-gray-600" onClick={() => setIsEditingAppliedRank(!isEditingAppliedRank)}>
                <SquarePen size={20} />
              </button>
            </div>
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal1;
