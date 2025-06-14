import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Trash2, QrCode, Cog } from 'lucide-react';
import { Component, useEditorStore } from '../../store/editorStore';

interface DraggableComponentProps {
  component: Component;
  isSelected: boolean;
  onSelect: () => void;
  gridSize?: number;
  marginSize?: number;
  canvasWidth: number;
  canvasHeight: number;
  scale?: number;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  component,
  isSelected,
  onSelect,
  gridSize = 0,
  marginSize = 0,
  canvasWidth,
  canvasHeight,
  scale = 1
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
            className="w-full h-full p-2 bg-transparent border-2 border-transparent rounded cursor-text relative group"
            style={{ fontSize: (component.props.fontSize || 16) * scale }}
          >
            {/* Crystal text background */}
            <div className="absolute inset-0 bg-glass-gradient backdrop-blur-xs rounded border border-glass-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 text-dark-bronze font-inter">
              {component.props.content || 'New text'}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="w-full h-full bg-porcelain-gradient rounded border-2 border-glass-white/20 overflow-hidden relative group shadow-frost-glass">
            {component.props.imageUrl ? (
              <img
                src={component.props.imageUrl}
                alt="Component"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-dark-bronze/40 bg-frost-texture">
                <span className="text-sm font-inter">No image</span>
              </div>
            )}
            
            {/* Crystal overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 border border-neon-cyan/0 group-hover:border-neon-cyan/30 rounded transition-colors duration-300"></div>
          </div>
        );
      
      case 'qr':
        return (
          <div className="w-full h-full bg-porcelain-gradient rounded border-2 border-brass/30 flex flex-col items-center justify-center p-2 relative group shadow-frost-glass">
            {/* Crystal frame */}
            <div className="absolute inset-0 bg-frost-texture opacity-20 rounded"></div>
            <div className="absolute inset-0 border border-brass/0 group-hover:border-brass/50 rounded transition-colors duration-300"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative mb-2">
                <QrCode className="h-16 w-16 text-dark-bronze" />
                <div className="absolute inset-0 bg-brass/20 rounded blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-xs text-dark-bronze text-center font-inter">
                {component.props.qrLabel || 'QR Code'}
              </span>
            </div>
            
            {/* Gear corner decoration */}
            <div className="absolute top-1 right-1 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
              <Cog className="h-3 w-3 text-brass animate-spin-slow" />
            </div>
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
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Component Content */}
      <div className={`w-full h-full ${isSelected ? 'ring-2 ring-neon-cyan ring-opacity-60 shadow-cyan-glow' : ''} rounded transition-all duration-300`}>
        {renderComponent()}
      </div>

      {/* Crystal Selection Outline */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-neon-cyan rounded pointer-events-none shadow-cyan-glow">
          {/* Crystal Corner Handles */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-neon-cyan rounded-full shadow-cyan-glow border-2 border-frost-white animate-pulse"></div>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon-cyan rounded-full shadow-cyan-glow border-2 border-frost-white animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-neon-cyan rounded-full shadow-cyan-glow border-2 border-frost-white animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-neon-cyan rounded-full shadow-cyan-glow border-2 border-frost-white animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Crystal edge lines */}
          <div className="absolute inset-0 border border-frost-white/50 rounded"></div>
        </div>
      )}

      {/* Crystal Context Menu */}
      {isSelected && (
        <motion.div
          className="absolute -top-12 left-0 flex items-center space-x-1 bg-glass-gradient backdrop-blur-frost rounded-lg p-1 shadow-frost-glass border border-neon-cyan/30"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              duplicateComponent(component.id);
            }}
            className="p-2 text-dark-bronze hover:text-neon-cyan transition-colors rounded border border-transparent hover:border-neon-cyan/30 hover:bg-frost-texture group"
            title="Duplicate"
          >
            <Copy className="h-4 w-4" />
            <div className="absolute inset-0 bg-neon-cyan/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteComponent(component.id);
            }}
            className="p-2 text-dark-bronze hover:text-red-400 transition-colors rounded border border-transparent hover:border-red-400/30 hover:bg-red-50 group"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
            <div className="absolute inset-0 bg-red-400/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          {/* Crystal menu sparkles */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-neon-cyan rounded-full animate-spark-flash"></div>
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-brass rounded-full animate-spark-flash" style={{ animationDelay: '0.5s' }}></div>
        </motion.div>
      )}

      {/* Floating gear for selected component */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 opacity-40 animate-pulse">
          <div className="relative">
            <Cog className="h-6 w-6 text-brass animate-spin-slow" />
            <div className="absolute inset-0 h-6 w-6 bg-brass/20 rounded-full blur-sm"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DraggableComponent;