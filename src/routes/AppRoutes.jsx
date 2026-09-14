import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Loader from '../components/common/Loader';

const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgotPassword = lazy(() => import('../pages/Auth/ForgotPassword'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Leads = lazy(() => import('../pages/Leads/Leads'));
const LeadDetail = lazy(() => import('../pages/Leads/LeadDetail'));
const Customers = lazy(() => import('../pages/Customers/Customers'));
const CustomerDetail = lazy(() => import('../pages/Customers/CustomerDetail'));
const Companies = lazy(() => import('../pages/Companies/Companies'));
const CompanyDetail = lazy(() => import('../pages/Companies/CompanyDetail'));
const Deals = lazy(() => import('../pages/Deals/Deals'));
const Tasks = lazy(() => import('../pages/Tasks/Tasks'));
const TaskDetail = lazy(() => import('../pages/Tasks/TaskDetail'));
const Projects = lazy(() => import('../pages/Projects/Projects'));
const ProjectDetail = lazy(() => import('../pages/Projects/ProjectDetail'));
const Invoices = lazy(() => import('../pages/Invoices/Invoices'));
const InvoiceDetail = lazy(() => import('../pages/Invoices/InvoiceDetail'));
const CalendarPage = lazy(() => import('../pages/Calendar/Calendar'));
const Analytics = lazy(() => import('../pages/Analytics/Analytics'));
const Reports = lazy(() => import('../pages/Reports/Reports'));
const ReportDetail = lazy(() => import('../pages/Reports/ReportDetail'));
const Settings = lazy(() => import('../pages/Settings/Settings'));
const Documents = lazy(() => import('../pages/Documents/Documents'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:id" element={<CompanyDetail />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/:id" element={<InvoiceDetail />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
