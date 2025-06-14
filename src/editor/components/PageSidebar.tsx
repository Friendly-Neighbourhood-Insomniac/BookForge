import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Cog, Trash2, Edit2, X, Settings } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { FrostedGlassPanel, CrystalButton } from '../../components/ClockEdUI';

interface PageSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PageSidebar: React.FC<PageSidebarProps> = ({ isOpen = true, onClose }) => {
  const { project, activePageId, setActivePageId, addPage, updateProject } = useEditorStore();

  const handlePageTitleEdit = (pageId: string, newTitle: string) => {
    if (!project) return;
    
    const updatedPages = project.pages.map(page =>
      page.id === pageId ? { ...page, title: newTitle } : page
    );
    
    updateProject({ pages: updatedPages });
  };

  const handleDeletePage = (pageId: string) => {
    if (!project || project.pages.length <= 1) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this page?');
    if (!confirmDelete) return;
    
    const updatedPages = project.pages.filter(page => page.id !== pageId);
    
    // If deleting active page, switch to first remaining page
    const newActivePageId = activePageId === pageId ? updatedPages[0]?.id : activePageId;
    
    updateProject({ pages: updatedPages });
    if (newActivePageId) {
      setActivePageId(newActivePageId);
    }
  };

  if (!project) return null;

  const SidebarContent = () => (
    <div className="relative z-10 p-4 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <FileText className="h-5 w-5 text-brass" />
              <div className="absolute inset-0 h-5 w-5 bg-brass/20 rounded-full blur-sm"></div>
            </div>
            <h3 className="text-lg font-cinzel font-bold text-dark-bronze">Pages</h3>
            <FrostedGlassPanel className="px-2 py-1" borderStyle="crystal">
              <span className="text-xs text-brass font-inter font-bold">
                {project.pages.length}
              </span>
            </FrostedGlassPanel>
          </div>
          
          {/* Close button for mobile */}
          {onClose && (
            <CrystalButton
              onClick={onClose}
              variant="ghost"
              size="sm"
              icon={X}
              className="lg:hidden"
            />
          )}
        </div>
      </div>

      {/* Pages List */}
      <div className="space-y-3">
        {project.pages.map((page, index) => (
          <motion.div
            key={page.id}
            className={`group cursor-pointer transition-all duration-300 ${
              activePageId === page.id ? 'transform -translate-y-1' : ''
            }`}
            onClick={() => {
              setActivePageId(page.id);
              onClose?.();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FrostedGlassPanel 
              className={`p-3 ${
                activePageId === page.id 
                  ? 'bg-brass-gradient border-neon-cyan/60' 
                  : 'hover:border-brass/60'
              }`}
              glowColor={activePageId === page.id ? "cyan" : "brass"}
              borderStyle={activePageId === page.id ? "crystal" : "standard"}
              hasGearCorner={activePageId === page.id}
            >
              <div className="flex items-center space-x-3">
                {/* Page Thumbnail */}
                <div className={`w-12 h-16 rounded border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 relative ${
                  activePageId === page.id
                    ? 'bg-porcelain border-neon-cyan text-dark-bronze'
                    : 'bg-frost-white border-brass/30 text-brass'
                }`}>
                  {index + 1}
                  
                  {/* Component count indicator */}
                  {page.components.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-cyan rounded-full flex items-center justify-center shadow-cyan-glow">
                      <span className="text-xs text-white font-bold">
                        {page.components.length}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Page Info */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={page.title}
                    onChange={(e) => handlePageTitleEdit(page.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={`w-full bg-transparent border-none outline-none font-inter font-medium truncate ${
                      activePageId === page.id ? 'text-white' : 'text-dark-bronze'
                    }`}
                    style={{ fontSize: '14px' }}
                  />
                  <p className={`text-xs ${
                    activePageId === page.id ? 'text-white/70' : 'text-dark-bronze/60'
                  } font-inter`}>
                    {page.components.length} components
                  </p>
                </div>
                
                {/* Page Actions */}
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CrystalButton
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTitle = prompt('Enter new page title:', page.title);
                      if (newTitle && newTitle.trim()) {
                        handlePageTitleEdit(page.id, newTitle.trim());
                      }
                    }}
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    className="p-1 h-6 w-6"
                  />
                  
                  {project.pages.length > 1 && (
                    <CrystalButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePage(page.id);
                      }}
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      className="p-1 h-6 w-6"
                    />
                  )}
                </div>
              </div>
            </FrostedGlassPanel>
          </motion.div>
        ))}

        {/* Add Page Button */}
        <motion.div>
          <FrostedGlassPanel 
            className="p-3 border-2 border-dashed border-brass/40 hover:border-brass/60 hover:bg-glass-gradient transition-all duration-300 cursor-pointer group"
            onClick={() => {
              addPage();
              onClose?.();
            }}
            glowColor="aurora"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-16 bg-brass/10 border-2 border-dashed border-brass/30 rounded flex items-center justify-center group-hover:border-brass/50 transition-colors">
                <Plus className="h-5 w-5 text-brass" />
              </div>
              <div className="text-left">
                <span className="font-inter font-medium block text-dark-bronze">Add Page</span>
                <span className="text-xs text-dark-bronze/60 font-inter">Create new page</span>
              </div>
            </div>
          </FrostedGlassPanel>
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 relative border-r border-glass-white/20">
        <FrostedGlassPanel className="h-full rounded-none border-0 border-r border-neon-cyan/20" borderStyle="standard">
          <SidebarContent />
        </FrostedGlassPanel>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <FrostedGlassPanel className="h-full rounded-none border-0 border-r border-neon-cyan/20" borderStyle="standard">
          <SidebarContent />
        </FrostedGlassPanel>
      </div>
    </>
  );
};

export default PageSidebar;