import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface IcyInputProps {
  type?: 'text' | 'email' | 'password' | 'url' | 'number' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  label?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

const IcyInput: React.FC<IcyInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  label,
  error,
  disabled = false,
  rows = 3,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputClasses = `
    w-full px-4 py-3 bg-glass-gradient backdrop-blur-glass rounded-xl 
    border-2 border-glass-white/20 focus:border-neon-cyan/60 
    text-dark-bronze placeholder-dark-bronze/50 
    shadow-frost-glass focus:shadow-cyan-glow 
    transition-all duration-300 outline-none
    ${Icon ? 'pl-12' : ''}
    ${error ? 'border-red-400/60 focus:border-red-500' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${isFocused ? 'bg-frost-texture' : ''}
  `;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-dark-bronze/70 font-inter">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {/* Icon */}
        {Icon && (
          <div className={`
            absolute left-3 top-1/2 transform -translate-y-1/2 z-10
            ${isFocused ? 'text-neon-cyan' : 'text-brass'} 
            transition-colors duration-300
          `}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        
        {/* Input/Textarea */}
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`${inputClasses} resize-none`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
          />
        )}
        
        {/* Frost trail effect on focus */}
        {isFocused && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/10 to-transparent animate-wind-shimmer" />
          </div>
        )}
        
        {/* Crystal edge highlight */}
        <div className={`
          absolute inset-0 rounded-xl border border-frost-white/30 pointer-events-none
          ${isFocused ? 'border-neon-cyan/50' : ''} transition-colors duration-300
        `} />
      </div>
      
      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 font-inter flex items-center space-x-1">
          <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

export default IcyInput;