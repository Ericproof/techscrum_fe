import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import TermsOfService from './pages/TermsOfService/termsOfService';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
