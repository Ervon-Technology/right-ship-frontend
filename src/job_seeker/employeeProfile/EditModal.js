import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const EditModal = ({ isOpen, title, children, onSave, onClose, isDropdown, options, editValue, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="mt-4">
          {isDropdown ? (
            <Select
              value={options.find(option => option.value === editValue)}
              onChange={handleChange}
              options={options}
              className="w-full"
            />
          ) : (
            children
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
          >
            Close
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
