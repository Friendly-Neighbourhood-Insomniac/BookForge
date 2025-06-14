/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
      },
      colors: {
        // Updated primary colors for icy clockpunk theme
        'porcelain': '#f2f4f7',
        'porcelain-light': '#f8f9fb',
        'porcelain-dark': '#e8ebef',
        'neon-cyan': '#00eaff',
        'neon-cyan-light': '#33edff',
        'neon-cyan-dark': '#00d4e6',
        'brass': '#d4af37',
        'brass-dark': '#8b6914',
        'brass-light': '#f4d03f',
        'dark-bronze': '#1e1e1e',
        'frost-white': '#fbfcfd',
        'ice-blue': '#e3f2fd',
        'crystal-clear': 'rgba(255, 255, 255, 0.1)',
        'glass-white': 'rgba(255, 255, 255, 0.15)',
        'aurora-glow': '#b39ddb',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-medium': 'spin 10s linear infinite',
        'reverse-spin': 'reverse-spin 20s linear infinite',
        'reverse-spin-fast': 'reverse-spin 8s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'glow-pulse-slow': 'glow-pulse 4s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'puff': 'puff 4s infinite ease-out',
        'frost-spread': 'frost-spread 3s ease-out forwards',
        'crystal-shimmer': 'crystal-shimmer 2s ease-in-out infinite',
        'ice-crack': 'ice-crack 0.3s ease-out',
        'gear-pulse': 'gear-pulse 2s ease-in-out infinite',
        'aurora-wave': 'aurora-wave 8s ease-in-out infinite',
        'snowfall': 'snowfall 10s linear infinite',
        'wind-shimmer': 'wind-shimmer 1.5s ease-out',
        'spark-flash': 'spark-flash 0.8s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(0, 234, 255, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 234, 255, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'puff': {
          '0%': { transform: 'scale(0.8)', opacity: '0.2' },
          '50%': { opacity: '0.4' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'reverse-spin': {
          'to': { transform: 'rotate(-360deg)' },
        },
        'frost-spread': {
          '0%': { 
            transform: 'scale(0)',
            opacity: '0',
            filter: 'blur(10px)'
          },
          '50%': {
            opacity: '0.3',
            filter: 'blur(5px)'
          },
          '100%': { 
            transform: 'scale(1)',
            opacity: '0.6',
            filter: 'blur(2px)'
          },
        },
        'crystal-shimmer': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
            opacity: '0.3'
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            opacity: '0.8'
          },
        },
        'ice-crack': {
          '0%': { transform: 'scale(1)', filter: 'brightness(1)' },
          '30%': { transform: 'scale(1.02)', filter: 'brightness(1.2)' },
          '60%': { transform: 'scale(0.98)', filter: 'brightness(0.9)' },
          '100%': { transform: 'scale(1)', filter: 'brightness(1)' },
        },
        'gear-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)'
          },
        },
        'aurora-wave': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
            opacity: '0.2'
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            opacity: '0.6'
          },
        },
        'snowfall': {
          '0%': { 
            transform: 'translateY(-100vh) translateX(-10px)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { 
            transform: 'translateY(100vh) translateX(10px)',
            opacity: '0'
          },
        },
        'wind-shimmer': {
          '0%': { 
            transform: 'translateX(-20px) scale(0)',
            opacity: '0'
          },
          '30%': { 
            transform: 'translateX(0px) scale(1)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translateX(20px) scale(0)',
            opacity: '0'
          },
        },
        'spark-flash': {
          '0%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: '0'
          },
          '30%': { 
            transform: 'scale(1) rotate(90deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(0) rotate(180deg)',
            opacity: '0'
          },
        },
      },
      backgroundImage: {
        // Updated gradient combinations for icy theme
        'brass-gradient': 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #8b6914 100%)',
        'porcelain-gradient': 'linear-gradient(135deg, #f8f9fb 0%, #f2f4f7 50%, #e8ebef 100%)',
        'cyan-brass-gradient': 'linear-gradient(90deg, #00eaff 0%, #d4af37 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
        
        // New icy porcelain backgrounds
        'icy-porcelain': `
          radial-gradient(circle at 20% 30%, rgba(0, 234, 255, 0.08) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(0, 234, 255, 0.06) 1px, transparent 1px),
          radial-gradient(circle at 40% 60%, rgba(212, 175, 55, 0.04) 1px, transparent 1px),
          linear-gradient(135deg, #f8f9fb 0%, #f2f4f7 100%)
        `,
        'frost-texture': `
          linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%),
          radial-gradient(circle at 20% 20%, rgba(0, 234, 255, 0.03) 20%, transparent 20%),
          radial-gradient(circle at 80% 80%, rgba(0, 234, 255, 0.03) 20%, transparent 20%),
          linear-gradient(135deg, #f2f4f7 0%, #fbfcfd 100%)
        `,
        'crystal-pattern': `
          conic-gradient(from 0deg at 50% 50%, 
            rgba(0, 234, 255, 0.1) 0deg, 
            transparent 60deg, 
            rgba(212, 175, 55, 0.1) 120deg, 
            transparent 180deg, 
            rgba(0, 234, 255, 0.1) 240deg, 
            transparent 300deg, 
            rgba(212, 175, 55, 0.1) 360deg)
        `,
        'aurora-glow': `
          linear-gradient(45deg, 
            rgba(0, 234, 255, 0.2) 0%, 
            rgba(179, 157, 219, 0.2) 25%, 
            rgba(212, 175, 55, 0.2) 50%, 
            rgba(179, 157, 219, 0.2) 75%, 
            rgba(0, 234, 255, 0.2) 100%)
        `,
        'gear-pattern': `
          radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.1) 2px, transparent 2px),
          linear-gradient(135deg, transparent 0%, rgba(0, 234, 255, 0.05) 100%)
        `,
      },
      boxShadow: {
        // Enhanced shadow effects for icy theme
        'brass': '0 8px 32px rgba(212, 175, 55, 0.3)',
        'brass-glow': '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
        'brass-intense': '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)',
        'porcelain': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'cyan-glow': '0 0 20px rgba(0, 234, 255, 0.6), 0 0 40px rgba(0, 234, 255, 0.3)',
        'cyan-intense': '0 0 30px rgba(0, 234, 255, 0.8), 0 0 60px rgba(0, 234, 255, 0.4)',
        'ice-crystal': '0 0 15px rgba(0, 234, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'frost-glass': '0 8px 32px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(0, 234, 255, 0.2)',
        'inner-brass': 'inset 0 0 20px rgba(212, 175, 55, 0.2)',
        'gear-glow': '0 0 0 0 rgba(212, 175, 55, 0.7)',
        'aurora': '0 0 40px rgba(179, 157, 219, 0.3), 0 0 80px rgba(179, 157, 219, 0.1)',
        'embossed': 'inset 0 2px 4px rgba(255, 255, 255, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
        'crystal-edge': '0 1px 3px rgba(0, 234, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '12px',
        'frost': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
        '97': '0.97',
        '98': '0.98',
      },
      blur: {
        'xs': '2px',
      },
      brightness: {
        '25': '.25',
        '175': '1.75',
      },
      contrast: {
        '125': '1.25',
      },
      saturate: {
        '125': '1.25',
        '175': '1.75',
      },
    },
  },
  plugins: [],
};