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
        'porcelain': '#f3f3f3',
        'brass': '#b08d57',
        'brass-dark': '#8b6914',
        'brass-light': '#d4af37',
        'neon-cyan': '#00f0ff',
        'dark-bronze': '#1e1e1e',
        'cracked-white': '#fafafa',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'brass-gradient': 'linear-gradient(135deg, #b08d57 0%, #d4af37 50%, #8b6914 100%)',
        'porcelain-gradient': 'linear-gradient(135deg, #fafafa 0%, #f3f3f3 50%, #e8e8e8 100%)',
        'cyan-brass-gradient': 'linear-gradient(90deg, #00f0ff 0%, #d4af37 100%)',
        'cracked-porcelain': `
          radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
          radial-gradient(circle at 80% 70%, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
          linear-gradient(135deg, #fafafa 0%, #f3f3f3 100%)
        `,
      },
      boxShadow: {
        'brass': '0 8px 32px rgba(176, 141, 87, 0.3)',
        'porcelain': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.6)',
        'brass-glow': '0 0 20px rgba(212, 175, 55, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(0, 240, 255, 0.2)',
      },
    },
  },
  plugins: [],
};