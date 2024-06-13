import React from 'react';
import { CircleUserRound, Bell } from 'lucide-react';
const Header = () => {
  return (
    <header className="bg-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="#help-support" className="text-black"><CircleUserRound />          Help & Support</a>
          <a href="#notification" className="text-black"><Bell />Notification</a>
        </div>
        <div>
          <a href="#user" className="text-black">User</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
