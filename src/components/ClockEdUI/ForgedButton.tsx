import React from 'react';

interface ForgedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ForgedButton: React.FC<ForgedButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  className = "" 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`group relative w-full h-16 bg-gradient-to-b from-brass-light via-brass to-brass-dark rounded-2xl shadow-brass-glow border-4 border-brass-light/50 hover:shadow-cyan-glow transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-2 bg-gradient-to-b from-neon-cyan/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {children}
      </div>
      
      {/* Outer border glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-neon-cyan/0 group-hover:border-neon-cyan/50 transition-colors duration-300"></div>
    </button>
  );
};

export default ForgedButton;