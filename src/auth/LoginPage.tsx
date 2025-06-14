import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, AlertCircle, ArrowRight, Cog } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { GlobalBackground, FrostedGlassPanel, CrystalButton, IcyInput } from '../components/ClockEdUI';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // Check user role and redirect accordingly
        const userRole = data.user.user_metadata?.role;
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-porcelain relative overflow-hidden">
      {/* Global Background Effects */}
      <GlobalBackground />
      
      {/* Additional atmospheric effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-[10%] w-40 h-40 bg-neon-cyan/5 rounded-full filter blur-xl animate-puff"></div>
        <div className="absolute bottom-10 right-[15%] w-32 h-32 bg-brass/10 rounded-full filter blur-xl animate-puff" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-[20%] w-24 h-24 bg-aurora-glow/10 rounded-full filter blur-xl animate-puff" style={{ animationDelay: '1400ms' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6">
          {/* Logo Header */}
          <div className="text-center">
            <FrostedGlassPanel className="mb-6" glowColor="brass" borderStyle="embossed">
              <div className="flex items-center justify-center space-x-3 py-2">
                <div className="relative">
                  <BookOpen className="h-8 w-8 text-neon-cyan drop-shadow-lg" />
                  <div className="absolute inset-0 h-8 w-8 bg-neon-cyan/20 rounded-full blur-sm animate-pulse"></div>
                </div>
                <span className="text-2xl font-cinzel font-bold text-dark-bronze">
                  CLOCKED-IN BOOKFORGE
                </span>
                <div className="relative">
                  <Cog className="h-6 w-6 text-brass animate-spin-slow" />
                  <div className="absolute inset-0 h-6 w-6 bg-brass/20 rounded-full blur-sm"></div>
                </div>
              </div>
            </FrostedGlassPanel>
          </div>

          {/* Main Login Panel */}
          <FrostedGlassPanel 
            className="p-8" 
            glowColor="cyan" 
            borderStyle="crystal" 
            hasGearCorner
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-dark-bronze mb-2">Welcome back</h2>
              <p className="text-dark-bronze/70 font-inter">Sign in to continue creating amazing books</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <FrostedGlassPanel className="p-4" glowColor="aurora" borderStyle="crystal">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-700 text-sm font-inter">{error}</span>
                  </div>
                </FrostedGlassPanel>
              )}

              <IcyInput
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Email address"
                icon={Mail}
                disabled={loading}
              />

              <IcyInput
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Password"
                icon={Lock}
                disabled={loading}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-brass focus:ring-neon-cyan border-brass/30 rounded bg-glass-gradient"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-bronze/70 font-inter">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-neon-cyan hover:text-brass font-medium transition-colors hover:animate-pulse"
                >
                  Forgot password?
                </button>
              </div>

              <CrystalButton
                disabled={loading}
                variant="primary"
                size="lg"
                className="w-full"
                icon={ArrowRight}
                hasGearEffect
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </CrystalButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-dark-bronze/70 font-inter">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-brass hover:text-neon-cyan font-medium transition-colors hover:animate-pulse"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Crystal accent lines */}
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"></div>
          </FrostedGlassPanel>

          {/* Additional decorative elements */}
          <div className="flex justify-center space-x-4 opacity-30">
            <div className="w-2 h-2 bg-brass rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-brass rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;