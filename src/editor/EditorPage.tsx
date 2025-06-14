import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEditorStore } from '../store/editorStore';
import { supabase } from '../utils/supabase';
import EditorHeader from './components/EditorHeader';
import PageSidebar from './components/PageSidebar';
import EditorCanvas from './components/EditorCanvas';
import ComponentToolbar from './components/ComponentToolbar';
import PropertiesPanel from './components/PropertiesPanel';

const EditorPage: React.FC = () => {
  const { bookId } = useParams();
  const { setProject, project, isLoading, setLoading } = useEditorStore();
  const [error, setError] = useState<string | null>(null);

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
        // Fetch project from Supabase
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', bookId)
          .single();

        if (error) {
          console.error('Error fetching project:', error);
          setError('Failed to load project');
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
            pages: [
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
      <div className="min-h-screen bg-dark-bronze flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
          <p className="text-porcelain">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bronze flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500 rounded-full p-4 mb-4 inline-block">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-porcelain mb-2">Error Loading Project</h2>
          <p className="text-porcelain/80">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-bronze flex items-center justify-center">
        <div className="text-center">
          <p className="text-porcelain">No project found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bronze flex flex-col">
      <EditorHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <PageSidebar />
        
        <div className="flex-1 flex flex-col">
          <EditorCanvas />
          <ComponentToolbar />
        </div>
        
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default EditorPage;