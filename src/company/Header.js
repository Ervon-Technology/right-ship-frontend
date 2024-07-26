import React from 'react';
import { CircleUserRound, Bell, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className="bg-white border-b py-5 px-8 sticky top-0">
      <nav className="flex flex-row-reverse items-center text-sm font-bold">
        <div className="flex space-x-16">
          <a href="/support" className="text-black flex "> <CircleUserRound size={20}/>&nbsp; Help & Support &nbsp;</a>
          <a href="#notification" className="text-black flex "> <Bell size={20}/>&nbsp; Notification &nbsp;</a>
          <Link to="/edit-job-details">
            <a href="#user" className="text-black flex pe-8"><CircleUserRound size={20}/>{localStorage.getItem('phone')}</a>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
