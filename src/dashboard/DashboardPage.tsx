import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Search, Filter, Grid, List, LogOut, Cog, Settings, Sparkles, Edit, Eye, Trash2 } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { Session } from '@supabase/supabase-js';

interface Project {
  id: string;
  title: string;
  project_type: 'textbook' | 'workbook';
  updated_at: string;
  created_at: string;
  user_id: string;
}

const DashboardPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get session and set up auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user projects when session is available
  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', session.user.id)
          .order('updated_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects:', error);
        } else {
          setProjects(data || []);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [session]);

  const deleteProject = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      } else {
        setProjects(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bronze">
      {/* Header */}
      <header className="bg-cracked-porcelain/95 backdrop-blur-md shadow-porcelain border-b-2 border-brass/30 relative">
        {/* Subtle crack effects */}
        <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
        <div className="absolute top-1/2 right-1/3 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Cog className="h-8 w-8 text-brass animate-spin-slow" />
                  <div className="absolute inset-0 h-8 w-8 bg-brass/20 rounded-full blur-sm"></div>
                </div>
                <span className="text-2xl font-cinzel font-bold text-dark-bronze">ClockEd-In BookForge</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search and Filter */}
              <div className="flex items-center space-x-2">
                <button className="p-3 bg-porcelain-gradient hover:bg-brass/10 text-dark-bronze rounded-xl shadow-porcelain border border-brass/20 transition-all duration-300 hover:shadow-brass-glow">
                  <Search className="h-5 w-5" />
                </button>
                <button className="p-3 bg-porcelain-gradient hover:bg-brass/10 text-dark-bronze rounded-xl shadow-porcelain border border-brass/20 transition-all duration-300 hover:shadow-brass-glow">
                  <Filter className="h-5 w-5" />
                </button>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-1 bg-brass/10 rounded-xl p-1 border border-brass/20">
                <button className="p-2 rounded-lg bg-brass-gradient shadow-brass text-white">
                  <Grid className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg text-dark-bronze/60 hover:text-dark-bronze transition-colors">
                  <List className="h-4 w-4" />
                </button>
              </div>
              
              {/* New Book Button */}
              <Link
                to="/editor/create"
                className="group bg-brass-gradient hover:shadow-cyan-glow text-white px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-brass transform hover:-translate-y-1 flex items-center space-x-2 border-2 border-brass-light/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Plus className="h-4 w-4 relative z-10" />
                <span className="relative z-10">New Book</span>
              </Link>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-3 bg-porcelain-gradient hover:bg-brass/10 text-dark-bronze rounded-xl shadow-porcelain border border-brass/20 transition-all duration-300 hover:shadow-brass-glow hover:text-brass-dark"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Enhanced Radial Gradient Effect */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Enhanced radial gradient with multiple layers */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_rgba(212,175,55,0.1)_30%,_transparent_70%)] blur-sm pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,240,255,0.08)_0%,_transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(212,175,55,0.12)_0%,_transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10 p-6">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <div className="inline-block bg-brass-gradient px-8 py-3 rounded-full mb-6 shadow-brass-glow relative">
                <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-white">My Books</h1>
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                  <Settings className="h-5 w-5 text-brass-light animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <Cog className="h-5 w-5 text-brass-light animate-spin-slow" />
                </div>
              </div>
              <p className="text-xl text-porcelain/80 font-inter">Manage your interactive books and projects</p>
            </div>

            {/* Content Area */}
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
                <p className="text-porcelain/80 font-inter">Loading your books...</p>
              </div>
            ) : projects.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className="max-w-2xl mx-auto">
                  <div className="bg-cracked-porcelain/95 backdrop-blur-md rounded-3xl p-12 shadow-porcelain border-4 border-brass/30 relative overflow-hidden group">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
                    <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
                    <div className="absolute top-1/3 right-1/4 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/15 to-transparent"></div>
                    
                    {/* Floating Gears */}
                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Cog className="h-16 w-16 text-brass animate-spin-slow" />
                    </div>
                    <div className="absolute bottom-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Settings className="h-12 w-12 text-neon-cyan animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                    </div>
                    
                    <div className="relative z-10">
                      {/* Main Icon */}
                      <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-brass-gradient rounded-full shadow-brass-glow border-4 border-brass-light/30 relative">
                          <BookOpen className="h-12 w-12 text-white" />
                          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-4">No books yet</h3>
                      <p className="text-dark-bronze/70 font-inter text-lg mb-8 leading-relaxed">
                        Create your first interactive book to get started with ClockEd-In BookForge.
                        <span className="block mt-2 text-brass font-semibold">
                          Design • Gamify • Inspire
                        </span>
                      </p>
                      
                      <Link
                        to="/editor/create"
                        className="group inline-flex items-center space-x-3 bg-brass-gradient hover:shadow-cyan-glow text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-brass transform hover:-translate-y-1 border-2 border-brass-light/50 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Plus className="h-5 w-5 relative z-10" />
                        <span className="relative z-10">Create Your First Book</span>
                        <Sparkles className="h-5 w-5 relative z-10 group-hover:animate-pulse" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Projects Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-cracked-porcelain/95 backdrop-blur-md rounded-3xl p-6 shadow-porcelain border-4 border-brass/30 hover:border-brass/60 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden relative"
                  >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                      <Cog className="h-8 w-8 text-brass animate-spin-slow" />
                    </div>
                    
                    <div className="relative z-10">
                      {/* Project Icon */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-brass-gradient rounded-xl flex items-center justify-center shadow-brass">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-cinzel font-bold text-dark-bronze truncate">
                            {project.title}
                          </h3>
                          <p className="text-sm text-dark-bronze/60 capitalize font-inter">
                            {project.project_type}
                          </p>
                        </div>
                      </div>
                      
                      {/* Project Meta */}
                      <div className="mb-6">
                        <p className="text-xs text-dark-bronze/50 font-inter">
                          Updated: {new Date(project.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/editor/${project.id}`)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-gradient-to-r from-neon-cyan to-brass text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-cyan-glow transition-all duration-300"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        
                        <button
                          onClick={() => navigate(`/preview/${project.id}`)}
                          className="flex-1 flex items-center justify-center space-x-1 bg-brass-gradient text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-brass-glow transition-all duration-300"
                        >
                          <Eye className="h-4 w-4" />
                          <span>Preview</span>
                        </button>
                        
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;