import React from 'react';
import { CircleUserRound, Bell, ChevronDown } from 'lucide-react';
const Header = () => {
  return (
    <header className="bg-white border-b py-5 px-3 sticky top-0">
      <nav className="flex flex-row-reverse items-center text-sm font-bold">
        <div className="flex space-x-10">
          <a href="#help-support" className="text-black flex "> <CircleUserRound size={20}/>&nbsp; Help & Support &nbsp;<ChevronDown /></a>
          <a href="#notification" className="text-black flex"> <Bell size={20}/>&nbsp; Notification &nbsp;<ChevronDown /></a>
          <a href="#user" className="text-black flex"><CircleUserRound size={20}/>&nbsp; User &nbsp;<ChevronDown /></a>
        </div>
          
      </nav>
    </header>
  );
};

export default Header;
