/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
     keyframes: {
    'neon-line': {
      '0%': { transform: 'translateX(-100%)', opacity: '0.1' },
      '50%': { opacity: '0.4' },
      '100%': { transform: 'translateX(100%)', opacity: '0.1' },
    },
  },
  animation: {
    'neon-line': 'neon-line 4s linear infinite',
  },
      colors: {
        SweetDaisy: '#f3f0da', // Add your custom color here
        Sage: '#1d1e3f', // Add your custom color here
        Peach: '#f3f0da', // Add your custom color here
        Blue:'#005689',
        WhitePPK: '#F0F7FD',
        Yellow: '#F6C667',
        Aqua: '#007cb8',
        // Dark mode colors
        dark: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          accent: '#3d3d3d',
          text: '#ffffff',
          'text-secondary': '#a0a0a0',
          'text-muted': '#666666',
          border: '#404040',
          'border-light': '#555555',
        }
      },
      fontFamily:{
        // poppins:['Poppins'],
        sans: ['Raleway', 'sans-serif'], // Primary font
        dmsans: ['DM Sans', 'sans-serif'],
        serif: ['Merriweather', 'Georgia'], // Secondary font
        mono: ['Courier New', 'monospace'], // Monospace font
      }
    },
  },
  plugins: [],
}