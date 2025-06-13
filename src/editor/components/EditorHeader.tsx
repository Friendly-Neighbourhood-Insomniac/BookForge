import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ArrowLeft, 
  Save, 
  Eye, 
  Settings, 
  Cog,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

const EditorHeader: React.FC = () => {
  const { project, unsavedChanges, markSaved, setLoading } = useEditorStore();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    setLoading(true);
    
    try {
      // Simulate save to Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));
      markSaved();
      setSaveStatus('saved');
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <>
            <Clock className="h-4 w-4 animate-spin" />
            <span>Saving...</span>
          </>
        );
      case 'saved':
        return (
          <>
            <CheckCircle className="h-4 w-4" />
            <span>Saved</span>
          </>
        );
      case 'error':
        return (
          <>
            <AlertCircle className="h-4 w-4" />
            <span>Error</span>
          </>
        );
      default:
        return (
          <>
            <Save className="h-4 w-4" />
            <span>Save</span>
          </>
        );
    }
  };

  return (
    <header className="bg-cracked-porcelain/95 backdrop-blur-md shadow-porcelain border-b-2 border-brass/30 relative z-50">
      {/* Crack effects */}
      <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
      
      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 text-dark-bronze hover:text-brass transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-inter font-medium">Dashboard</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Cog className="h-6 w-6 text-brass animate-spin-slow" />
                <div className="absolute inset-0 h-6 w-6 bg-brass/20 rounded-full blur-sm"></div>
              </div>
              <div className="text-dark-bronze">
                <span className="text-lg font-cinzel font-bold">{project?.title || 'Untitled Book'}</span>
                {unsavedChanges && (
                  <span className="ml-2 text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-1 rounded-full">
                    Unsaved changes
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-dark-bronze hover:text-brass transition-colors rounded-lg hover:bg-brass/10">
              <Settings className="h-5 w-5" />
            </button>
            
            <Link
              to={`/preview/${project?.id}`}
              className="flex items-center space-x-2 bg-porcelain-gradient hover:bg-brass/10 text-dark-bronze px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-porcelain border border-brass/20 hover:shadow-brass-glow"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Link>
            
            <motion.button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-brass border-2 border-brass-light/50 ${
                saveStatus === 'saved'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : saveStatus === 'error'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'bg-brass-gradient hover:shadow-cyan-glow text-white'
              }`}
              whileHover={{ scale: saveStatus === 'saving' ? 1 : 1.05 }}
              whileTap={{ scale: saveStatus === 'saving' ? 1 : 0.95 }}
            >
              {getSaveButtonContent()}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;