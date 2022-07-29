import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthenticationRoute from './config/AuthenticationRoute';
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
import UserPage from './pages/UserPage/UserPage';
import UserMePage from './pages/SettingPage/UserMePage/UserMePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Access from './pages/Access/Access';
import Project from './pages/Project/Project';
import CreateProject from './pages/CreateProject/CreateProject';
import AccountSettings from './pages/AccountSetting/AccountSetting';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import BoardPage from './pages/BoardPage/BoardPage';
import About from './pages/AboutPage/AboutPage';
import './App.css';
import { UserProvider } from './context/UserInfoProvider';
import { ProjectProvider } from './context/ProjectProvider';
import VerifyPage from './pages/VerifyPage/VerifyPage';
import ProjectMembersPage from './pages/ProjectMembersPage/ProjectMembersPage';
import RolePage from './pages/RolePage/RolePage';
import UnauthorizePage from './pages/UnauthorizePage/UnauthorizePage';
import { RolesProvider } from './context/UserPermissionProvider';
import { TaskTypesProvider } from './context/TaskTypeProvider';
import ContactPage from './pages/ContactPage/ContactPage';

function App() {
  const shouldShowRegister =
    window.location.origin === 'https://www.techscrumapp.com' ||
    window.location.origin === 'http://localhost:3000';
  return (
    <UserProvider>
      <RolesProvider>
        <ProjectProvider>
          <TaskTypesProvider>
            <Routes>
              {shouldShowRegister && <Route path="/register" element={<Register />} />}
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/gdpr" element={<Gdpr />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-statement" element={<PrivacyStatement />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<About />} />
              <Route path="/errorPage" element={<ErrorPage />} />
              <Route path="" element={<AuthenticationRoute />}>
                <Route path="/settings/:projectId" element={<Setting />} />
                <Route path="/me" element={<UserMePage />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/access" element={<Access />} />
                <Route path="/projects/:projectId/board/:boardId" element={<BoardPage />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/create-projects" element={<CreateProject />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/projects/:projectId/members" element={<ProjectMembersPage />} />
                <Route path="/roles" element={<RolePage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Route>
              <Route path="/unauthorize" element={<UnauthorizePage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </TaskTypesProvider>
        </ProjectProvider>
      </RolesProvider>
    </UserProvider>
  );
}
export default App;
