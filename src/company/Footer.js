import React from 'react';

const Footer = () => {
  return (
    <div id='footer'>
        <footer className="bg-white py-3 px-4 border-t bottom-0">
          <p className="p-4 text-sm text-black font-medium">&thinsp;© 2024 RightShips</p>
          <nav className="space-x-4 px-5">
            <a href="#" className="text-customGrey">
              <span className='underline underline-offset-4 text-sm'>Cookies, Privacy and terms</span>
            </a>
            <a href="#" className="text-customGrey">
              <span className='font-extrabold '>-</span> &nbsp; <span className='underline underline-offset-4 text-sm'>Privacy Centre</span>
            </a>
            <a href="#" className="text-customGrey">
            <span className='font-extrabold '>-</span> &nbsp; <span className='underline underline-offset-4 text-sm'>Security</span>
            </a>
            <a href="#" className="text-customGrey">
            <span className='font-extrabold '>-</span> &nbsp; <span className='underline underline-offset-4 text-sm'> Billing</span>
            </a>
            <a href="#" className="text-customGrey">
            <span className='font-extrabold '>-</span> &ensp; <span className='underline underline-offset-4 text-sm'> Contact</span>
            </a>
          </nav>
        </footer>
    </div>
  );
};

export default Footer;
