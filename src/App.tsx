import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthenticationRoute from './config/AuthenticationRoute';
import HomePage from './pages/HomePage/HomePage';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Setting from './pages/Setting/Setting';
import Gdpr from './pages/GDPR/GDPR';
import CookiePolicy from './pages/CookiePolicy/CookiePolicy';
import TermsOfServicePage from './pages/TermsOfServicePage/TermsOfServicesPage';
import RefundPolicyPage from './pages/RefundPolicyPage/RefundPolicyPage';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import PrivacyStatement from './pages/PrivacyStatement/PrivacyStatement';
import UserPage from './pages/UserPage/UserPage';
import UserMePage from './pages/SettingPage/UserMePage/UserMePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AccessPage from './pages/AccessPage/AccessPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import CreateProject from './pages/CreateProject/CreateProject';
import AccountSettingsPage from './pages/AccountSettingPage/AccountSettingPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import BoardPage from './pages/BoardPage/BoardPage';
import AboutPage from './pages/AboutPage/AboutPage';
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
              <Route path="/" element={<HomePage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/gdpr" element={<Gdpr />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/privacy-statement" element={<PrivacyStatement />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/errorPage" element={<ErrorPage />} />
              <Route path="" element={<AuthenticationRoute />}>
                <Route path="/settings/:projectId" element={<Setting />} />
                <Route path="/me" element={<UserMePage />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/access" element={<AccessPage />} />
                <Route path="/projects/:projectId/board/:boardId" element={<BoardPage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/create-projects" element={<CreateProject />} />
                <Route path="/account-settings" element={<AccountSettingsPage />} />
                <Route path="/projects/:projectId/members" element={<ProjectMembersPage />} />
                <Route path="/roles" element={<RolePage />} />
              </Route>
              <Route path="/unauthorize" element={<UnauthorizePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </TaskTypesProvider>
        </ProjectProvider>
      </RolesProvider>
    </UserProvider>
  );
}
export default App;
