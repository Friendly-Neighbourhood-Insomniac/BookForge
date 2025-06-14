import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { Session } from '@supabase/supabase-js';
import { GlobalBackground, FrostedGlassPanel } from './ClockEdUI';
import { Cog } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!session) {
        // No session, redirect to login
        navigate('/login');
        return;
      }

      // Check user role and redirect accordingly
      const userRole = session.user?.user_metadata?.role;
      const isAdmin = userRole === 'admin';
      const isOnAdminPage = location.pathname === '/admin';

      if (isAdmin && !isOnAdminPage && location.pathname !== '/admin') {
        // Admin user not on admin page, redirect to admin
        navigate('/admin');
      } else if (!isAdmin && isOnAdminPage) {
        // Non-admin user trying to access admin page, redirect to dashboard
        navigate('/dashboard');
      }
    }
  }, [session, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-porcelain relative overflow-hidden">
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <FrostedGlassPanel className="p-8" glowColor="cyan" hasGearCorner>
            <div className="text-center">
              <div className="relative mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cog className="h-6 w-6 text-brass animate-reverse-spin" />
                </div>
              </div>
              <p className="text-dark-bronze font-inter">Loading...</p>
              <div className="mt-4 flex justify-center space-x-1">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-brass rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
          </FrostedGlassPanel>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
};

export default AuthGuard;