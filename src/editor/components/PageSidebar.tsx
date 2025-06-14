import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Cog, Trash2, Edit2 } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

const PageSidebar: React.FC = () => {
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

  return (
    <div className="w-64 bg-cracked-porcelain/95 backdrop-blur-md border-r-2 border-brass/30 relative overflow-y-auto">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
      
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-brass" />
            <h3 className="text-lg font-cinzel font-bold text-dark-bronze">Pages</h3>
            <span className="text-xs bg-brass/20 text-brass px-2 py-1 rounded-full">
              {project.pages.length}
            </span>
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
              onClick={() => setActivePageId(page.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`relative p-3 rounded-xl border-2 transition-all duration-300 ${
                activePageId === page.id
                  ? 'bg-brass-gradient border-neon-cyan shadow-cyan-glow'
                  : 'bg-porcelain border-brass/30 hover:border-brass/60 hover:shadow-brass-glow'
              }`}>
                {/* Floating gear for active page */}
                {activePageId === page.id && (
                  <div className="absolute top-1 right-1 opacity-30">
                    <Cog className="h-4 w-4 text-white animate-spin-slow" />
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  {/* Page Thumbnail */}
                  <div className={`w-12 h-16 rounded border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 relative ${
                    activePageId === page.id
                      ? 'bg-porcelain border-neon-cyan text-dark-bronze'
                      : 'bg-white border-brass/30 text-brass'
                  }`}>
                    {index + 1}
                    
                    {/* Component count indicator */}
                    {page.components.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-cyan rounded-full flex items-center justify-center">
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
                    }`}>
                      {page.components.length} components
                    </p>
                  </div>
                  
                  {/* Page Actions */}
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const newTitle = prompt('Enter new page title:', page.title);
                        if (newTitle && newTitle.trim()) {
                          handlePageTitleEdit(page.id, newTitle.trim());
                        }
                      }}
                      className="p-1 rounded hover:bg-brass/20 transition-colors"
                      title="Edit page title"
                    >
                      <Edit2 className="h-3 w-3 text-dark-bronze/60" />
                    </button>
                    
                    {project.pages.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePage(page.id);
                        }}
                        className="p-1 rounded hover:bg-red-500/20 transition-colors"
                        title="Delete page"
                      >
                        <Trash2 className="h-3 w-3 text-red-500/60" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add Page Button */}
          <motion.button
            onClick={addPage}
            className="group w-full p-3 border-2 border-dashed border-brass/40 rounded-xl text-dark-bronze hover:border-brass/60 hover:bg-brass/5 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-16 bg-brass/10 border-2 border-dashed border-brass/30 rounded flex items-center justify-center group-hover:border-brass/50 transition-colors">
                <Plus className="h-5 w-5 text-brass" />
              </div>
              <div className="text-left">
                <span className="font-inter font-medium block">Add Page</span>
                <span className="text-xs text-dark-bronze/60">Create new page</span>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PageSidebar;