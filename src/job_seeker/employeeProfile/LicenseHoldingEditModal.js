import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const LicenseHoldingEditModal = ({ isOpen, licenseHolding, copOptions, cocOptions, watchKeepingOptions, sidOptions, usVisaOptions, onSave, onClose }) => {
  const [cop, setCop] = useState(licenseHolding.cop);
  const [coc, setCoc] = useState(licenseHolding.coc);
  const [watchkeeping, setWatchkeeping] = useState(licenseHolding.watchkeeping);
  const [sid, setSid] = useState(licenseHolding.sid);
  const [usVisa, setUsVisa] = useState(licenseHolding.usVisa);

  const handleSave = () => {
    const updatedLicenseHolding = {
      cop,
      coc,
      watchkeeping,
      sid,
      usVisa,
    };
    onSave(updatedLicenseHolding);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold">Edit License Holding</h3>
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">COP</label>
            <Select
              value={copOptions.find(option => option.value === cop)}
              onChange={(selectedOption) => setCop(selectedOption.value)}
              options={copOptions}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">COC</label>
            <Select
              value={cocOptions.find(option => option.value === coc)}
              onChange={(selectedOption) => setCoc(selectedOption.value)}
              options={cocOptions}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Watchkeeping</label>
            <Select
              value={watchKeepingOptions.find(option => option.value === watchkeeping)}
              onChange={(selectedOption) => setWatchkeeping(selectedOption.value)}
              options={watchKeepingOptions}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">SID</label>
            <Select
              value={sidOptions.find(option => option.value === sid)}
              onChange={(selectedOption) => setSid(selectedOption.value)}
              options={sidOptions}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">US Visa</label>
            <Select
              value={usVisaOptions.find(option => option.value === usVisa)}
              onChange={(selectedOption) => setUsVisa(selectedOption.value)}
              options={usVisaOptions}
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LicenseHoldingEditModal;
