import React from 'react';
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Setting() {
  let navigate=useNavigate()

  function onMailEditClick() {
    navigate('/changemail')

    
  }
  function onNumberEditClick() {
    navigate('/changenumber')

    
  }
  

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center">Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Security Mail</p>
              <p className="text-sm text-gray-500">demo@gmail.com</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700">
            <FaRegEdit className='text-black' onClick={onMailEditClick} />
             
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Security Number</p>
              <p className="text-sm text-gray-500">91 8693895363</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700">
            <FaRegEdit className='text-black' onClick={onNumberEditClick}/>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
