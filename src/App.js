import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './company/Home';
import Login from './company/Login';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App;