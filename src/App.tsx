import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
<<<<<<< HEAD
<<<<<<< HEAD
import TermsOfService from './pages/TermsOfService';
||||||| merged common ancestors
=======
||||||| f2959c7
=======
import RefundPolicy from './pages/RefundPolicy/refundPolicy';
>>>>>>> 8746f006f91239a3b4f79049e0d3888276f3ca61
import PrivacyPolicy from './pages/PrivacyPolicy/privacyPolicy';
>>>>>>> f2959c785ed68e43e780186876932a4bf7be8f05
import './App.css';
import PrivacyStatment from './pages/PrivacyStatment/index';

function App() {
  return (
    <Routes>
<<<<<<< HEAD
<<<<<<< HEAD
      <Route path="/terms-of-service" element={<TermsOfService />} />
||||||| merged common ancestors
=======
      <Route path="/" element={<PrivacyStatment />} />
>>>>>>> f2959c785ed68e43e780186876932a4bf7be8f05
||||||| f2959c7
      <Route path="/" element={<PrivacyStatment />} />
=======
>>>>>>> 8746f006f91239a3b4f79049e0d3888276f3ca61
      <Route path="/" element={<Home />} />
      <Route path="/privacy-statement" element={<PrivacyStatment />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
export default App;
