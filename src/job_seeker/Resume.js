import React from 'react';
import { Link } from 'react-router-dom';

const Resume = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/mnt/data/Screenshot (360).png')" }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Let's see your <span className="text-blue-300">Resume</span></h1>
        </div>
      </div>
      <div className="w-1/2 p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-center mb-8">
            {/* Stepper */}
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">1</div>
              <span className="mx-2 text-blue-600">About me</span>
            </div>
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">2</div>
              <span className="mx-2 text-blue-600">Basic Details</span>
            </div>
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">3</div>
              <span className="mx-2 text-blue-600">Experience</span>
            </div>
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">4</div>
              <span className="mx-2 text-blue-600">Resume</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-600">5</div>
              <span className="mx-2 text-gray-600">Profile</span>
            </div>
          </div>
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">Upload your resume!</h2>
            <p className="text-green-500">Receive 2x job offers after uploading</p>
            <p className="text-gray-500">Takes less than a minute to upload</p>
          </div>
          <form className="text-center">
            <div className="mb-4">
              <div className="flex justify-center items-center border-2 border-dashed border-gray-300 p-8 rounded-lg">
                <div>
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 0 1 4-4h.3a5.6 5.6 0 0 1 0-8 5.5 5.5 0 0 1 11 0 5.6 5.6 0 0 1 0 8H17a4 4 0 0 1-4 4H7z"></path>
                  </svg>
                  <input type="file" className="hidden" />
                  <p className="mt-2 text-sm text-gray-500">Upload .pdf & .docx file only, max file size 5MB</p>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="text-center mt-4">
          <ul className="list-none">
            <li className="text-gray-700">Unlock jobs from top companies faster.</li>
            <li className="text-gray-700">Get jobs specifically suited for your rank.</li>
          </ul>
        </div>
        <div className="flex justify-between mt-8">
          <Link to="/experience" className="bg-gray-500 text-white py-2 px-4 rounded">BACK</Link>
          <Link to="/profile" className="bg-blue-600 text-white py-2 px-4 rounded">NEXT</Link>
        </div>
      </div>
    </div>
  );
};

export default Resume;
