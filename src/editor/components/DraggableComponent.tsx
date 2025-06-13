import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Trash2, QrCode } from 'lucide-react';
import { Component, useEditorStore } from '../../store/editorStore';

interface DraggableComponentProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  isSelected,
  onSelect
}) => {
  const { updateComponent, deleteComponent, duplicateComponent } = useEditorStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    updateComponent(component.id, {
      x: Math.max(0, component.x + info.offset.x),
      y: Math.max(0, component.y + info.offset.y)
    });
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'text':
        return (
          <div
            className="w-full h-full p-2 bg-transparent border-2 border-transparent rounded cursor-text"
            style={{ fontSize: component.fontSize || 16 }}
          >
            <div className="text-dark-bronze font-inter">
              {component.content || 'New text'}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="w-full h-full bg-gray-200 rounded border-2 border-transparent overflow-hidden">
            {component.imageUrl ? (
              <img
                src={component.imageUrl}
                alt="Component"
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-sm">No image</span>
              </div>
            )}
          </div>
        );
      
      case 'qr':
        return (
          <div className="w-full h-full bg-white rounded border-2 border-gray-300 flex flex-col items-center justify-center p-2">
            <QrCode className="h-16 w-16 text-dark-bronze mb-2" />
            <span className="text-xs text-dark-bronze text-center font-inter">
              {component.qrLabel || 'QR Code'}
            </span>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`absolute cursor-move group ${isSelected ? 'z-20' : 'z-10'}`}
      style={{
        left: component.x,
        top: component.y,
        width: component.width,
        height: component.height
      }}
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      whileHover={{ scale: isDragging ? 1 : 1.02 }}
      animate={{
        scale: isSelected ? 1.05 : 1,
        boxShadow: isSelected 
          ? '0 0 20px rgba(212, 175, 55, 0.6)' 
          : '0 0 0px rgba(212, 175, 55, 0)'
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Component Content */}
      <div className={`w-full h-full ${isSelected ? 'ring-2 ring-brass ring-opacity-60' : ''} rounded`}>
        {renderComponent()}
      </div>

      {/* Selection Outline */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-brass rounded pointer-events-none">
          {/* Corner Handles */}
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-brass rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-brass rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-brass rounded-full"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-brass rounded-full"></div>
        </div>
      )}

      {/* Context Menu */}
      {isSelected && (
        <motion.div
          className="absolute -top-12 left-0 flex items-center space-x-1 bg-dark-bronze rounded-lg p-1 shadow-lg border border-brass/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateComponent(component.id);
            }}
            className="p-1 text-porcelain hover:text-neon-cyan transition-colors"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteComponent(component.id);
            }}
            className="p-1 text-porcelain hover:text-red-400 transition-colors"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DraggableComponent;