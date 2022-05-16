import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivacyStatment from './pages/PrivacyStatment/PrivacyStatment';

function App() {
  // console.log('dssf')
  return (
    <Routes>
      <Route path="/" element={<PrivacyStatment />} />
    </Routes>
  );
}
export default App;
