import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEditorStore } from '../store/editorStore';
import EditorHeader from './components/EditorHeader';
import PageSidebar from './components/PageSidebar';
import EditorCanvas from './components/EditorCanvas';
import ComponentToolbar from './components/ComponentToolbar';
import PropertiesPanel from './components/PropertiesPanel';

const EditorPage: React.FC = () => {
  const { bookId } = useParams();
  const { setProject, project, isLoading } = useEditorStore();

  useEffect(() => {
    // Mock project data - in real app, this would load from Supabase
    if (bookId && !project) {
      const mockProject = {
        id: bookId,
        title: 'My Interactive Book',
        author: 'John Doe',
        description: 'An amazing interactive book',
        pages: [
          {
            id: 'page_1',
            title: 'Cover',
            components: []
          }
        ]
      };
      setProject(mockProject);
    }
  }, [bookId, project, setProject]);

  if (isLoading || !project) {
    return (
      <div className="min-h-screen bg-dark-bronze flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
          <p className="text-porcelain">Loading editor...</p>
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