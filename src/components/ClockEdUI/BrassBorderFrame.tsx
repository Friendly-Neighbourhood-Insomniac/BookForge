import React from 'react';

interface BrassBorderFrameProps {
  children: React.ReactNode;
  className?: string;
}

const BrassBorderFrame: React.FC<BrassBorderFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative p-6 bg-gradient-to-b from-brass-light via-brass to-brass-dark rounded-3xl shadow-brass-glow border-4 border-brass-light/70 ${className}`}>
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-brass-light rounded-tl-lg"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-brass-light rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-brass-light rounded-bl-lg"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-brass-light rounded-br-lg"></div>
      
      {/* Inner content area */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BrassBorderFrame;