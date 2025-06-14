import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Trash2, QrCode } from 'lucide-react';
import { Component, useEditorStore } from '../../store/editorStore';

interface DraggableComponentProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
  gridSize?: number;
  marginSize?: number;
  canvasWidth: number;
  canvasHeight: number;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  isSelected,
  onSelect,
  gridSize = 0,
  marginSize = 0,
  canvasWidth,
  canvasHeight
}) => {
  const { updateComponent, deleteComponent, duplicateComponent } = useEditorStore();
  const [isDragging, setIsDragging] = useState(false);

  const snapToGrid = (value: number, gridSize: number) => {
    if (gridSize === 0) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  const snapToMargin = (value: number, marginSize: number, threshold: number = 10) => {
    if (marginSize === 0) return value;
    
    // Snap to margin boundaries if within threshold
    if (Math.abs(value - marginSize) < threshold) {
      return marginSize;
    }
    if (Math.abs(value - (canvasWidth - marginSize)) < threshold) {
      return canvasWidth - marginSize;
    }
    if (Math.abs(value - (canvasHeight - marginSize)) < threshold) {
      return canvasHeight - marginSize;
    }
    
    return value;
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    
    let newX = Math.max(0, component.position.x + info.offset.x);
    let newY = Math.max(0, component.position.y + info.offset.y);
    
    // Ensure component stays within canvas bounds
    newX = Math.min(newX, canvasWidth - component.size.width);
    newY = Math.min(newY, canvasHeight - component.size.height);
    
    // Apply snapping
    if (gridSize > 0) {
      newX = snapToGrid(newX, gridSize);
      newY = snapToGrid(newY, gridSize);
    }
    
    if (marginSize > 0) {
      newX = snapToMargin(newX, marginSize);
      newY = snapToMargin(newY, marginSize);
    }
    
    updateComponent(component.id, {
      position: {
        x: newX,
        y: newY
      }
    });
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'text':
        return (
          <div
            className="w-full h-full p-2 bg-transparent border-2 border-transparent rounded cursor-text"
            style={{ fontSize: component.props.fontSize || 16 }}
          >
            <div className="text-dark-bronze font-inter">
              {component.props.content || 'New text'}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="w-full h-full bg-gray-200 rounded border-2 border-transparent overflow-hidden">
            {component.props.imageUrl ? (
              <img
                src={component.props.imageUrl}
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
              {component.props.qrLabel || 'QR Code'}
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
        left: component.position.x,
        top: component.position.y,
        width: component.size.width,
        height: component.size.height,
        zIndex: component.zIndex
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