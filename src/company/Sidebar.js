import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Plus, BriefcaseBusiness, LayoutDashboard ,UsersRound, MessagesSquare, LogOut, Settings } from 'lucide-react';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    console.log("logout clicked!!");
    window.location.href = '/';
  }; 

  const SidebarItem = ({ icon, text, to }) => (
    <li className='relative flex items-center p-3 my-1 font-medium rounded-md cursor-pointer hover:bg-slate-500'>
      <Link to={to} className="flex items-center w-full">
        <span className='text-white my-1.5'>{icon}</span>
        <span className={`overflow-hidden text-sm text-white transition-all ${expanded ? "w-52 ml-3 text-nowrap py-1" : " w-0 text-nowrap"}`}>{text}</span>
      </Link>
    </li>
  );

  return (
    <div id="sidebar">
      <div className='h-screen sticky top-0 transition-all'>
        <nav className="h-full flex flex-col bg-customBlue border-r shadow-sm">
          <div className="p-5 pb-2 flex justify-between items-center">
            <button onClick={() => setExpanded((current) => !current)} className="text-black bg-none p-1 rounded flex">
              {expanded ? <X color='white' size={20} /> : <Menu color='white' size={20} />}
              <span className={`overflow-hidden text-sm text-white ${expanded ? " ml-3 " : " hidden "}`}>Collapse</span>
            </button>
          </div>
          <ul className='flex-1 px-3 transition duration-700'>
          <SidebarItem icon={<LayoutDashboard  size={20} />} text="Dashboard" to="/employeer-dashboard" />
            <SidebarItem icon={<Plus size={20} />} text="Create New" to="/add-job-basics" />
            <SidebarItem icon={<BriefcaseBusiness size={20} />} text="Jobs" to="/jobs" />
            <SidebarItem icon={<UsersRound size={20} />} text="Candidates" to="/candidates" />
            <SidebarItem icon={<MessagesSquare size={20} />} text="Manage Team" to="/manage-users" />
            <SidebarItem icon={<MessagesSquare size={20} />} text="Support" to="/support" />
            {/* <SidebarItem icon={<Settings size={20} />} text="Settings" to="/setting" /> */}
            <li className='relative flex items-center p-3 my-1 font-medium rounded-md cursor-pointer hover:bg-slate-500' onClick={handleLogout}>
              <LogOut color='white' size={20}/>
              <span className={`overflow-hidden text-sm text-white transition-all ${expanded ? "w-52 ml-3 text-nowrap py-1" : " w-0 text-nowrap"}`}>Sign Out</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
