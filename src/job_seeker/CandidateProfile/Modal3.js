import React, { useState, useEffect } from 'react';

const Modal3 = ({ isOpen, onClose, vaccinationStatus, setVaccinationStatus }) => {
  const [localStatus, setLocalStatus] = useState({ ...vaccinationStatus });

  useEffect(() => {
    if (isOpen) {
      setLocalStatus({ ...vaccinationStatus });
    }
  }, [isOpen, vaccinationStatus]);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setLocalStatus((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    setVaccinationStatus(localStatus);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-lg font-bold mb-4">COVID-19 Vaccination</h2>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              name="firstDose"
              checked={localStatus.firstDose}
              onChange={handleChange}
            />{' '}
            1st Dose
          </label>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              name="secondDose"
              checked={localStatus.secondDose}
              onChange={handleChange}
            />{' '}
            2nd Dose
          </label>
        </div>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              name="boosterDose"
              checked={localStatus.boosterDose}
              onChange={handleChange}
            />{' '}
            Booster Dose
          </label>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal3;
