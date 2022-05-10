import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import CookiePolicy from './pages/CookiePolicy/CookiePolicy';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
    </Routes>
  );
}

export default App;
