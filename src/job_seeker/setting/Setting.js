import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import ChangeMail from './ChangeMail';
import ChangeNumber from './ChangeNumber';
import { useDispatch, useSelector } from 'react-redux';

Modal.setAppElement('#root'); // Set the app root element for accessibility

function Setting() {
  const contactInfo = useSelector((state) => state.auth.user.mobile_no);
  let navigate=useNavigate()
  // const state = useSelector((state) => state);
  // console.log(state);
  
  console.log(contactInfo)
  // const stateEmail = useSelector((state) => state.employee.data.email);


  // const employeeId = useSelector((state) => state.employee.employee_id);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);
  const [semail, setSemail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  // const state = useSelector((state) => state); 

  const openMailModal = () => setIsMailModalOpen(true);
  const closeMailModal = () => setIsMailModalOpen(false);

  const openNumberModal = () => setIsNumberModalOpen(true);
  const closeNumberModal = () => setIsNumberModalOpen(false);



  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    // Fetch user details from API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('https://api.rightships.com/user/details', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mobile_no: contactInfo,
            user_type: 'employee',
          }),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log(result); // Check the structure here
        console.log('Fetched data:', result);
        const email = result.data?.email; // Use optional chaining to handle cases where data might be undefined
        console.log('Email:', email);
        // console.log(stateEmail)
        setMobileNumber(contactInfo);
        setSemail(email);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    
    if (contactInfo) { // Ensure contactInfo is available before fetching
      fetchUserDetails();
    }
  }, []); // Dependency array includes contactInfo

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 -mt-24 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Security Mail</p>
              <p className="text-sm text-gray-500">{semail}</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700" onClick={openMailModal}>
              <FaRegEdit className='text-black' />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
            <div>
              <p className="text-sm font-medium text-gray-700">Security Number</p>
              <p className="text-sm text-gray-500">{contactInfo}</p>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700" onClick={openNumberModal}>
              <FaRegEdit className='text-black' />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/">
            <button onClick={handleLogout} className="px-4 py-2 font-medium text-white bg-red-500 rounded-sm hover:bg-red-600">
              Logout
            </button>
          </Link>
        </div>
      </div>

      {/* Modal for ChangeMail */}
      <Modal
        isOpen={isMailModalOpen}
        onRequestClose={closeMailModal}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <ChangeMail />
        <button className="mt-4 w-full px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600" onClick={closeMailModal}>
          Close
        </button>
      </Modal>

      {/* Modal for ChangeNumber */}
      <Modal
        isOpen={isNumberModalOpen}
        onRequestClose={closeNumberModal}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-md mx-auto my-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <ChangeNumber />
        <button className="mt-4 w-full px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600" onClick={closeNumberModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default Setting;
