import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResumeImage from './Assets/Resume.jpg';
import File from './Assets/File img.png'
const Resume = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log('File uploaded:', selectedFile);
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/5 h-screen bg-cover bg-center" style={{ backgroundImage: `url(${ResumeImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-20">
          <h1 className="text-white text-4xl font-bold">Let's see your <span className="text-blue-300">Resume</span></h1>
        </div>
      </div>
      <div className="w-3/5 p-8 h-screen overflow-y-auto bg-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center mb-8">
            {/* Stepper */}
            <div className="flex items-center flex-col">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">1</div>
              <span className="ms-1 text-black">About me</span>
            </div>
            <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
            <div className="flex items-center flex-col">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">2</div>
              <span className="text-black">Basic Details</span>
            </div>
            <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
            <div className="flex items-center flex-col">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">3</div>
              <span className="mx-1 text-black">Experience</span>
            </div>
            <div className="w-20 h-0.5 -mt-5 bg-customBlue"></div>
            <div className="flex items-center flex-col">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">4</div>
              <span className="mx-3 text-black">Resume</span>
            </div>
            <div className="w-20 h-0.5 -mt-5 bg-gray-300"></div>
            <div className="flex items-center flex-col">
              <div className="w-10 h-10 flex items-center justify-center rounded-full border-4 border-customBlue"></div>
              <span className="mx-4 text-black">Profile</span>
            </div>
          </div>
          <div className='w-full border border-blue-200 -mt-6 mb-10 '></div>
          <div className="text-center mb-4 px-16">
            <h2 className="text-2xl font-semibold">Upload your resume!</h2>
            <p className="text-green-500 text-md">Receive 2x job offers after uploading</p>
            <p><span className="bg-blue-100 px-2 text-black">Takes less than a minute to upload</span></p>
          </div>
          <form className="text-center px-16">
            <div className="mb-4">
              <div className="flex justify-center items-center border-2 border-dashed border-gray-300 p-8 rounded-lg">
                <div>
                  <img className='ms-16' src={File} alt="file" height={180} width={180} />
                  <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
                  <label htmlFor="file-upload" className="cursor-pointer mt-2 text-sm text-gray-500">Upload .pdf & .docx file only, max file size 5MB</label><br/>
                  <label htmlFor="file-upload" className="cursor-pointer mt-2 text-sm text-red-600">max file size 5MB only</label>
                </div>
              </div>
              {file && (
                <div className="mt-4">
                  <p className="text-gray-700">Selected file: {file.name}</p>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
          <ul className="list-none">
            <li className="text-gray-700 font-medium">Unlock jobs from top companies faster.</li>
            <li className="text-gray-700 font-medium">Get jobs specifically suited for your rank.</li>
          </ul>
        </div>
        <div className="flex justify-center space-x-4">
          <Link to="/experience" className="bg-white text-customBlue font-bold border border-customBlue py-2 px-4 rounded w-48 text-center">BACK</Link>
          <Link to="/profile" className="bg-customBlue text-white font-bold py-2 px-4 rounded w-48 text-center">NEXT</Link>
        </div>
      </div>
    </div>
  );
};

export default Resume;
