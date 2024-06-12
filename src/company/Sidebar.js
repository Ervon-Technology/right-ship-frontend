import React, { createContext, useContext, useState } from 'react';
import { Menu, X } from 'lucide-react';

const SidebarContext = createContext();

export const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div id="sidebar">
      <div className='h-screen'>
        <nav className="h-full flex flex-col bg-customBlue border-r shadow-sm ">
          <div className="mt-1 p-5 ml-0.5 flex justify-between items-center ">
            <button onClick={() => setExpanded((current) => !current)} className="text-black bg-none p-1 rounded flex">
              {expanded ? <X color='white' className='mt-1 ml-0.5' size={20}/> : <Menu color='white' className='' size-20/>}<span className={`overflow-hidden text-sm text-white transition-all ${expanded ? " ml-3 mt-1 " : " hidden "}`}>Collapse</span>
            </button>
          </div>
          <SidebarContext.Provider value={expanded}>
            <ul className='flex-1 px-3 '>{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </div>
    </div>
  );
};

export const SidebarItem = ({ icon, text }) => {
  const expanded = useContext(SidebarContext);
  return (
    <li className='relative flex items-center p-3 my-1 font-medium rounded-md cursor-pointer hover:bg-slate-500 transition duration-300 ease-in-out'>
      <span className='text-white my-1.5 ml-1'>{icon}</span>
      <span className={`overflow-hidden text-sm text-white transition-all ${expanded ? "w-52 ml-3 text-nowrap py-1" : " w-0 text-nowrap"}`}>{text}</span>
    </li>
  );
};

export default SidebarItem;