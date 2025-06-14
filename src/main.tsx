import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './landing/LandingPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import DashboardPage from './dashboard/DashboardPage';
import EditorPage from './editor/EditorPage';
import PreviewPage from './preview/PreviewPage';
import AdminPage from './admin/AdminPage';
import AuthGuard from './components/AuthGuard';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/dashboard",
    element: (
      <AuthGuard>
        <DashboardPage />
      </AuthGuard>
    )
  },
  {
    path: "/editor",
    element: (
      <AuthGuard>
        <EditorPage />
      </AuthGuard>
    )
  },
  {
    path: "/editor/:bookId",
    element: (
      <AuthGuard>
        <EditorPage />
      </AuthGuard>
    )
  },
  {
    path: "/preview/:bookId",
    element: (
      <AuthGuard>
        <PreviewPage />
      </AuthGuard>
    )
  },
  {
    path: "/admin",
    element: (
      <AuthGuard>
        <AdminPage />
      </AuthGuard>
    )
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="min-h-screen bg-gray-50 font-inter">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);