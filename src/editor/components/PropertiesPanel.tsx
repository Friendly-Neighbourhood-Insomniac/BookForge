import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Type, Image as ImageIcon, QrCode, Upload } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

const PropertiesPanel: React.FC = () => {
  const { 
    project, 
    activePageId, 
    selectedComponentId, 
    updateComponent, 
    updateProject 
  } = useEditorStore();

  const activePage = project?.pages.find(p => p.id === activePageId);
  const selectedComponent = activePage?.components.find(c => c.id === selectedComponentId);

  const handleProjectUpdate = (field: string, value: string) => {
    updateProject({ [field]: value });
  };

  const handleComponentUpdate = (field: string, value: any) => {
    if (selectedComponent) {
      updateComponent(selectedComponent.id, { [field]: value });
    }
  };

  return (
    <div className="w-80 bg-cracked-porcelain/95 backdrop-blur-md border-l-2 border-brass/30 relative overflow-y-auto">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
      
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="h-5 w-5 text-brass animate-spin-slow" />
          <h3 className="text-lg font-cinzel font-bold text-dark-bronze">Properties</h3>
        </div>

        {/* Project Properties */}
        <motion.div
          className="mb-6 p-4 bg-porcelain rounded-xl border-2 border-brass/20 shadow-porcelain"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-brass rounded-full"></div>
            <span>Book Properties</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
                Book Title
              </label>
              <input
                type="text"
                value={project?.title || ''}
                onChange={(e) => handleProjectUpdate('title', e.target.value)}
                className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
                placeholder="Enter book title"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
                Author
              </label>
              <input
                type="text"
                value={project?.author || ''}
                onChange={(e) => handleProjectUpdate('author', e.target.value)}
                className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
                placeholder="Enter author name"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
                Description
              </label>
              <textarea
                rows={3}
                value={project?.description || ''}
                onChange={(e) => handleProjectUpdate('description', e.target.value)}
                className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white resize-none"
                placeholder="Enter book description"
              />
            </div>
          </div>
        </motion.div>

        {/* Component Properties */}
        {selectedComponent ? (
          <motion.div
            className="p-4 bg-gradient-to-br from-brass/10 to-neon-cyan/5 rounded-xl border-2 border-brass/30 shadow-brass-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
              {selectedComponent.type === 'text' && <Type className="h-4 w-4 text-brass" />}
              {selectedComponent.type === 'image' && <ImageIcon className="h-4 w-4 text-brass" />}
              {selectedComponent.type === 'qr' && <QrCode className="h-4 w-4 text-brass" />}
              <span className="capitalize">{selectedComponent.type} Properties</span>
            </h4>

            <div className="space-y-4">
              {/* Position */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-1 font-inter">X</label>
                  <input
                    type="number"
                    value={Math.round(selectedComponent.x)}
                    onChange={(e) => handleComponentUpdate('x', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-1 font-inter">Y</label>
                  <input
                    type="number"
                    value={Math.round(selectedComponent.y)}
                    onChange={(e) => handleComponentUpdate('y', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                  />
                </div>
              </div>

              {/* Size */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-1 font-inter">Width</label>
                  <input
                    type="number"
                    value={selectedComponent.width}
                    onChange={(e) => handleComponentUpdate('width', parseInt(e.target.value) || 100)}
                    className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-1 font-inter">Height</label>
                  <input
                    type="number"
                    value={selectedComponent.height}
                    onChange={(e) => handleComponentUpdate('height', parseInt(e.target.value) || 100)}
                    className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                  />
                </div>
              </div>

              {/* Type-specific properties */}
              {selectedComponent.type === 'text' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Content</label>
                    <textarea
                      rows={3}
                      value={selectedComponent.content || ''}
                      onChange={(e) => handleComponentUpdate('content', e.target.value)}
                      className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white resize-none"
                      placeholder="Enter text content"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Font Size</label>
                    <input
                      type="number"
                      value={selectedComponent.fontSize || 16}
                      onChange={(e) => handleComponentUpdate('fontSize', parseInt(e.target.value) || 16)}
                      className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
                      min="8"
                      max="72"
                    />
                  </div>
                </>
              )}

              {selectedComponent.type === 'image' && (
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Image URL</label>
                  <input
                    type="url"
                    value={selectedComponent.imageUrl || ''}
                    onChange={(e) => handleComponentUpdate('imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
                    placeholder="Enter image URL"
                  />
                  <button className="mt-2 w-full flex items-center justify-center space-x-2 bg-brass-gradient text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-brass-glow transition-all duration-300">
                    <Upload className="h-4 w-4" />
                    <span>Upload Image</span>
                  </button>
                </div>
              )}

              {selectedComponent.type === 'qr' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Label</label>
                    <input
                      type="text"
                      value={selectedComponent.qrLabel || ''}
                      onChange={(e) => handleComponentUpdate('qrLabel', e.target.value)}
                      className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
                      placeholder="QR Code label"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Target URL</label>
                    <input
                      type="url"
                      value={selectedComponent.qrTarget || ''}
                      onChange={(e) => handleComponentUpdate('qrTarget', e.target.value)}
                      className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
                      placeholder="https://example.com"
                    />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="p-8 text-center text-dark-bronze/60">
            <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-brass/40" />
            </div>
            <p className="font-inter">Select a component to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;