import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Type, Image as ImageIcon, QrCode, Upload, BookOpen, FileText, Palette, X, Cog } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { FrostedGlassPanel, CrystalButton, IcyInput } from '../../components/ClockEdUI';

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
          <div className="relative">
            <Settings className="h-5 w-5 text-brass animate-spin-slow" />
            <div className="absolute inset-0 h-5 w-5 bg-brass/20 rounded-full blur-sm"></div>
          </div>
          <h3 className="text-lg font-cinzel font-bold text-dark-bronze">Properties</h3>
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

      {/* Project Properties */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <FrostedGlassPanel glowColor="brass" borderStyle="embossed" hasGearCorner>
          <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-brass rounded-full animate-pulse"></div>
            <span>Book Properties</span>
          </h4>
          
          <div className="space-y-4">
            {/* Book Title */}
            <IcyInput
              value={project?.title || ''}
              onChange={(value) => handleProjectUpdate('title', value)}
              placeholder="Enter book title"
              label="Book Title"
            />

            {/* Project Type Toggle */}
            <div>
              <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
                Book Type
              </label>
              <div className="flex items-center space-x-2">
                <CrystalButton
                  onClick={handleProjectTypeToggle}
                  variant={project?.project_type === 'textbook' ? 'primary' : 'ghost'}
                  size="sm"
                  icon={BookOpen}
                  className="flex-1"
                >
                  Textbook
                </CrystalButton>
                <CrystalButton
                  onClick={handleProjectTypeToggle}
                  variant={project?.project_type === 'workbook' ? 'primary' : 'ghost'}
                  size="sm"
                  icon={FileText}
                  className="flex-1"
                >
                  Workbook
                </CrystalButton>
              </div>
            </div>
            
            {/* Author */}
            <IcyInput
              value={project?.author || ''}
              onChange={(value) => handleProjectUpdate('author', value)}
              placeholder="Enter author name"
              label="Author"
            />
            
            {/* Description */}
            <IcyInput
              type="textarea"
              value={project?.description || ''}
              onChange={(value) => handleProjectUpdate('description', value)}
              placeholder="Enter book description"
              label="Description"
              rows={3}
            />
          </div>
        </FrostedGlassPanel>
      </motion.div>

      {/* Cover Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <FrostedGlassPanel glowColor="cyan" borderStyle="crystal">
          <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
            <ImageIcon className="h-4 w-4 text-neon-cyan" />
            <span>Cover Settings</span>
          </h4>

          <div className="space-y-4">
            {/* Cover URL Input */}
            <IcyInput
              type="url"
              value={coverUrl}
              onChange={handleCoverUrlChange}
              placeholder="Enter image URL"
              label="Cover Image URL"
            />

            {/* Upload Button */}
            <CrystalButton
              onClick={handleFileUpload}
              variant="secondary"
              size="md"
              icon={Upload}
              className="w-full"
            >
              Upload Cover Image
            </CrystalButton>

            {/* Cover Preview */}
            {coverUrl && (
              <div className="mt-3">
                <label className="block text-xs font-medium text-dark-bronze/70 mb-2 font-inter">
                  Preview
                </label>
                <FrostedGlassPanel className="p-0 overflow-hidden" borderStyle="crystal">
                  <div className="w-full h-24 bg-porcelain-gradient overflow-hidden">
                    <img
                      src={coverUrl}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </FrostedGlassPanel>
              </div>
            )}
          </div>
        </FrostedGlassPanel>
      </motion.div>

      {/* Template Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <FrostedGlassPanel glowColor="aurora" borderStyle="standard">
          <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
            <Palette className="h-4 w-4 text-aurora-glow" />
            <span>Cover Templates</span>
          </h4>

          <div className="text-center py-8">
            <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Palette className="h-8 w-8 text-dark-bronze" />
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-brass/30"></div>
            </div>
            <p className="text-dark-bronze font-inter text-sm font-medium">
              No templates available
            </p>
            <p className="text-dark-bronze/70 font-inter text-xs mt-1">
              Templates will be added in future updates
            </p>
          </div>
        </FrostedGlassPanel>
      </motion.div>

      {/* Component Properties */}
      {selectedComponent ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FrostedGlassPanel glowColor="brass" borderStyle="embossed" hasGearCorner>
            <h4 className="font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
              {selectedComponent.type === 'text' && <Type className="h-4 w-4 text-brass" />}
              {selectedComponent.type === 'image' && <ImageIcon className="h-4 w-4 text-brass" />}
              {selectedComponent.type === 'qr' && <QrCode className="h-4 w-4 text-brass" />}
              <span className="capitalize">{selectedComponent.type} Properties</span>
            </h4>

            <div className="space-y-4">
              {/* Position */}
              <div className="grid grid-cols-2 gap-3">
                <IcyInput
                  type="number"
                  value={Math.round(selectedComponent.position.x).toString()}
                  onChange={(value) => handleComponentUpdate('position.x', parseInt(value) || 0)}
                  label="X Position"
                />
                <IcyInput
                  type="number"
                  value={Math.round(selectedComponent.position.y).toString()}
                  onChange={(value) => handleComponentUpdate('position.y', parseInt(value) || 0)}
                  label="Y Position"
                />
              </div>

              {/* Size */}
              <div className="grid grid-cols-2 gap-3">
                <IcyInput
                  type="number"
                  value={selectedComponent.size.width.toString()}
                  onChange={(value) => handleComponentUpdate('size.width', parseInt(value) || 100)}
                  label="Width"
                />
                <IcyInput
                  type="number"
                  value={selectedComponent.size.height.toString()}
                  onChange={(value) => handleComponentUpdate('size.height', parseInt(value) || 100)}
                  label="Height"
                />
              </div>

              {/* Z-Index */}
              <IcyInput
                type="number"
                value={selectedComponent.zIndex.toString()}
                onChange={(value) => handleComponentUpdate('zIndex', parseInt(value) || 1)}
                label="Layer (Z-Index)"
              />

              {/* Type-specific properties */}
              {selectedComponent.type === 'text' && (
                <div className="space-y-4">
                  <IcyInput
                    type="textarea"
                    value={selectedComponent.props.content || ''}
                    onChange={(value) => handleComponentUpdate('props.content', value)}
                    placeholder="Enter text content"
                    label="Text Content"
                    rows={3}
                  />
                  <IcyInput
                    type="number"
                    value={(selectedComponent.props.fontSize || 16).toString()}
                    onChange={(value) => handleComponentUpdate('props.fontSize', parseInt(value) || 16)}
                    label="Font Size (px)"
                  />
                </div>
              )}

              {selectedComponent.type === 'image' && (
                <div className="space-y-4">
                  <IcyInput
                    type="url"
                    value={selectedComponent.props.imageUrl || ''}
                    onChange={(value) => handleComponentUpdate('props.imageUrl', value)}
                    placeholder="Enter image URL"
                    label="Image URL"
                  />
                  <CrystalButton
                    variant="secondary"
                    size="md"
                    icon={Upload}
                    className="w-full"
                  >
                    Upload Image
                  </CrystalButton>
                </div>
              )}

              {selectedComponent.type === 'qr' && (
                <div className="space-y-4">
                  <IcyInput
                    value={selectedComponent.props.qrLabel || ''}
                    onChange={(value) => handleComponentUpdate('props.qrLabel', value)}
                    placeholder="QR Code label"
                    label="Label"
                  />
                  <IcyInput
                    type="url"
                    value={selectedComponent.props.qrTarget || ''}
                    onChange={(value) => handleComponentUpdate('props.qrTarget', value)}
                    placeholder="https://example.com"
                    label="Target URL"
                  />
                </div>
              )}
            </div>
          </FrostedGlassPanel>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FrostedGlassPanel className="p-8 text-center" glowColor="aurora" hasGearCorner>
            <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Settings className="h-8 w-8 text-dark-bronze" />
              <div className="absolute inset-0 rounded-full">
                <Cog className="h-4 w-4 text-brass/40 absolute top-0 right-0 animate-spin-slow" />
              </div>
            </div>
            <p className="font-inter text-dark-bronze font-medium">Select a component to edit its properties</p>
          </FrostedGlassPanel>
        </motion.div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop panel */}
      <div className="hidden lg:block w-80 relative border-l border-glass-white/20">
        <FrostedGlassPanel className="h-full rounded-none border-0 border-l border-neon-cyan/20" borderStyle="standard">
          <PanelContent />
        </FrostedGlassPanel>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-y-0 right-0 z-40 w-80 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <FrostedGlassPanel className="h-full rounded-none border-0 border-l border-neon-cyan/20" borderStyle="standard">
          <PanelContent />
        </FrostedGlassPanel>
      </div>
    </>
  );
};

export default PropertiesPanel;