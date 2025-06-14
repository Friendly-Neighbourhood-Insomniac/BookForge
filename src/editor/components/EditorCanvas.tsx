import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Ruler, Eye, EyeOff } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import DraggableComponent from './DraggableComponent';

const EditorCanvas: React.FC = () => {
  const { project, activePageId, selectedComponentId, setSelectedComponentId } = useEditorStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Grid and guide states
  const [showGrid, setShowGrid] = useState(false);
  const [showMargins, setShowMargins] = useState(false);
  const [showRulers, setShowRulers] = useState(false);

  const activePage = project?.pages.find(p => p.id === activePageId);

  // Canvas dimensions (A4 ratio)
  const CANVAS_WIDTH = 595;
  const CANVAS_HEIGHT = 842;
  const MARGIN_SIZE = 30; // Safe print area margin
  const GRID_SIZE = 20; // Grid cell size

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedComponentId(null);
    }
  };

  const renderGrid = () => {
    if (!showGrid) return null;

    const verticalLines = [];
    const horizontalLines = [];

    // Vertical grid lines
    for (let x = GRID_SIZE; x < CANVAS_WIDTH; x += GRID_SIZE) {
      verticalLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={CANVAS_HEIGHT}
          stroke="rgba(212, 175, 55, 0.3)"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      );
    }

    // Horizontal grid lines
    for (let y = GRID_SIZE; y < CANVAS_HEIGHT; y += GRID_SIZE) {
      horizontalLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={CANVAS_WIDTH}
          y2={y}
          stroke="rgba(212, 175, 55, 0.3)"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
      );
    }

    return (
      <svg
        className="absolute inset-0 pointer-events-none z-20"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ top: 0, left: 0 }}
      >
        {verticalLines}
        {horizontalLines}
      </svg>
    );
  };

  const renderMargins = () => {
    if (!showMargins) return null;

    return (
      <svg
        className="absolute inset-0 pointer-events-none z-20"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ top: 0, left: 0 }}
      >
        {/* Safe print area rectangle */}
        <rect
          x={MARGIN_SIZE}
          y={MARGIN_SIZE}
          width={CANVAS_WIDTH - (MARGIN_SIZE * 2)}
          height={CANVAS_HEIGHT - (MARGIN_SIZE * 2)}
          fill="none"
          stroke="rgba(0, 240, 255, 0.6)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Corner markers */}
        <circle cx={MARGIN_SIZE} cy={MARGIN_SIZE} r="3" fill="rgba(0, 240, 255, 0.8)" />
        <circle cx={CANVAS_WIDTH - MARGIN_SIZE} cy={MARGIN_SIZE} r="3" fill="rgba(0, 240, 255, 0.8)" />
        <circle cx={MARGIN_SIZE} cy={CANVAS_HEIGHT - MARGIN_SIZE} r="3" fill="rgba(0, 240, 255, 0.8)" />
        <circle cx={CANVAS_WIDTH - MARGIN_SIZE} cy={CANVAS_HEIGHT - MARGIN_SIZE} r="3" fill="rgba(0, 240, 255, 0.8)" />
        
        {/* Margin labels */}
        <text x={MARGIN_SIZE + 5} y={MARGIN_SIZE - 5} fill="rgba(0, 240, 255, 0.8)" fontSize="10" fontFamily="Inter">
          Safe Area
        </text>
      </svg>
    );
  };

  const renderRulers = () => {
    if (!showRulers) return null;

    const horizontalMarks = [];
    const verticalMarks = [];

    // Horizontal ruler marks (every 50px)
    for (let x = 0; x <= CANVAS_WIDTH; x += 50) {
      horizontalMarks.push(
        <g key={`h-mark-${x}`}>
          <line
            x1={x}
            y1={0}
            x2={x}
            y2={10}
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="1"
          />
          <text
            x={x + 2}
            y={8}
            fill="rgba(212, 175, 55, 0.8)"
            fontSize="8"
            fontFamily="Inter"
          >
            {x}
          </text>
        </g>
      );
    }

    // Vertical ruler marks (every 50px)
    for (let y = 0; y <= CANVAS_HEIGHT; y += 50) {
      verticalMarks.push(
        <g key={`v-mark-${y}`}>
          <line
            x1={0}
            y1={y}
            x2={10}
            y2={y}
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="1"
          />
          <text
            x={2}
            y={y - 2}
            fill="rgba(212, 175, 55, 0.8)"
            fontSize="8"
            fontFamily="Inter"
          >
            {y}
          </text>
        </g>
      );
    }

    return (
      <>
        {/* Horizontal ruler */}
        <svg
          className="absolute top-0 left-0 pointer-events-none z-20"
          width={CANVAS_WIDTH}
          height="20"
          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
        >
          {horizontalMarks}
        </svg>
        
        {/* Vertical ruler */}
        <svg
          className="absolute top-0 left-0 pointer-events-none z-20"
          width="20"
          height={CANVAS_HEIGHT}
          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
        >
          {verticalMarks}
        </svg>
      </>
    );
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
      {/* Canvas Controls */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-2 bg-cracked-porcelain/95 backdrop-blur-md rounded-xl p-2 border border-brass/30">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
              showGrid
                ? 'bg-brass-gradient text-white shadow-brass'
                : 'text-dark-bronze hover:bg-brass/10'
            }`}
            title="Toggle Grid"
          >
            <Grid className="h-4 w-4" />
            <span>Grid</span>
          </button>
          
          <button
            onClick={() => setShowMargins(!showMargins)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
              showMargins
                ? 'bg-gradient-to-r from-neon-cyan to-brass text-white shadow-cyan-glow'
                : 'text-dark-bronze hover:bg-brass/10'
            }`}
            title="Toggle Safe Area"
          >
            {showMargins ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <span>Safe Area</span>
          </button>
          
          <button
            onClick={() => setShowRulers(!showRulers)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
              showRulers
                ? 'bg-brass-gradient text-white shadow-brass'
                : 'text-dark-bronze hover:bg-brass/10'
            }`}
            title="Toggle Rulers"
          >
            <Ruler className="h-4 w-4" />
            <span>Rulers</span>
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <motion.div
          ref={canvasRef}
          className="relative bg-porcelain rounded-2xl shadow-porcelain border-4 border-brass/30 overflow-hidden"
          style={{
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            minHeight: `${CANVAS_HEIGHT}px`
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

          {/* Grid Overlay */}
          {renderGrid()}

          {/* Margin Guides */}
          {renderMargins()}

          {/* Rulers */}
          {renderRulers()}

          {/* Components */}
          <div className="relative w-full h-full pt-16">
            {activePage.components.map((component) => (
              <DraggableComponent
                key={component.id}
                component={component}
                isSelected={selectedComponentId === component.id}
                onSelect={() => setSelectedComponentId(component.id)}
                gridSize={showGrid ? GRID_SIZE : 0}
                marginSize={showMargins ? MARGIN_SIZE : 0}
                canvasWidth={CANVAS_WIDTH}
                canvasHeight={CANVAS_HEIGHT}
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