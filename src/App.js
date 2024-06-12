import React from 'react';
import { Sidebar, SidebarItem } from './company/Sidebar';
import { Plus, BriefcaseBusiness, UsersRound, MessagesSquare } from 'lucide-react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import Company from './company/index';
import Empteam from './company/Manageemp';
import Footer from './company/Footer';
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
      <Footer/>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="otpverify" element={<OtpVerify />} />
          <Route path="/cmp" element={<Company/>}/>
          <Route path="/emp" element={<Empteam/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;