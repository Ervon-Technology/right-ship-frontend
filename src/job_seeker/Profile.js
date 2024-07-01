import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './Assets/Profile.jpg';

const Profile = () => {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/5 bg-cover bg-center" style={{ backgroundImage: `url(${ProfileImage})` }}>
        <div className="flex items-center justify-center h-full bg-blue-900 bg-opacity-20">
          <h1 className="text-white text-4xl font-bold">Let's reveal your <span className="text-blue-300">Face</span></h1>
        </div>
      </div>
      <div className="w-3/5 p-8 px-14 h-screen overflow-y-auto bg-white">
        <div className="flex items-center justify-center mb-8">
          {/* Stepper */}
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">1</div>
            <span className="ms-1 text-black">About me</span>
          </div>
          <div className="w-20 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">2</div>
            <span className="text-black">Basic Details</span>
          </div>
          <div className="w-20 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">3</div>
            <span className="mx-1 text-black">Experience</span>
          </div>
          <div className="w-20 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">4</div>
            <span className="mx-3 text-black">Resume</span>
          </div>
          <div className="w-20 h-0.5 bg-customBlue -mt-5"></div>
          <div className="flex items-center flex-col">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-customBlue3 border-4 border-customBlue text-white">5</div>
            <span className="mx-4 text-black">Profile</span>
          </div>
        </div>
        <div className='w-full border border-blue-200 -mt-6 mb-10 '></div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold">Add your photo to <br/><span className='font-bold'>Profile</span></h2>
        </div>
        <form className="text-center">
          <div className="mb-4">
            <div 
              className="relative flex items-center justify-center w-40 h-40 mx-auto mb-4 border-2 border-dashed rounded-full bg-gray-100 cursor-pointer" 
              onClick={handleFileClick}
            >
              {uploadedImage ? (
                <img src={uploadedImage} alt="Uploaded" className="absolute w-full h-full rounded-full object-cover" />
              ) : (
                <span className="absolute text-4xl text-gray-400">+</span>
              )}
            </div>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".jpg, .png"
            />
            <p 
              className="text-sm text-gray-600 cursor-pointer" 
              onClick={handleFileClick}
            >
              Upload .jpg & .png file only
            </p>
            <p className="text-xs text-red-500">max file size 10MB only</p>
          </div>
          <div className="absolute bottom-8 px-52">
            <div className="flex justify-center space-x-4">
              <Link to="/resume" className="bg-white text-customBlue font-bold border border-customBlue py-2 px-4 rounded w-48 text-center">BACK</Link>
              <Link to="/congratulations" className="bg-customBlue text-white font-bold py-2 px-4 rounded w-48 text-center">SAVE</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
