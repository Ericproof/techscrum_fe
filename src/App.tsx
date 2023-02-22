import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage/HomePage';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import Setting from './pages/Setting/Setting';
import GdprPage from './pages/GDPRPage/GDPRPage';
import CookiePolicyPage from './pages/CookiePolicyPage/CookiePolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage/TermsOfServicesPage';
import RefundPolicyPage from './pages/RefundPolicyPage/RefundPolicyPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage/PrivacyPolicyPage';
import PrivacyStatementPage from './pages/PrivacyStatementPage/PrivacyStatementPage';
import UserPage from './pages/UserPage/UserPage';
import UserMePage from './pages/SettingPage/UserMePage/UserMePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import AccessPage from './pages/AccessPage/AccessPage';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import CreateProject from './pages/CreateProject/CreateProject';
import AccountSettingsPage from './pages/AccountSettingPage/AccountSettingPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import BoardPage from './pages/BoardPage/BoardPage';
import AboutPage from './pages/AboutPage/AboutPage';
import CareerPage from './pages/CareerPage/CareerPage';
import KanbanBoardPage from './pages/KanbanBoardPage/KanbanBoardPage';
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
import FAQPage from './pages/FAQPage/FAQPage';
import AuthenticationRoute from './routes/AuthenticationRoute';
import SecurityPage from './pages/SecurityPage/SecurityPage';
import AdminPage from './pages/AdminPage/AdminPage';
import AboutPageT2 from './pages/AboutPageT2/AboutPageT2';
import AboutPageT3 from './pages/AboutPageT3/AboutPageT3';
import { getDomains } from './api/domain/domain';
import BacklogPage from './pages/BacklogPage/BacklogPage';
import ShortcutPage from './pages/ShortcutPage/ShortcutPage';
import DashboardLayout from './lib/Layout/DashboardLayout/DashboardLayout';
import PricePage from './pages/PricePage/PricePage';
import ReportPage from './pages/ReportPage/ReportPage';
import SupportCenterPage from './pages/SupportCenterPage/SupportCenterPage';

function App() {
  const [showPages, setShowPages] = useState(null);

  useEffect(() => {
    const getD = async () => {
      const res = await getDomains();
      setShowPages(res.data);
    };
    getD();
  }, []);

  const getHomePage = () => {
    if (showPages === null) {
      return <></>;
    }
    if (!showPages) {
      return <LoginPage />;
    }
    return <HomePage />;
  };

  return (
    <>
      <ToastContainer style={{ width: '400px' }} />
      <UserProvider>
        <RolesProvider>
          <ProjectProvider>
            <TaskTypesProvider>
              <Routes>
                {showPages && <Route path="/register" element={<RegisterPage />} />}
                {showPages && <Route path="/admin" element={<AdminPage />} />}
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={getHomePage()} />
                <Route path="/login/reset-password" element={<ResetPasswordPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/login/change-password" element={<ChangePasswordPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/gdpr" element={<GdprPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/privacy-statement" element={<PrivacyStatementPage />} />
                <Route path="/refund-policy" element={<RefundPolicyPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/about-t2" element={<AboutPageT2 />} />
                <Route path="/about-t3" element={<AboutPageT3 />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareerPage />} />
                <Route path="/security-page" element={<SecurityPage />} />
                <Route path="/errorPage" element={<ErrorPage />} />
                <Route path="" element={<AuthenticationRoute />}>
                  <Route path="/projects/:projectId/" element={<DashboardLayout />}>
                    <Route path="board/:boardId" element={<BoardPage />} />
                    <Route path="board/:boardId/backlog" element={<BacklogPage />} />
                    <Route path="shortcuts" element={<ShortcutPage />} />
                  </Route>
                  <Route path="/settings/:projectId" element={<Setting />} />
                  <Route path="/me" element={<UserMePage />} />
                  <Route path="/user/:id" element={<UserPage />} />
                  <Route path="/access" element={<AccessPage />} />
                  <Route path="/projects" element={<ProjectPage />} />
                  <Route path="/create-projects" element={<CreateProject />} />
                  <Route path="/account-settings" element={<AccountSettingsPage />} />
                  <Route
                    path="/account-settings/change-password"
                    element={<AccountSettingsPage />}
                  />
                  <Route
                    path="/account-settings/delete-account"
                    element={<AccountSettingsPage />}
                  />
                  <Route path="/projects/:projectId/members" element={<ProjectMembersPage />} />
                  <Route path="/roles" element={<RolePage />} />
                </Route>
                <Route path="/unauthorize" element={<UnauthorizePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/price" element={<PricePage />} />
                <Route path="/features/kanban-board" element={<KanbanBoardPage />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/support-center" element={<SupportCenterPage />} />
              </Routes>
            </TaskTypesProvider>
          </ProjectProvider>
        </RolesProvider>
      </UserProvider>
    </>
  );
}
export default App;
