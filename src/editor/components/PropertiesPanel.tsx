import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Type, Image as ImageIcon, QrCode, Upload, BookOpen, FileText, Palette, X } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

interface PropertiesPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ isOpen = true, onClose }) => {
  const { 
    project, 
    activePageId, 
    selectedComponentId, 
    updateComponent, 
    updateProject 
  } = useEditorStore();

  const [coverUrl, setCoverUrl] = useState(project?.cover_url || '');

  const activePage = project?.pages.find(p => p.id === activePageId);
  const selectedComponent = activePage?.components.find(c => c.id === selectedComponentId);

  const handleProjectUpdate = (field: string, value: string) => {
    updateProject({ [field]: value });
  };

  const handleProjectTypeToggle = () => {
    const newType = project?.project_type === 'textbook' ? 'workbook' : 'textbook';
    updateProject({ project_type: newType });
  };

  const handleCoverUrlChange = (url: string) => {
    setCoverUrl(url);
    updateProject({ cover_url: url });
  };

  const handleComponentUpdate = (field: string, value: any) => {
    if (selectedComponent) {
      // Handle nested property updates
      if (field.startsWith('position.') || field.startsWith('size.') || field.startsWith('props.')) {
        const [parent, child] = field.split('.');
        const updates = {
          [parent]: {
            ...selectedComponent[parent as keyof typeof selectedComponent],
            [child]: value
          }
        };
        updateComponent(selectedComponent.id, updates);
      } else {
        updateComponent(selectedComponent.id, { [field]: value });
      }
    }
  };

