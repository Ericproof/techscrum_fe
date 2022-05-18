import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import RefundPolicy from './pages/RefundPolicy/refundPolicy';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="RefundPolicy" element={<RefundPolicy />} />
    </Routes>
  );
}

export default App;
