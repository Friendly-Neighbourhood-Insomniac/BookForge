import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './landing/LandingPage';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import DashboardPage from './dashboard/DashboardPage';
import EditorPage from './editor/EditorPage';
import NewProjectFlow from './editor/NewProjectFlow';
import PreviewPage from './preview/PreviewPage';
import AdminPage from './admin/AdminPage';
import AuthGuard from './components/AuthGuard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-inter">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          } />
          <Route path="/editor/create" element={
            <AuthGuard>
              <NewProjectFlow />
            </AuthGuard>
          } />
          <Route path="/editor" element={
            <AuthGuard>
              <EditorPage />
            </AuthGuard>
          } />
          <Route path="/editor/:bookId" element={
            <AuthGuard>
              <EditorPage />
            </AuthGuard>
          } />
          <Route path="/preview/:bookId" element={
            <AuthGuard>
              <PreviewPage />
            </AuthGuard>
          } />
          <Route path="/admin" element={
            <AuthGuard>
              <AdminPage />
            </AuthGuard>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;