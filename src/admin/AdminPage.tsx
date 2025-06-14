import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Settings, BarChart3, Shield, Cog, ChevronRight, Sparkles } from 'lucide-react';
import { GlobalBackground, FrostedGlassPanel, CrystalButton } from '../components/ClockEdUI';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-porcelain relative overflow-hidden">
      {/* Global Background Effects */}
      <GlobalBackground />
      
      {/* Header */}
      <header className="relative z-30 border-b border-glass-white/20">
        <FrostedGlassPanel className="rounded-none border-0 border-b border-neon-cyan/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <BookOpen className="h-8 w-8 text-neon-cyan drop-shadow-lg" />
                  <div className="absolute inset-0 h-8 w-8 bg-neon-cyan/20 rounded-full blur-sm animate-pulse"></div>
                </div>
                <span className="text-xl font-cinzel font-bold text-dark-bronze">ClockEd-In BookForge</span>
                <FrostedGlassPanel className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600" borderStyle="crystal">
                  <span className="text-white text-xs font-bold font-inter">ADMIN</span>
                </FrostedGlassPanel>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <CrystalButton variant="ghost" size="sm">
                    Back to Dashboard
                  </CrystalButton>
                </Link>
              </div>
            </div>
          </div>
        </FrostedGlassPanel>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <FrostedGlassPanel className="inline-block px-8 py-4" glowColor="aurora" borderStyle="embossed">
            <div className="relative">
              <h1 className="text-2xl font-cinzel font-bold text-dark-bronze flex items-center space-x-3">
                <Shield className="h-6 w-6 text-red-500" />
                <span>Admin Dashboard</span>
                <Sparkles className="h-6 w-6 text-neon-cyan animate-pulse" />
              </h1>
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                <Settings className="h-5 w-5 text-brass animate-reverse-spin" />
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                <Cog className="h-5 w-5 text-brass animate-spin-slow" />
              </div>
            </div>
          </FrostedGlassPanel>
          <p className="text-dark-bronze/60 font-inter mt-4">Manage users, content, and system settings</p>
        </div>

        {/* Admin Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <div className="group">
            <FrostedGlassPanel 
              className="p-6 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer" 
              glowColor="cyan" 
              borderStyle="crystal"
              hasGearCorner
            >
              {/* Floating Crystal Icon */}
              <div className="absolute -top-6 left-6 w-16 h-16 bg-gradient-to-br from-neon-cyan to-brass rounded-2xl flex items-center justify-center shadow-cyan-glow border-4 border-frost-white/30 group-hover:animate-gear-pulse">
                <Users className="h-8 w-8 text-white" />
              </div>
              
              <div className="pt-8">
                <h3 className="text-lg font-cinzel font-bold text-dark-bronze mb-2 flex items-center space-x-2">
                  <span>User Management</span>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                </h3>
                <p className="text-dark-bronze/70 font-inter mb-4 leading-relaxed">
                  Manage user accounts, permissions, and access levels.
                </p>
                <CrystalButton variant="ghost" size="sm" icon={ChevronRight}>
                  Manage Users
                </CrystalButton>
              </div>
              
              {/* Crystal Bottom Accent */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-neon-cyan to-brass rounded-b-3xl shadow-cyan-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FrostedGlassPanel>
          </div>

          {/* Analytics */}
          <div className="group">
            <FrostedGlassPanel 
              className="p-6 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer" 
              glowColor="brass" 
              borderStyle="embossed"
              hasGearCorner
            >
              {/* Floating Crystal Icon */}
              <div className="absolute -top-6 left-6 w-16 h-16 bg-brass-gradient rounded-2xl flex items-center justify-center shadow-brass-glow border-4 border-neon-cyan/20 group-hover:animate-gear-pulse">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              
              <div className="pt-8">
                <h3 className="text-lg font-cinzel font-bold text-dark-bronze mb-2 flex items-center space-x-2">
                  <span>Analytics</span>
                  <div className="w-2 h-2 bg-brass rounded-full animate-pulse"></div>
                </h3>
                <p className="text-dark-bronze/70 font-inter mb-4 leading-relaxed">
                  View usage statistics, book creation metrics, and user engagement.
                </p>
                <CrystalButton variant="ghost" size="sm" icon={ChevronRight}>
                  View Analytics
                </CrystalButton>
              </div>
              
              {/* Brass Bottom Accent */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-brass-gradient rounded-b-3xl shadow-brass-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FrostedGlassPanel>
          </div>

          {/* System Settings */}
          <div className="group">
            <FrostedGlassPanel 
              className="p-6 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer" 
              glowColor="aurora" 
              borderStyle="crystal"
              hasGearCorner
            >
              {/* Floating Crystal Icon */}
              <div className="absolute -top-6 left-6 w-16 h-16 bg-gradient-to-br from-aurora-glow to-brass rounded-2xl flex items-center justify-center shadow-aurora border-4 border-glass-white/30 group-hover:animate-gear-pulse">
                <Settings className="h-8 w-8 text-white" />
              </div>
              
              <div className="pt-8">
                <h3 className="text-lg font-cinzel font-bold text-dark-bronze mb-2 flex items-center space-x-2">
                  <span>System Settings</span>
                  <div className="w-2 h-2 bg-aurora-glow rounded-full animate-pulse"></div>
                </h3>
                <p className="text-dark-bronze/70 font-inter mb-4 leading-relaxed">
                  Configure system-wide settings and preferences.
                </p>
                <CrystalButton variant="ghost" size="sm" icon={ChevronRight}>
                  Configure System
                </CrystalButton>
              </div>
              
              {/* Aurora Bottom Accent */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-aurora-glow to-neon-cyan rounded-b-3xl shadow-aurora opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FrostedGlassPanel>
          </div>

          {/* Security */}
          <div className="group">
            <FrostedGlassPanel 
              className="p-6 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer" 
              glowColor="aurora" 
              borderStyle="crystal"
              hasGearCorner
            >
              {/* Floating Crystal Icon */}
              <div className="absolute -top-6 left-6 w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-red-500/50 border-4 border-frost-white/30 group-hover:animate-gear-pulse">
                <Shield className="h-8 w-8 text-white" />
              </div>
              
              <div className="pt-8">
                <h3 className="text-lg font-cinzel font-bold text-dark-bronze mb-2 flex items-center space-x-2">
                  <span>Security</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </h3>
                <p className="text-dark-bronze/70 font-inter mb-4 leading-relaxed">
                  Monitor security events and manage access controls.
                </p>
                <CrystalButton variant="ghost" size="sm" icon={ChevronRight}>
                  Security Dashboard
                </CrystalButton>
              </div>
              
              {/* Red Bottom Accent */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-b-3xl shadow-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FrostedGlassPanel>
          </div>

          {/* Content Moderation */}
          <div className="group">
            <FrostedGlassPanel 
              className="p-6 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 cursor-pointer" 
              glowColor="brass" 
              borderStyle="embossed"
              hasGearCorner
            >
              {/* Floating Crystal Icon */}
              <div className="absolute -top-6 left-6 w-16 h-16 bg-gradient-to-br from-yellow-500 to-brass rounded-2xl flex items-center justify-center shadow-brass-glow border-4 border-neon-cyan/20 group-hover:animate-gear-pulse">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              
              <div className="pt-8">
                <h3 className="text-lg font-cinzel font-bold text-dark-bronze mb-2 flex items-center space-x-2">
                  <span>Content Moderation</span>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                </h3>
                <p className="text-dark-bronze/70 font-inter mb-4 leading-relaxed">
                  Review and moderate user-generated content and books.
                </p>
                <CrystalButton variant="ghost" size="sm" icon={ChevronRight}>
                  Moderate Content
                </CrystalButton>
              </div>
              
              {/* Yellow Bottom Accent */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-yellow-500 to-brass rounded-b-3xl shadow-brass-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </FrostedGlassPanel>
          </div>

          {/* More Features - Coming Soon */}
          <div className="group">
            <FrostedGlassPanel 
              className="p-6 opacity-75 hover:opacity-90 transition-all duration-500" 
              glowColor="aurora" 
              borderStyle="standard"
            >
              {/* Coming Soon Crystal Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-neon-cyan to-brass px-4 py-2 rounded-full shadow-cyan-glow border-2 border-frost-white/50 z-20">
                <span className="text-white font-bold text-xs flex items-center space-x-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Coming Soon</span>
                </span>
              </div>
              
              {/* Floating Crystal Icon */}
              <div className="absolute -top-6 left-6 w-16 h-16 bg-gradient-to-br from-brass to-aurora-glow rounded-2xl flex items-center justify-center shadow-aurora border-4 border-glass-white/30 opacity-60">
                <Settings className="h-8 w-8 text-white" />
              </div>
              
              <div className="pt-8">
                <h3 className="text-lg font-cinzel font-bold text-dark-bronze/75 mb-2 flex items-center space-x-2">
                  <span>More Features</span>
                  <div className="w-2 h-2 bg-aurora-glow rounded-full animate-pulse"></div>
                </h3>
                <p className="text-dark-bronze/60 font-inter mb-4 leading-relaxed">
                  Additional admin features will be added in future updates.
                </p>
                <span className="text-dark-bronze/40 text-sm font-inter">Coming Soon</span>
              </div>
              
              {/* Aurora Bottom Accent */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-aurora-glow rounded-b-3xl opacity-30"></div>
            </FrostedGlassPanel>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;