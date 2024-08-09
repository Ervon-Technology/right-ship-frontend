import React, { useRef, useState } from 'react';
import './profile.css';
import { FaRegEdit } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";

function ProfileCard() {
  const [profileImage, setProfileImage] = useState("https://i2.pickpik.com/photos/711/14/431/smile-profile-face-male-preview.jpg");
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the selected file and set it as the profile image
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Profile of Akash Prajapati',
        text: 'Check out the profile of Akash Prajapati.',
        url: window.location.href,
      }).then(() => {
        console.log('Profile shared successfully');
      }).catch((error) => {
        console.error('Error sharing profile:', error);
      });
    } else {
      console.error('Share API not supported');
    }
  };

  return (
    <>
      <div className="bg-white p-7 border border-b-2">
        <div className="flex flex-col items-center ms-12 -mt-5">
          <div className='flex flex-row p-4'>
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 -ms-32 aspect-square rounded-full border-2 border-gray-300 profileImg border-customBlue"
            />
            <div className='-ms-6 mt-20 size-5 bg-customBlue rounded-lg border border-customBlue icon'>
              <FaRegEdit onClick={handleEditClick} className='cursor-pointer ms-1 mt-0.5 size-3.5 text-white' />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <h2 className="mt-1 text-lg ms-5 font-semibold">Nishikant Sahoo</h2>
          </div>
          <p className="text-gray-600 text-sm -mt-24 -ms-12  py-1">Present Rank</p>
          <button className="mt-4 px-2 py-1 bg-customBlue text-white rounded -ms-10 mt-0">
            <span className='text-sm'>Chief Officer</span>
          </button>
        </div>
        <CiShare2 className='border size-7 p-1 ms-60 -mt-7 me-80 cursor-pointer' onClick={handleShareClick} />
      </div>
    </>
  );
}

export default ProfileCard;
