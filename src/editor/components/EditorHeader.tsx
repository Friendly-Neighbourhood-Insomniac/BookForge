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
  AlertCircle,
  Undo,
  Redo,
  Play
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import FlipbookPreviewModal from './FlipbookPreviewModal';

const EditorHeader: React.FC = () => {
  const { 
    project, 
    unsavedChanges, 
    saveStatus,
    saveProjectToSupabase,
    undo,
    redo,
    undoStack,
    redoStack
  } = useEditorStore();

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleSave = () => {
    saveProjectToSupabase();
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

  const getSaveButtonStyle = () => {
    switch (saveStatus) {
      case 'saved':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      default:
        return 'bg-brass-gradient hover:shadow-cyan-glow text-white';
    }
  };

  return (
    <>
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

            {/* Center Section - Undo/Redo */}
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={undo}
                disabled={undoStack.length === 0}
                className={`p-2 rounded-lg transition-colors ${
                  undoStack.length > 0
                    ? 'text-dark-bronze hover:text-brass hover:bg-brass/10'
                    : 'text-dark-bronze/30 cursor-not-allowed'
                }`}
                title="Undo (Ctrl+Z)"
                whileHover={undoStack.length > 0 ? { scale: 1.1 } : {}}
                whileTap={undoStack.length > 0 ? { scale: 0.9 } : {}}
              >
                <Undo className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                onClick={redo}
                disabled={redoStack.length === 0}
                className={`p-2 rounded-lg transition-colors ${
                  redoStack.length > 0
                    ? 'text-dark-bronze hover:text-brass hover:bg-brass/10'
                    : 'text-dark-bronze/30 cursor-not-allowed'
                }`}
                title="Redo (Ctrl+Y)"
                whileHover={redoStack.length > 0 ? { scale: 1.1 } : {}}
                whileTap={redoStack.length > 0 ? { scale: 0.9 } : {}}
              >
                <Redo className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 text-dark-bronze hover:text-brass transition-colors rounded-lg hover:bg-brass/10"
                title="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setShowPreviewModal(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-neon-cyan to-brass hover:shadow-cyan-glow text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-brass border border-neon-cyan/30"
              >
                <Play className="h-4 w-4" />
                <span>Flipbook Preview</span>
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 shadow-brass border-2 border-brass-light/50 ${getSaveButtonStyle()}`}
                whileHover={{ scale: saveStatus === 'saving' ? 1 : 1.05 }}
                whileTap={{ scale: saveStatus === 'saving' ? 1 : 0.95 }}
              >
                {getSaveButtonContent()}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Flipbook Preview Modal */}
      {project && (
        <FlipbookPreviewModal
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
          project={project}
        />
      )}
    </>
  );
};

export default EditorHeader;