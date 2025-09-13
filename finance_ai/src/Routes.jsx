import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FinancialDataOverview from './pages/financial-data-overview';
import UserFinancialForm from './pages/dashboard/components/UserFinancialForm';
import UserFinancialFormPage from './pages/register/UserFinancialFormPage';
import Login from './pages/login';
import PrivacyPermissions from './pages/privacy-permissions';
import Dashboard from './pages/dashboard';
import AIChatInterface from './pages/ai-chat-interface';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
  {/* Redirect root path to /login */}
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/financial-data-overview" element={<FinancialDataOverview />} />
  <Route path="/user-financial-form" element={<UserFinancialForm />} />
  <Route path="/user-financial-form-page" element={<UserFinancialFormPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-permissions" element={<PrivacyPermissions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-chat-interface" element={<AIChatInterface />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
import { Navigate } from "react-router-dom";

export default Routes;
