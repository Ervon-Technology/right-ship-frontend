import React, { useState } from 'react';

const Profile = () => {
  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); // Placeholder image
  const [employeeId, setEmployeeId] = useState('669b88908c9761528b0cfbb6');
  const [employeeName, setEmployeeName] = useState('Aniket');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Update the profile image with the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEmployeeUpdate = async () => {
    const employeeData = {
      employee_id: employeeId,
      name: employeeName,
    };

    try {
      const response = await fetch('https://api.rightships.com/employee/update', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Employee update response:', responseData);
        // After a successful employee update, call the upload function
        handleUpload();
      } else {
        setUploadMessage('Failed to update employee details');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setUploadMessage('An error occurred while updating employee details');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://api.rightships.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setUploadMessage(responseData.message);
        console.log('File URL:', responseData.file_url); // Handle file URL if needed
      } else {
        setUploadMessage('Failed to upload the file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadMessage('An error occurred during file upload');
    }
  };

  const handleSubmit = () => {
    // First update employee details, then upload file
    handleEmployeeUpdate();
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md w-80 mx-auto mt-10">
      <div className="relative">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
        />
        <label
          htmlFor="fileInput"
          className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536M9 16.5v.75a3.75 3.75 0 003.75 3.75h1.5a3.75 3.75 0 003.75-3.75v-1.5M14.25 6.75l3-3M4.5 19.5l7.5-7.5 3 3 7.5-7.5M12 19.5h7.5V12"
            />
          </svg>
        </label>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">{employeeName}</h2>
      <p className="text-gray-500">Software Developer</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        onClick={handleSubmit}
      >
        Update Profile and Upload
      </button>
      {uploadMessage && <p className="mt-4 text-green-500">{uploadMessage}</p>}
    </div>
  );
};

export default Profile;
