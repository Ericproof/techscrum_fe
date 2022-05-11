import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/Privacy_Policy/Privacy_policy';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;
