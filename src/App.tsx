import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import Home from "./pages/Home/Home";
import Gdpr from './pages/Gdpr/Gdpr';
import './App.css';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/Gdpr" element={<Gdpr />} />
    </Routes>
  );
}

export default App;
