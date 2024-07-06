import React, { useState, useEffect } from 'react';

const Modal4 = ({ isOpen, onClose, resumeFile, setResumeFile }) => {
  const [localFile, setLocalFile] = useState(resumeFile);

  useEffect(() => {
    if (isOpen) {
      setLocalFile(resumeFile);
    }
  }, [isOpen, resumeFile]);

  const handleFileChange = (event) => {
    setLocalFile(event.target.files[0]);
  };

  const handleSave = () => {
    setResumeFile(localFile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-lg font-bold mb-4">Upload Resume</h2>
        <input type="file" onChange={handleFileChange} />
        {localFile && (
          <div className="mt-4">
            <p>{localFile.name}</p>
          </div>
        )}
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

export default Modal4;
