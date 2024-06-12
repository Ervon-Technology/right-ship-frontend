import React from 'react';
import { Sidebar, SidebarItem } from './company/Sidebar';
import { Plus, BriefcaseBusiness, UsersRound, MessagesSquare } from 'lucide-react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Empteam from './company/Manageemp';
const App = () => {
  return (
    <div className='flex'>
      <Sidebar>
          <SidebarItem icon={<Plus size={20} />} text="Create New" />
          <SidebarItem icon={<BriefcaseBusiness size={20} />} text="Jobs" />
          <SidebarItem icon={<UsersRound size={20} />} text="Candidates" />
          <SidebarItem icon={<MessagesSquare size={20} />} text="Manage Users" />
          <SidebarItem icon={<MessagesSquare size={20} />} text="Support" />
      </Sidebar>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Empteam />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;