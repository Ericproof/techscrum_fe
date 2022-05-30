import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Gdpr from './pages/GDPR/GDPR';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy/refundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy/privacyPolicy';
import PrivacyStatment from './pages/PrivacyStatment/index';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gdpr" element={<Gdpr />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-statement" element={<PrivacyStatment />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}
export default App;
