import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Settings, BarChart3, Shield } from 'lucide-react';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">ClockEd-In BookForge</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, content, and system settings</p>
        </div>

        {/* Admin Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
            <p className="text-gray-600 mb-4">
              Manage user accounts, permissions, and access levels.
            </p>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              Manage Users →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600 mb-4">
              View usage statistics, book creation metrics, and user engagement.
            </p>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              View Analytics →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">System Settings</h3>
            <p className="text-gray-600 mb-4">
              Configure system-wide settings and preferences.
            </p>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              Configure System →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Security</h3>
            <p className="text-gray-600 mb-4">
              Monitor security events and manage access controls.
            </p>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              Security Dashboard →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Moderation</h3>
            <p className="text-gray-600 mb-4">
              Review and moderate user-generated content and books.
            </p>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
              Moderate Content →
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow opacity-50">
            <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-2">More Features</h3>
            <p className="text-gray-400 mb-4">
              Additional admin features will be added in future updates.
            </p>
            <span className="text-gray-400 text-sm">Coming Soon</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;