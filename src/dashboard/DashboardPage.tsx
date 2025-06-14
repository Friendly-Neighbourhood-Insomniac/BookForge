import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Plus, Search, Filter, Grid, List, LogOut, Cog, Settings, Sparkles, Edit, Eye, Trash2, ChevronRight, Clock } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { Session } from '@supabase/supabase-js';
import { GlobalBackground, FrostedGlassPanel, CrystalButton } from '../components/ClockEdUI';

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
  const [creating, setCreating] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  // Helper function to calculate project timeline percentage
  const calculateTimeline = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const daysSinceCreation = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min((daysSinceCreation / 30) * 100, 100);
  };

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

  const handleCreateNewProject = async () => {
    if (!session?.user) {
      console.error('No user session');
      return;
    }

    setCreating(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            title: 'Untitled Book',
            project_type: 'textbook',
            user_id: session.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        alert('Failed to create project. Please try again.');
        return;
      }

      if (data) {
        navigate(`/editor/${data.id}`);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setCreating(false);
    }
  };

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
    <div className="min-h-screen bg-porcelain relative overflow-hidden">
      {/* Global Background Effects */}
      <GlobalBackground />
      
      {/* Header */}
      <header className="relative z-30 border-b border-glass-white/20">
        <FrostedGlassPanel className="rounded-none border-0 border-b border-neon-cyan/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Cog className="h-8 w-8 text-brass animate-spin-slow" />
                    <div className="absolute inset-0 h-8 w-8 bg-brass/20 rounded-full blur-sm"></div>
                  </div>
                  <span className="text-2xl font-cinzel font-bold text-dark-bronze">ClockEd-In BookForge</span>
                </div>
                
                {/* Breadcrumb Trail */}
                <div className="flex items-center text-sm text-brass font-inter">
                  <Link to="/" className="hover:text-neon-cyan transition-colors">Forge</Link>
                  <ChevronRight className="h-3 w-3 mx-2" />
                  <span className="text-dark-bronze">My Books</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search and Filter */}
                <div className="flex items-center space-x-2">
                  <CrystalButton variant="ghost" size="sm" icon={Search} className="p-3" />
                  <CrystalButton variant="ghost" size="sm" icon={Filter} className="p-3" />
                </div>
                
                {/* View Toggle */}
                <FrostedGlassPanel className="flex items-center space-x-1 p-1" borderStyle="crystal">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-brass-gradient shadow-brass text-white'
                        : 'text-dark-bronze hover:text-neon-cyan hover:bg-glass-gradient'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-brass-gradient shadow-brass text-white'
                        : 'text-dark-bronze hover:text-neon-cyan hover:bg-glass-gradient'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </FrostedGlassPanel>
                
                {/* New Book Button */}
                <CrystalButton
                  onClick={handleCreateNewProject}
                  disabled={creating}
                  variant="primary"
                  icon={creating ? Clock : Plus}
                  hasGearEffect
                >
                  {creating ? 'Creating...' : 'New Book'}
                </CrystalButton>
                
                {/* Logout Button */}
                <CrystalButton 
                  onClick={handleLogout}
                  variant="ghost" 
                  size="sm" 
                  icon={LogOut}
                  className="hover:shadow-red-500/30 hover:border-red-400/30"
                />
              </div>
            </div>
          </div>
        </FrostedGlassPanel>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <FrostedGlassPanel className="inline-block px-8 py-4" glowColor="brass" borderStyle="embossed">
            <div className="relative">
              <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-dark-bronze flex items-center space-x-3">
                <Sparkles className="h-8 w-8 text-neon-cyan animate-pulse" />
                <span>My Books</span>
                <Sparkles className="h-8 w-8 text-neon-cyan animate-pulse" />
              </h1>
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                <Settings className="h-5 w-5 text-brass animate-reverse-spin" />
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                <Cog className="h-5 w-5 text-brass animate-spin-slow" />
              </div>
            </div>
          </FrostedGlassPanel>
          <p className="text-xl text-dark-bronze/70 font-inter mt-4">Manage your interactive books and projects</p>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="text-center py-16">
            <FrostedGlassPanel className="inline-block p-8" glowColor="cyan">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
              <p className="text-dark-bronze font-inter">Loading your books...</p>
            </FrostedGlassPanel>
          </div>
        ) : projects.length === 0 ? (
          /* Enhanced Empty State */
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <FrostedGlassPanel className="p-12" glowColor="aurora" borderStyle="embossed" hasGearCorner>
                {/* Crystal Book Icon */}
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-brass-gradient rounded-full shadow-brass-glow border-4 border-neon-cyan/30 relative group">
                    <BookOpen className="h-12 w-12 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent rounded-full group-hover:animate-pulse"></div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-4">No books yet</h3>
                <p className="text-dark-bronze/70 font-inter text-lg mb-8 leading-relaxed">
                  Create your first interactive book to get started with ClockEd-In BookForge.
                  <span className="block mt-2 text-brass font-semibold">
                    Design • Gamify • Inspire
                  </span>
                </p>
                
                <CrystalButton
                  onClick={handleCreateNewProject}
                  disabled={creating}
                  variant="primary"
                  size="lg"
                  icon={creating ? Clock : Plus}
                  hasGearEffect
                >
                  {creating ? 'Creating Your First Book...' : 'Create Your First Book'}
                </CrystalButton>
              </FrostedGlassPanel>
            </div>
          </div>
        ) : (
          /* Projects Grid/List */
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' 
              : 'space-y-4'
            }
          `}>
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative"
              >
                <FrostedGlassPanel 
                  className={`
                    p-6 transform hover:-translate-y-2 hover:scale-105 
                    transition-all duration-500 cursor-pointer
                    ${viewMode === 'list' ? 'flex items-center space-x-6' : ''}
                  `}
                  glowColor="brass" 
                  borderStyle="crystal"
                  hasGearCorner
                  onClick={() => navigate(`/editor/${project.id}`)}
                >
                  {/* Ice Crystal Emblem */}
                  <div className={`
                    relative ${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}
                  `}>
                    <div className="w-16 h-16 bg-brass-gradient rounded-xl flex items-center justify-center shadow-brass border-4 border-neon-cyan/20 group-hover:animate-gear-pulse group-hover:shadow-cyan-intense transition-all duration-300">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Project Type Badge */}
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-neon-cyan to-brass px-2 py-1 rounded-full text-xs font-bold text-white shadow-cyan-glow">
                      {project.project_type === 'textbook' ? '📖' : '📝'}
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className={`flex-1 ${viewMode === 'list' ? '' : 'min-h-0'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-cinzel font-bold text-dark-bronze truncate pr-2">
                        {project.title}
                      </h3>
                      {viewMode === 'grid' && (
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse flex-shrink-0"></div>
                      )}
                    </div>
                    
                    <p className="text-sm text-dark-bronze/70 capitalize font-inter mb-3">
                      {project.project_type}
                    </p>
                    
                    {/* Project Timeline Gauge */}
                    <div className="mb-4 flex items-center space-x-3">
                      <div className="flex-1 bg-glass-white/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-brass to-neon-cyan h-2 rounded-full transition-all duration-300" 
                          style={{width: `${calculateTimeline(project.created_at)}%`}}
                        ></div>
                      </div>
                      <div className="relative" title="Project age">
                        <Cog className="h-4 w-4 text-brass animate-spin-slow" />
                      </div>
                    </div>
                    
                    {/* Project Meta */}
                    <div className="mb-4">
                      <p className="text-xs text-dark-bronze/60 font-inter">
                        Updated: {new Date(project.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className={`
                      flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      ${viewMode === 'list' ? 'flex-shrink-0' : ''}
                    `}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/editor/${project.id}`);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 bg-gradient-to-r from-neon-cyan to-brass text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-cyan-glow transition-all duration-300"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/preview/${project.id}`);
                        }}
                        className="flex-1 flex items-center justify-center space-x-1 bg-brass-gradient text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-brass-glow transition-all duration-300"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(project.id);
                        }}
                        className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 hover:shadow-red-500/30 transition-all duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Crystal Bottom Accent */}
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-neon-cyan via-brass to-neon-cyan rounded-b-3xl shadow-cyan-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </FrostedGlassPanel>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;