import React from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Cog } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import PorcelainPanel from '../../components/ClockEdUI/PorcelainPanel';

const PageSidebar: React.FC = () => {
  const { project, activePageId, setActivePageId, addPage } = useEditorStore();

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
                  <div className={`w-12 h-16 rounded border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    activePageId === page.id
                      ? 'bg-porcelain border-neon-cyan text-dark-bronze'
                      : 'bg-white border-brass/30 text-brass'
                  }`}>
                    {index + 1}
                  </div>
                  
                  {/* Page Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-inter font-medium truncate ${
                      activePageId === page.id ? 'text-white' : 'text-dark-bronze'
                    }`}>
                      {page.title}
                    </p>
                    <p className={`text-xs ${
                      activePageId === page.id ? 'text-white/70' : 'text-dark-bronze/60'
                    }`}>
                      {page.components.length} components
                    </p>
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
              <span className="font-inter font-medium">Add Page</span>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PageSidebar;