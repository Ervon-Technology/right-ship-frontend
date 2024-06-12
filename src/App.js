import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './company/Home';
import Login from './company/Login';
import OtpVerify from './company/Otpverify';
import { Sidebar, SidebarItem } from './company/Sidebar';
import { Plus, BriefcaseBusiness, UsersRound, MessagesSquare } from 'lucide-react'
import TEAM from './company/Team';
import Footer from './company/Footer'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className='flex'>
        <Sidebar>
            <SidebarItem icon={<Plus size={20} />} text="Create New" />
            <SidebarItem icon={<BriefcaseBusiness size={20} />} text="Jobs" />
            <SidebarItem icon={<UsersRound size={20} />} text="Candidates" />
            <SidebarItem icon={<MessagesSquare size={20} />} text="Manage Users" />
            <SidebarItem icon={<MessagesSquare size={20} />} text="Support" />
        </Sidebar>
        </div>
        <Routes>
            <Route index element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="otpverify" element={<OtpVerify />} />
            <Route path="usermanagement" element={<TEAM/>}/>
            <Route path="footer" element={<Footer/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;