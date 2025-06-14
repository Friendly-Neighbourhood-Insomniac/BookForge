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
  Play,
  Menu,
  Sliders
} from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { FrostedGlassPanel, CrystalButton } from '../../components/ClockEdUI';
import FlipbookPreviewModal from './FlipbookPreviewModal';

interface EditorHeaderProps {
  onTogglePageSidebar?: () => void;
  onTogglePropertiesPanel?: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  onTogglePageSidebar,
  onTogglePropertiesPanel
}) => {
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
        return {
          icon: Clock,
          text: 'Saving...',
          variant: 'secondary' as const
        };
      case 'saved':
        return {
          icon: CheckCircle,
          text: 'Saved',
          variant: 'secondary' as const
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'Error',
          variant: 'danger' as const
        };
      default:
        return {
          icon: Save,
          text: 'Save',
          variant: 'primary' as const
        };
    }
  };

  const saveButton = getSaveButtonContent();

  return (
    <>
      <header className="relative z-50 border-b border-glass-white/20">
        <FrostedGlassPanel className="rounded-none border-0 border-b border-neon-cyan/20">
          <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left Section */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Mobile sidebar toggles */}
                <div className="flex items-center space-x-1 lg:hidden">
                  <CrystalButton
                    variant="ghost"
                    size="sm"
                    icon={Menu}
                    onClick={onTogglePageSidebar}
                  />
                  <CrystalButton
                    variant="ghost"
                    size="sm"
                    icon={Sliders}
                    onClick={onTogglePropertiesPanel}
                  />
                </div>

                <Link to="/dashboard">
                  <CrystalButton variant="ghost" size="sm" icon={ArrowLeft}>
                    <span className="hidden sm:inline">Dashboard</span>
                  </CrystalButton>
                </Link>
                
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="relative">
                    <Cog className="h-5 w-5 sm:h-6 sm:w-6 text-brass animate-spin-slow" />
                    <div className="absolute inset-0 h-5 w-5 sm:h-6 sm:w-6 bg-brass/20 rounded-full blur-sm"></div>
                  </div>
                  <div className="text-dark-bronze min-w-0">
                    <span className="text-sm sm:text-lg font-cinzel font-bold truncate block max-w-[120px] sm:max-w-none">
                      {project?.title || 'Untitled Book'}
                    </span>
                    {unsavedChanges && (
                      <span className="text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-1 rounded-full hidden sm:inline font-inter">
                        Unsaved changes
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Center Section - Undo/Redo (hidden on mobile) */}
              <div className="hidden md:flex items-center space-x-2">
                <FrostedGlassPanel className="flex items-center space-x-1 p-1" borderStyle="crystal">
                  <motion.button
                    onClick={undo}
                    disabled={undoStack.length === 0}
                    className={`p-2 rounded-lg transition-colors ${
                      undoStack.length > 0
                        ? 'text-dark-bronze hover:text-brass hover:bg-glass-gradient'
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
                        ? 'text-dark-bronze hover:text-brass hover:bg-glass-gradient'
                        : 'text-dark-bronze/30 cursor-not-allowed'
                    }`}
                    title="Redo (Ctrl+Y)"
                    whileHover={redoStack.length > 0 ? { scale: 1.1 } : {}}
                    whileTap={redoStack.length > 0 ? { scale: 0.9 } : {}}
                  >
                    <Redo className="h-5 w-5" />
                  </motion.button>
                </FrostedGlassPanel>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-1 sm:space-x-3">
                <div className="hidden sm:block">
                  <CrystalButton variant="ghost" size="sm" icon={Settings} />
                </div>
                
                <CrystalButton
                  onClick={() => setShowPreviewModal(true)}
                  variant="secondary"
                  size="sm"
                  icon={Play}
                  className="border-neon-cyan/30 hover:border-neon-cyan/60"
                >
                  <span className="hidden sm:inline">Flipbook</span>
                </CrystalButton>
                
                <Link to={`/preview/${project?.id}`}>
                  <CrystalButton
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                  >
                    <span className="hidden sm:inline">Preview</span>
                  </CrystalButton>
                </Link>
                
                <CrystalButton
                  onClick={handleSave}
                  disabled={saveStatus === 'saving'}
                  variant={saveButton.variant}
                  size="sm"
                  icon={saveButton.icon}
                  hasGearEffect={saveStatus === 'idle'}
                >
                  <span className="hidden sm:inline">{saveButton.text}</span>
                </CrystalButton>
              </div>
            </div>
          </div>
        </FrostedGlassPanel>
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