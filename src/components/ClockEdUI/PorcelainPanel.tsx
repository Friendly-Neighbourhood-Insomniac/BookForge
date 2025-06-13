import React from 'react';

interface PorcelainPanelProps {
  children: React.ReactNode;
  className?: string;
}

const PorcelainPanel: React.FC<PorcelainPanelProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-cracked-porcelain/95 backdrop-blur-md rounded-3xl shadow-porcelain border-4 border-brass/30 relative overflow-hidden ${className}`}>
      {/* Subtle crack effects */}
      <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
      <div className="absolute top-1/3 right-1/4 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/15 to-transparent"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PorcelainPanel;