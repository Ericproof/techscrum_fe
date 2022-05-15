import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Refund from './pages/Refund/Refund';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Refund" element={<Refund />} />
    </Routes>
  );
}

export default App;
