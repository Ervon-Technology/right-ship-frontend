import React, { useState } from 'react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div id="navbar">
      <nav className="bg-white px-4 py-2 border-b">
        <div className="container mx-auto flex justify-between">
          <div className="flex">
                <div className={`fixed inset-y-0 left-0 transform ${isOpen ? '-translate-x-full' : 'translate-x-0'} transition-transform duration-300 ease-in-out bg-customBlue w-64 p-4`}>
                  <div className="flex justify-between items-center mb-4">
                    <button onClick={toggleNavbar} className="text-white pt-3 px-4 flex text-sm">
                      <img width="25" height="25" className='me-2' src="https://img.icons8.com/ios-filled/50/FFFFFF/multiply.png" alt="multiply"/><h5 className='mt-0.5 text-sm'>{isOpen ? 'Collapse' : 'Collapse'}</h5>
                    </button>
                  </div>
                  <nav>
                    <ul>
                      <li className="text-white p-4 flex"><img width="24" height="24" className='me-2' src="https://img.icons8.com/windows/32/FFFFFF/plus-math.png" alt="plus-math"/><h5 className='mt-0.5 text-sm'>Create New</h5></li>
                      <li className="text-white p-4 flex"><img width="20" height="20" className='ms-0.5 me-2.5' src="https://img.icons8.com/external-sbts2018-outline-sbts2018/58/FFFFFF/external-jobs-social-media-basic-1-sbts2018-outline-sbts2018.png" alt="external-jobs-social-media-basic-1-sbts2018-outline-sbts2018"/><h5 className='mt-0.5 text-sm'>Jobs</h5></li>
                      <li className="text-white p-4 flex"><img width="22" height="22" className='me-2.5' src="https://img.icons8.com/external-solid-design-circle/64/FFFFFF/external-Candidates-job-services-solid-design-circle.png" alt="external-Candidates-job-services-solid-design-circle"/><h5 className='mt-0.5 text-sm'>Candidates</h5></li>
                      <li className="text-white p-4 flex"><img width="20" height="20" className='me-2.5' src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png" alt="chat--v1"/><h5 className='mt-0.5 text-sm'>Manage Users</h5></li>
                      <li className="text-white p-4 flex"><img width="20" height="20" className='me-2.5' src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png" alt="chat--v1"/><h5 className='mt-0.5 text-sm'>Suport</h5></li>
                      <li className="text-white p-4 flex"><img width="20" height="20" className='me-2.5' src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png" alt="chat--v1"/><h5 className='mt-0.5 text-sm'>Settings</h5></li>
                      <li className="text-white p-4 flex"><img width="20" height="20" className='me-2.5' src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/chat--v1.png" alt="chat--v1"/><h5 className='mt-0.5 text-sm'>Sign Out</h5></li>
                    </ul>
                  </nav>
                </div>
                <div className="flex-1 px-5 py-2">
                  <button onClick={toggleNavbar } className="text-black bg-none p-1 rounded burgerMenu">
                   {isOpen && <div className="space-y-1.5">
                      <div className="w-6 h-0.5 bg-black"></div>
                      <div className="w-6 h-0.5 bg-black"></div>
                      <div className="w-6 h-0.5 bg-black"></div>
                      </div>}
                  </button>
                </div>
          </div>
          <div className="nav-content flex">
            <div className="content1 m-3 px-3 flex text-sm font-bold"> <img width="25" height="25" className='mx-4' src="https://img.icons8.com/material-rounded/48/user-male-circle.png" alt="user-male-circle"/> <h5 className='mt-0.5'>Help & Support</h5></div>
            <div className="content2 m-3 px-3 flex text-sm font-bold"> <img width="25" height="25" className='mx-4' src="https://img.icons8.com/material-sharp/24/appointment-reminders--v1.png" alt="appointment-reminders--v1"/> <h5 className='mt-0.5'>Notification</h5><img width="25" height="10" className='ms-4' src="https://img.icons8.com/windows/32/expand-arrow--v1.png" alt="expand-arrow--v1"/></div>
            <div className="content3 m-3 px-3 flex text-sm font-bold"> <img width="25" height="25" className='mx-4' src="https://img.icons8.com/material-rounded/48/user-male-circle.png" alt="user-male-circle"/> <h5 className='mt-0.5'>User</h5><img width="25" height="10" className='ms-4' src="https://img.icons8.com/windows/32/expand-arrow--v1.png" alt="expand-arrow--v1"/></div>
          </div>
        </div>
      </nav>
      
    </div>
  );
};
 export default Navbar;