import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Setting from './pages/Setting/Setting';
import Gdpr from './pages/GDPR/GDPR';
import CookiePolicy from './pages/CookiePolicy/CookiePolicy';
import TermsOfService from './pages/TermsOfService/TermsOfServices';
import RefundPolicy from './pages/RefundPolicy/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import PrivacyStatement from './pages/PrivacyStatement/PrivacyStatement';
import UserPage from './pages/SettingPage/UserPage/UserPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Access from './pages/Access/Access';
import Project from './pages/Project/Project';
import CreateProject from './pages/CreateProject/CreateProject';
import './App.css';
import Nav from './components/BoardNavigation/Nav';
import BoardCard from './components/BoardCard/BoardCard';
import Board from './pages/Board';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/gdpr" element={<Gdpr />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-statement" element={<PrivacyStatement />} />
      <Route path="/refund-policy" element={<RefundPolicy />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/user-page" element={<UserPage />} />
      <Route path="/access" element={<Access />} />
      <Route path="/nav/*" element={<Nav />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/create-projects" element={<CreateProject />} />
      <Route path="/board" element={<Board />} />
      <Route path="/card" element={<BoardCard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default App;
