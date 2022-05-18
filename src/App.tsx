import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import PrivacyStatment from './pages/PrivacyStatment/privacyStatment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivacyStatment />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
export default App;
