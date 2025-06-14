import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, User, AlertCircle, UserPlus, Cog, Settings } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { GlobalBackground, FrostedGlassPanel, CrystalButton, IcyInput } from '../components/ClockEdUI';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      setError('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: 'user', // Default role
          },
        },
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
        <div className="absolute top-16 right-[8%] w-48 h-48 bg-brass/8 rounded-full filter blur-xl animate-puff"></div>
        <div className="absolute bottom-20 left-[12%] w-36 h-36 bg-neon-cyan/8 rounded-full filter blur-xl animate-puff" style={{ animationDelay: '900ms' }}></div>
        <div className="absolute top-1/3 right-[25%] w-28 h-28 bg-aurora-glow/10 rounded-full filter blur-xl animate-puff" style={{ animationDelay: '1800ms' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6">
          {/* Logo Header */}
          <div className="text-center">
            <FrostedGlassPanel className="mb-6" glowColor="brass" borderStyle="embossed">
              <div className="flex items-center justify-center space-x-3 py-2">
                <div className="relative">
                  <Cog className="h-6 w-6 text-brass animate-spin-slow" />
                  <div className="absolute inset-0 h-6 w-6 bg-brass/20 rounded-full blur-sm"></div>
                </div>
                <BookOpen className="h-8 w-8 text-neon-cyan" />
                <span className="text-xl font-cinzel font-bold text-dark-bronze">ClockEd-In BookForge</span>
                <div className="relative">
                  <Settings className="h-5 w-5 text-neon-cyan animate-reverse-spin" />
                  <div className="absolute inset-0 h-5 w-5 bg-neon-cyan/20 rounded-full blur-sm"></div>
                </div>
              </div>
            </FrostedGlassPanel>

            <h2 className="text-3xl font-cinzel font-bold text-dark-bronze mb-2">Create your account</h2>
            <p className="text-dark-bronze/60 font-inter">Start building interactive books today</p>
          </div>

          {/* Main Registration Panel */}
          <FrostedGlassPanel 
            className="p-8" 
            glowColor="aurora" 
            borderStyle="crystal" 
            hasGearCorner
          >
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
                type="text"
                value={name}
                onChange={setName}
                placeholder="Enter your full name"
                label="Full name"
                icon={User}
                disabled={loading}
              />

              <IcyInput
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="Enter your email"
                label="Email address"
                icon={Mail}
                disabled={loading}
              />

              <IcyInput
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Create a strong password"
                label="Password"
                icon={Lock}
                disabled={loading}
              />

              <IcyInput
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Confirm your password"
                label="Confirm password"
                icon={Lock}
                disabled={loading}
              />

              <div className="flex items-start space-x-3">
                <div className="relative mt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-brass focus:ring-neon-cyan border-brass/30 rounded bg-glass-gradient"
                    disabled={loading}
                  />
                  {/* Custom checkbox glow */}
                  {termsAccepted && (
                    <div className="absolute inset-0 h-4 w-4 bg-neon-cyan/20 rounded blur-xs animate-pulse"></div>
                  )}
                </div>
                <label htmlFor="terms" className="text-sm text-dark-bronze/70 font-inter leading-relaxed">
                  I agree to the{' '}
                  <button 
                    type="button" 
                    className="text-neon-cyan hover:text-brass font-medium transition-colors hover:animate-pulse"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button 
                    type="button" 
                    className="text-neon-cyan hover:text-brass font-medium transition-colors hover:animate-pulse"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              <CrystalButton
                disabled={loading}
                variant="primary"
                size="lg"
                className="w-full"
                icon={UserPlus}
                hasGearEffect
              >
                {loading ? 'Creating account...' : 'Create account'}
              </CrystalButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-dark-bronze/70 font-inter">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-brass hover:text-neon-cyan font-medium transition-colors hover:animate-pulse"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Crystal accent lines */}
            <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brass/30 to-transparent"></div>
          </FrostedGlassPanel>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 opacity-40">
            <div className="w-8 h-1 bg-brass rounded-full"></div>
            <div className="w-4 h-1 bg-neon-cyan rounded-full animate-pulse"></div>
            <div className="w-8 h-1 bg-brass rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;