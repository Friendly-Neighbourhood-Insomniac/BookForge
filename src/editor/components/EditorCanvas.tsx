import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Ruler, Eye, EyeOff, Cog, Settings } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { FrostedGlassPanel, CrystalButton } from '../../components/ClockEdUI';
import DraggableComponent from './DraggableComponent';

const EditorCanvas: React.FC = () => {
  const { project, activePageId, selectedComponentId, setSelectedComponentId } = useEditorStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Grid and guide states
  const [showGrid, setShowGrid] = useState(false);
  const [showMargins, setShowMargins] = useState(false);
  const [showRulers, setShowRulers] = useState(false);

  const activePage = project?.pages.find(p => p.id === activePageId);

  // Canvas dimensions (A4 ratio) - responsive
  const getCanvasDimensions = () => {
    const baseWidth = 595;
    const baseHeight = 842;
    const scale = Math.min(1, window.innerWidth < 768 ? 0.7 : 1);
    return {
      width: baseWidth * scale,
      height: baseHeight * scale,
      scale
    };
  };

  const { width: CANVAS_WIDTH, height: CANVAS_HEIGHT, scale } = getCanvasDimensions();
  const MARGIN_SIZE = 30 * scale; // Safe print area margin
  const GRID_SIZE = 20 * scale; // Grid cell size

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
          stroke="rgba(0, 234, 255, 0.3)"
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
          stroke="rgba(0, 234, 255, 0.3)"
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
          stroke="rgba(0, 234, 255, 0.6)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Corner markers */}
        <circle cx={MARGIN_SIZE} cy={MARGIN_SIZE} r="3" fill="rgba(0, 234, 255, 0.8)" />
        <circle cx={CANVAS_WIDTH - MARGIN_SIZE} cy={MARGIN_SIZE} r="3" fill="rgba(0, 234, 255, 0.8)" />
        <circle cx={MARGIN_SIZE} cy={CANVAS_HEIGHT - MARGIN_SIZE} r="3" fill="rgba(0, 234, 255, 0.8)" />
        <circle cx={CANVAS_WIDTH - MARGIN_SIZE} cy={CANVAS_HEIGHT - MARGIN_SIZE} r="3" fill="rgba(0, 234, 255, 0.8)" />
        
        {/* Margin labels */}
        <text x={MARGIN_SIZE + 5} y={MARGIN_SIZE - 5} fill="rgba(0, 234, 255, 0.8)" fontSize="10" fontFamily="Inter">
          Safe Area
        </text>
      </svg>
    );
  };

  const renderRulers = () => {
    if (!showRulers) return null;

    const horizontalMarks = [];
    const verticalMarks = [];

    // Horizontal ruler marks (every 50px scaled)
    for (let x = 0; x <= CANVAS_WIDTH; x += 50 * scale) {
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
            {Math.round(x / scale)}
          </text>
        </g>
      );
    }

    // Vertical ruler marks (every 50px scaled)
    for (let y = 0; y <= CANVAS_HEIGHT; y += 50 * scale) {
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
            {Math.round(y / scale)}
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
          style={{ backgroundColor: 'rgba(248, 249, 251, 0.8)' }}
        >
          {horizontalMarks}
        </svg>
        
        {/* Vertical ruler */}
        <svg
          className="absolute top-0 left-0 pointer-events-none z-20"
          width="20"
          height={CANVAS_HEIGHT}
          style={{ backgroundColor: 'rgba(248, 249, 251, 0.8)' }}
        >
          {verticalMarks}
        </svg>
      </>
    );
  };

  if (!activePage) {
    return (
      <div className="flex-1 bg-porcelain flex items-center justify-center">
        <FrostedGlassPanel className="p-8" glowColor="aurora">
          <div className="text-center text-dark-bronze/60">
            <p className="font-inter">No page selected</p>
          </div>
        </FrostedGlassPanel>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-porcelain p-4 sm:p-8 overflow-auto relative">
      {/* Canvas Controls */}
      <div className="flex justify-center mb-4 relative z-20">
        <FrostedGlassPanel className="flex items-center space-x-1 sm:space-x-2 p-2" borderStyle="crystal">
          <CrystalButton
            onClick={() => setShowGrid(!showGrid)}
            variant={showGrid ? "primary" : "ghost"}
            size="sm"
            icon={Grid}
          >
            <span className="hidden sm:inline">Grid</span>
          </CrystalButton>
          
          <CrystalButton
            onClick={() => setShowMargins(!showMargins)}
            variant={showMargins ? "secondary" : "ghost"}
            size="sm"
            icon={showMargins ? Eye : EyeOff}
            className={showMargins ? "border-neon-cyan/30" : ""}
          >
            <span className="hidden sm:inline">Safe Area</span>
          </CrystalButton>
          
          <CrystalButton
            onClick={() => setShowRulers(!showRulers)}
            variant={showRulers ? "primary" : "ghost"}
            size="sm"
            icon={Ruler}
          >
            <span className="hidden sm:inline">Rulers</span>
          </CrystalButton>
        </FrostedGlassPanel>
      </div>

      <div className="flex justify-center relative z-10">
        <motion.div
          ref={canvasRef}
          className="relative bg-porcelain-gradient rounded-2xl shadow-frost-glass border-4 border-neon-cyan/20 overflow-hidden"
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
          <div className="absolute inset-0 bg-frost-texture opacity-20">
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-neon-cyan/30 via-transparent to-neon-cyan/30"></div>
            <div className="absolute top-1/3 right-1/4 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"></div>
          </div>

          {/* Page Title */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <FrostedGlassPanel className="px-4 py-2" glowColor="brass" borderStyle="embossed">
              <h2 className="text-dark-bronze font-cinzel font-bold text-sm sm:text-lg flex items-center space-x-2">
                <Cog className="h-4 w-4 text-brass animate-spin-slow" />
                <span>{activePage.title}</span>
              </h2>
            </FrostedGlassPanel>
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
                scale={scale}
              />
            ))}

            {/* Empty State */}
            {activePage.components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FrostedGlassPanel className="p-8 text-center" glowColor="aurora" hasGearCorner>
                  <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Settings className="w-8 h-8 text-brass" />
                    </motion.div>
                  </div>
                  <p className="font-inter text-sm sm:text-base text-dark-bronze/60">Click a tool to add components</p>
                </FrostedGlassPanel>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EditorCanvas;