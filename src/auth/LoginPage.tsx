import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../utils/supabase';
import BrassBorderFrame from '../components/ClockEdUI/BrassBorderFrame';
import PorcelainPanel from '../components/ClockEdUI/PorcelainPanel';
import ForgedButton from '../components/ClockEdUI/ForgedButton';

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
    <div className="min-h-screen bg-dark-bronze flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background steam effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-[10%] w-40 h-40 bg-white/5 rounded-full filter blur-xl animate-puff"></div>
        <div className="absolute bottom-10 right-[15%] w-32 h-32 bg-amber-300/10 rounded-full filter blur-xl animate-puff" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute top-1/2 left-[20%] w-24 h-24 bg-neon-cyan/10 rounded-full filter blur-xl animate-puff" style={{ animationDelay: '1400ms' }}></div>
      </div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* Logo Header */}
        <div className="text-center">
          <BrassBorderFrame className="mb-6">
            <div className="flex items-center justify-center space-x-3 py-2">
              <BookOpen className="h-8 w-8 text-neon-cyan drop-shadow-lg" />
              <span className="text-2xl font-cinzel font-bold text-brass-light">
                CLOCKED-IN BOOKFORGE
              </span>
            </div>
          </BrassBorderFrame>
        </div>

        {/* Main Login Panel */}
        <BrassBorderFrame>
          <PorcelainPanel className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-cinzel font-bold text-brass-dark mb-2">Welcome back</h2>
              <p className="text-dark-bronze/70 font-inter">Sign in to continue creating amazing books</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-brass" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-porcelain border-2 border-brass/30 rounded-xl focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan transition-colors text-dark-bronze placeholder-dark-bronze/50"
                    placeholder="Email address"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-brass" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-porcelain border-2 border-brass/30 rounded-xl focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan transition-colors text-dark-bronze placeholder-dark-bronze/50"
                    placeholder="Password"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-brass focus:ring-neon-cyan border-brass/30 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-dark-bronze/70 font-inter">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-neon-cyan hover:text-brass font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <ForgedButton disabled={loading}>
                <span className="text-brass-light text-2xl font-cinzel font-bold flex items-center space-x-3">
                  <span>{loading ? 'SIGNING IN...' : 'SIGN IN'}</span>
                  <ArrowRight className="h-6 w-6 text-neon-cyan" />
                </span>
              </ForgedButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-dark-bronze/70 font-inter">
                Don't have an account?{' '}
                <Link to="/register" className="text-brass hover:text-neon-cyan font-medium transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </PorcelainPanel>
        </BrassBorderFrame>
      </div>
    </div>
  );
};

export default LoginPage;