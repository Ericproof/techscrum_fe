import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
<<<<<<< HEAD
import TermsOfService from './pages/TermsOfService';
||||||| merged common ancestors
=======
import PrivacyPolicy from './pages/PrivacyPolicy/privacyPolicy';
>>>>>>> f2959c785ed68e43e780186876932a4bf7be8f05
import './App.css';
import PrivacyStatment from './pages/PrivacyStatment/index';

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/terms-of-service" element={<TermsOfService />} />
||||||| merged common ancestors
=======
      <Route path="/" element={<PrivacyStatment />} />
>>>>>>> f2959c785ed68e43e780186876932a4bf7be8f05
      <Route path="/" element={<Home />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
export default App;
