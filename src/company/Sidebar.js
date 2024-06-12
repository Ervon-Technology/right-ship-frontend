import React, { useState } from 'react';
import { Menu, X, Plus, BriefcaseBusiness, UsersRound, MessagesSquare } from 'lucide-react';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const SidebarItem = ({ icon, text }) => (
    <li className='relative flex items-center p-3 my-1 font-medium rounded-md cursor-pointer hover:bg-slate-500'>
      <span className='text-white my-1.5'>{icon}</span>
      <span className={`overflow-hidden text-sm text-white transition-all ${expanded ? "w-52 ml-3 text-nowrap py-1" : " w-0 text-nowrap"}`}>{text}</span>
    </li>
  );

  return (
    <div id="sidebar">
      <div className='h-screen'>
        <nav className="h-full flex flex-col bg-customBlue border-r shadow-sm">
          <div className="p-5 pb-2 flex justify-between items-center">
            <button onClick={() => setExpanded((current) => !current)} className="text-black bg-none p-1 rounded flex">
              {expanded ? <X color='white' size={20} /> : <Menu color='white' size={20} />}
              <span className={`overflow-hidden text-sm text-white transition-all ${expanded ? " ml-3 " : " hidden "}`}>Collapse</span>
            </button>
          </div>
          <ul className='flex-1 px-3'>
            <SidebarItem icon={<Plus size={20} />} text="Create New" />
            <SidebarItem icon={<BriefcaseBusiness size={20} />} text="Jobs" />
            <SidebarItem icon={<UsersRound size={20} />} text="Candidates" />
            <SidebarItem icon={<MessagesSquare size={20} />} text="Manage Users" />
            <SidebarItem icon={<MessagesSquare size={20} />} text="Support" />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
