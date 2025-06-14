import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useBlocker } from 'react-router-dom';
import { useEditorStore } from '../store/editorStore';
import { supabase } from '../utils/supabase';
import { GlobalBackground } from '../components/ClockEdUI';
import EditorHeader from './components/EditorHeader';
import PageSidebar from './components/PageSidebar';
import EditorCanvas from './components/EditorCanvas';
import ComponentToolbar from './components/ComponentToolbar';
import PropertiesPanel from './components/PropertiesPanel';

const EditorPage: React.FC = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { 
    setProject, 
    project, 
    isLoading, 
    setLoading, 
    unsavedChanges,
    undo,
    redo,
    undoStack,
    redoStack
  } = useEditorStore();
  const [error, setError] = useState<string | null>(null);
  const [isPageSidebarOpen, setIsPageSidebarOpen] = useState(false);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);

  // Block navigation if there are unsaved changes
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      unsavedChanges && currentLocation.pathname !== nextLocation.pathname
  );

  // Handle keyboard shortcuts for undo/redo
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        if (undoStack.length > 0) {
          undo();
        }
      } else if ((event.key === 'y') || (event.key === 'z' && event.shiftKey)) {
        event.preventDefault();
        if (redoStack.length > 0) {
          redo();
        }
      }
    }
  }, [undo, redo, undoStack.length, redoStack.length]);

  // Set up keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Warn user before leaving page if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  // Handle blocked navigation
  useEffect(() => {
    if (blocker.state === 'blocked') {
      const shouldProceed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.'
      );
      
      if (shouldProceed) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);

  useEffect(() => {
    const loadProject = async () => {
      if (!bookId) {
        setError('No book ID provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          setError('You must be logged in to access this project');
          return;
        }

        // Fetch project from Supabase
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', bookId)
          .eq('user_id', session.user.id) // Ensure RLS compliance
          .single();

        if (error) {
          console.error('Error fetching project:', error);
          if (error.code === 'PGRST116') {
            setError('Project not found or you do not have permission to access it');
          } else {
            setError('Failed to load project');
          }
          return;
        }

        if (data) {
          // Convert database project to editor project format
          const editorProject = {
            id: data.id,
            title: data.title,
            project_type: data.project_type,
            author: data.author || '',
            description: data.description || '',
            cover_type: data.cover_type || '',
            template_type: data.template_type || '',
            cover_url: data.cover_url || '',
            pages: data.pages && Array.isArray(data.pages) && data.pages.length > 0 
              ? data.pages 
              : [
                  {
                    id: 'page_1',
                    title: 'Page 1',
                    components: []
                  }
                ]
          };
          
          setProject(editorProject);
        }
      } catch (err) {
        console.error('Error loading project:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [bookId, setProject, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-porcelain relative overflow-hidden">
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
            <p className="text-dark-bronze font-inter">Loading editor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-porcelain relative overflow-hidden">
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-500 rounded-full p-4 mb-4 inline-block">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-dark-bronze mb-2">Error Loading Project</h2>
            <p className="text-dark-bronze/80 mb-4">{error}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-brass-gradient text-white px-6 py-2 rounded-lg hover:shadow-brass-glow transition-all duration-300"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-porcelain relative overflow-hidden">
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-dark-bronze font-inter">No project found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain flex flex-col relative overflow-hidden">
      <GlobalBackground />
      
      <EditorHeader 
        onTogglePageSidebar={() => setIsPageSidebarOpen(!isPageSidebarOpen)}
        onTogglePropertiesPanel={() => setIsPropertiesPanelOpen(!isPropertiesPanelOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Mobile backdrop */}
        {(isPageSidebarOpen || isPropertiesPanelOpen) && (
          <div 
            className="fixed inset-0 bg-dark-bronze/50 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => {
              setIsPageSidebarOpen(false);
              setIsPropertiesPanelOpen(false);
            }}
          />
        )}

        <PageSidebar 
          isOpen={isPageSidebarOpen}
          onClose={() => setIsPageSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <EditorCanvas />
          <ComponentToolbar />
        </div>
        
        <PropertiesPanel 
          isOpen={isPropertiesPanelOpen}
          onClose={() => setIsPropertiesPanelOpen(false)}
        />
      </div>
    </div>
  );
};

export default EditorPage;