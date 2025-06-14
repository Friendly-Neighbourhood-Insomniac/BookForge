import React from 'react';
import { Cog } from 'lucide-react';

interface FrostedGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'brass' | 'aurora';
  hasGearCorner?: boolean;
  borderStyle?: 'standard' | 'embossed' | 'crystal';
}

const FrostedGlassPanel: React.FC<FrostedGlassPanelProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  hasGearCorner = false,
  borderStyle = 'standard'
}) => {
  const getGlowClass = () => {
    switch (glowColor) {
      case 'brass': return 'shadow-brass-glow hover:shadow-brass-intense';
      case 'aurora': return 'shadow-aurora hover:shadow-cyan-glow';
      default: return 'shadow-cyan-glow hover:shadow-cyan-intense';
    }
  };

  const getBorderClass = () => {
    switch (borderStyle) {
      case 'embossed': return 'border-2 border-frost-white/40 shadow-embossed';
      case 'crystal': return 'border border-neon-cyan/30 shadow-crystal-edge';
      default: return 'border border-glass-white/20 shadow-frost-glass';
    }
  };

  return (
    <div className={`
      relative bg-glass-gradient backdrop-blur-frost rounded-3xl 
      ${getBorderClass()} ${getGlowClass()}
      transition-all duration-500 group overflow-hidden
      ${className}
    `}>
      {/* Inner frost texture */}
      <div className="absolute inset-0 bg-frost-texture opacity-30 rounded-3xl" />
      
      {/* Animated inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-brass/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Crystal shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-frost-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl opacity-0 group-hover:opacity-100" />
      
      {/* Gear corner decoration */}
      {hasGearCorner && (
        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <Cog className="h-6 w-6 text-brass animate-spin-slow" />
        </div>
      )}
      
      {/* Content wrapper */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-3xl border border-frost-white/30 pointer-events-none" />
    </div>
  );
};

export default FrostedGlassPanel;