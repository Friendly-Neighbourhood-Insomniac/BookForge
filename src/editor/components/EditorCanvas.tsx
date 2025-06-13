import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useEditorStore } from '../../store/editorStore';
import DraggableComponent from './DraggableComponent';

const EditorCanvas: React.FC = () => {
  const { project, activePageId, selectedComponentId, setSelectedComponentId } = useEditorStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const activePage = project?.pages.find(p => p.id === activePageId);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedComponentId(null);
    }
  };

  if (!activePage) {
    return (
      <div className="flex-1 bg-dark-bronze flex items-center justify-center">
        <div className="text-center text-porcelain/60">
          <p>No page selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-dark-bronze p-8 overflow-auto">
      <div className="flex justify-center">
        <motion.div
          ref={canvasRef}
          className="relative bg-porcelain rounded-2xl shadow-porcelain border-4 border-brass/30 overflow-hidden"
          style={{
            width: '595px',
            height: '842px', // A4 ratio
            minHeight: '842px'
          }}
          onClick={handleCanvasClick}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Canvas Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-neon-cyan/30 via-transparent to-neon-cyan/30"></div>
            <div className="absolute top-1/3 right-1/4 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"></div>
          </div>

          {/* Page Title */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-brass-gradient px-4 py-2 rounded-lg shadow-brass">
              <h2 className="text-white font-cinzel font-bold text-lg">{activePage.title}</h2>
            </div>
          </div>

          {/* Components */}
          <div className="relative w-full h-full pt-16">
            {activePage.components.map((component) => (
              <DraggableComponent
                key={component.id}
                component={component}
                isSelected={selectedComponentId === component.id}
                onSelect={() => setSelectedComponentId(component.id)}
              />
            ))}

            {/* Empty State */}
            {activePage.components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-dark-bronze/40">
                  <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-8 h-8 text-brass" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </div>
                  <p className="font-inter">Click a tool to add components</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditorCanvas;