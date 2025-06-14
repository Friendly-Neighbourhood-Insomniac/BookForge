import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface CrystalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  className?: string;
  hasGearEffect?: boolean;
}

const CrystalButton: React.FC<CrystalButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  hasGearEffect = false
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return `
          bg-porcelain-gradient hover:bg-frost-texture text-dark-bronze 
          border-2 border-brass/30 hover:border-brass/60 
          shadow-frost-glass hover:shadow-brass-glow
        `;
      case 'ghost':
        return `
          bg-glass-gradient hover:bg-frost-texture text-dark-bronze 
          border border-glass-white/20 hover:border-neon-cyan/40 
          shadow-frost-glass hover:shadow-cyan-glow
        `;
      case 'danger':
        return `
          bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
          text-white border-2 border-red-400/50 hover:border-red-300 
          shadow-frost-glass hover:shadow-red-500/50
        `;
      default: // primary
        return `
          bg-brass-gradient hover:bg-gradient-to-r hover:from-brass-light hover:to-brass 
          text-white border-2 border-brass-light/50 hover:border-neon-cyan/60 
          shadow-brass-glow hover:shadow-cyan-intense
        `;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'px-4 py-2 text-sm h-8';
      case 'lg': return 'px-8 py-4 text-lg h-14';
      case 'xl': return 'px-10 py-5 text-xl h-16';
      default: return 'px-6 py-3 text-base h-12';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative rounded-2xl font-bold transition-all duration-300 
        transform hover:-translate-y-1 active:translate-y-0 
        overflow-hidden backdrop-blur-sm
        ${getVariantClasses()} ${getSizeClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed transform-none' : ''}
        animate-ice-crack hover:animate-none
        ${className}
      `}
    >
      {/* Frost crack effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-frost-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      {/* Inner glow effect */}
      <div className="absolute inset-2 bg-gradient-to-b from-neon-cyan/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Gear decoration */}
      {hasGearEffect && (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
          <div className="w-6 h-6 border-2 border-current rounded-full relative">
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-current rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-px h-3 bg-current transform -translate-x-1/2 origin-bottom rotate-45 group-hover:rotate-[30deg] transition-transform" />
          </div>
        </div>
      )}
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {Icon && <Icon className="h-5 w-5" />}
        <span>{children}</span>
      </div>
      
      {/* Outer border glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-neon-cyan/0 group-hover:border-neon-cyan/50 transition-colors duration-300" />
      
      {/* Crystal sparkle points */}
      {!disabled && (
        <>
          <div className="absolute top-2 left-2 w-1 h-1 bg-frost-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spark-flash" />
          <div className="absolute bottom-2 right-2 w-1 h-1 bg-neon-cyan rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spark-flash" style={{ animationDelay: '0.3s' }} />
        </>
      )}
    </button>
  );
};

export default CrystalButton;