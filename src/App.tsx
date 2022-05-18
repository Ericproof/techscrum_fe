import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PrivacyPolicy from './pages/PrivacyPolicy/privacyPolicy';
import './App.css';
import PrivacyStatment from './pages/PrivacyStatment/index';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivacyStatment />} />
      <Route path="/" element={<Home />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
export default App;