  const handleFileUpload = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // In a real app, you would upload this to a storage service
        // For now, we'll create a local URL
        const url = URL.createObjectURL(file);
        handleCoverUrlChange(url);
      }
    };
    input.click();
  };

  const PanelContent = () => (
    <div className="relative z-10 p-4 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-brass animate-spin-slow" />
          <h3 className="text-lg font-cinzel font-bold text-dark-bronze">Properties</h3>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="p-2 text-dark-bronze hover:text-brass transition-colors rounded-lg hover:bg-brass/10 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Project Properties */}
      <motion.div
        className="p-4 bg-porcelain rounded-xl border-2 border-brass/20 shadow-porcelain"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-brass rounded-full"></div>
          <span>Book Properties</span>
        </h4>
        
        <div className="space-y-4">
          {/* Book Title */}
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

          {/* Project Type Toggle */}
          <div>
            <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
              Book Type
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleProjectTypeToggle}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 ${
                  project?.project_type === 'textbook'
                    ? 'bg-brass-gradient text-white border-brass shadow-brass'
                    : 'bg-white text-dark-bronze border-brass/30 hover:border-brass/60'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-medium">Textbook</span>
              </button>
              <button
                onClick={handleProjectTypeToggle}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border-2 transition-all duration-300 ${
                  project?.project_type === 'workbook'
                    ? 'bg-brass-gradient text-white border-brass shadow-brass'
                    : 'bg-white text-dark-bronze border-brass/30 hover:border-brass/60'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Workbook</span>
              </button>
            </div>
          </div>
          
          {/* Author */}
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
          
          {/* Description */}
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

      {/* Cover Settings */}
      <motion.div
        className="p-4 bg-gradient-to-br from-brass/10 to-neon-cyan/5 rounded-xl border-2 border-brass/30 shadow-brass-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
          <ImageIcon className="h-4 w-4 text-brass" />
          <span>Cover Settings</span>
        </h4>

        <div className="space-y-4">
          {/* Cover URL Input */}
          <div>
            <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverUrl}
              onChange={(e) => handleCoverUrlChange(e.target.value)}
              className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
              placeholder="Enter image URL"
            />
          </div>

          {/* Upload Button */}
          <button
            onClick={handleFileUpload}
            className="w-full flex items-center justify-center space-x-2 bg-brass-gradient text-white px-3 py-2 rounded-lg text-sm font-medium hover:shadow-brass-glow transition-all duration-300"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Cover Image</span>
          </button>

          {/* Cover Preview */}
          {coverUrl && (
            <div className="mt-3">
              <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
                Preview
              </label>
              <div className="w-full h-24 bg-gray-100 rounded-lg border border-brass/30 overflow-hidden">
                <img
                  src={coverUrl}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Template Settings */}
      <motion.div
        className="p-4 bg-gradient-to-br from-neon-cyan/10 to-brass/5 rounded-xl border-2 border-neon-cyan/30 shadow-cyan-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
          <Palette className="h-4 w-4 text-neon-cyan" />
          <span>Cover Templates</span>
        </h4>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-brass/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="h-8 w-8 text-brass/40" />
          </div>
          <p className="text-dark-bronze/60 font-inter text-sm">
            No templates available
          </p>
          <p className="text-dark-bronze/40 font-inter text-xs mt-1">
            Templates will be added in future updates
          </p>
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
                  value={Math.round(selectedComponent.position.x)}
                  onChange={(e) => handleComponentUpdate('position.x', parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-dark-bronze/70 mb-1 font-inter">Y</label>
                <input
                  type="number"
                  value={Math.round(selectedComponent.position.y)}
                  onChange={(e) => handleComponentUpdate('position.y', parseInt(e.target.value) || 0)}
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
                  value={selectedComponent.size.width}
                  onChange={(e) => handleComponentUpdate('size.width', parseInt(e.target.value) || 100)}
                  className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-dark-bronze/70 mb-1 font-inter">Height</label>
                <input
                  type="number"
                  value={selectedComponent.size.height}
                  onChange={(e) => handleComponentUpdate('size.height', parseInt(e.target.value) || 100)}
                  className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                />
              </div>
            </div>

            {/* Z-Index */}
            <div>
              <label className="block text-xs font-medium text-dark-bronze/70 mb-1 font-inter">Layer</label>
              <input
                type="number"
                value={selectedComponent.zIndex}
                onChange={(e) => handleComponentUpdate('zIndex', parseInt(e.target.value) || 1)}
                className="w-full px-2 py-1 border border-brass/30 rounded text-sm focus:ring-1 focus:ring-brass bg-white"
                min="1"
              />
            </div>

            {/* Type-specific properties */}
            {selectedComponent.type === 'text' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Content</label>
                  <textarea
                    rows={3}
                    value={selectedComponent.props.content || ''}
                    onChange={(e) => handleComponentUpdate('props.content', e.target.value)}
                    className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white resize-none"
                    placeholder="Enter text content"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Font Size</label>
                  <input
                    type="number"
                    value={selectedComponent.props.fontSize || 16}
                    onChange={(e) => handleComponentUpdate('props.fontSize', parseInt(e.target.value) || 16)}
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
                  value={selectedComponent.props.imageUrl || ''}
                  onChange={(e) => handleComponentUpdate('props.imageUrl', e.target.value)}
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
                    value={selectedComponent.props.qrLabel || ''}
                    onChange={(e) => handleComponentUpdate('props.qrLabel', e.target.value)}
                    className="w-full px-3 py-2 border border-brass/30 rounded-lg text-sm focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white"
                    placeholder="QR Code label"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">Target URL</label>
                  <input
                    type="url"
                    value={selectedComponent.props.qrTarget || ''}
                    onChange={(e) => handleComponentUpdate('props.qrTarget', e.target.value)}
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
  );

  return (
    <>
      {/* Desktop panel */}
      <div className="hidden lg:block w-80 bg-cracked-porcelain/95 backdrop-blur-md border-l-2 border-brass/30 relative overflow-y-auto">
        {/* Background effects */}
        <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
        
        <PanelContent />
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-y-0 right-0 z-40 w-80 bg-cracked-porcelain/95 backdrop-blur-md border-l-2 border-brass/30 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Background effects */}
        <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
        
        <PanelContent />
      </div>
    </>
  );
};

export default PropertiesPanel;