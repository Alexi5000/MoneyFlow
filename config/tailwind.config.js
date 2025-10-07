/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        festival: {
          pink: {
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
          },
          yellow: {
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
          },
          purple: {
            400: '#a78bfa',
            500: '#8b5cf6',
            600: '#7c3aed',
          },
          green: {
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
          },
          orange: {
            400: '#fb923c',
            500: '#f97316',
            600: '#ea580c',
          }
        }
      },
      fontFamily: {
        'bungee': ['Bungee', 'cursive'],
        'fredoka': ['Fredoka', 'sans-serif'],
      },
      animation: {
        'festival-bounce': 'festival-bounce 2s ease-in-out infinite',
        'festival-wiggle': 'festival-wiggle 3s ease-in-out infinite',
        'festival-float': 'festival-float 4s ease-in-out infinite',
        'rainbow-slide': 'rainbow-slide 20s linear infinite',
      },
      keyframes: {
        'festival-bounce': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(-2deg)' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(2deg)' 
          },
        },
        'festival-wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(-1deg)' },
          '75%': { transform: 'rotate(1deg)' },
        },
        'festival-float': {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)' 
          },
          '33%': { 
            transform: 'translateY(-10px) rotate(1deg)' 
          },
          '66%': { 
            transform: 'translateY(-5px) rotate(-1deg)' 
          },
        },
        'rainbow-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      boxShadow: {
        'festival': '4px 4px 0px 0px rgba(0,0,0,1)',
        'festival-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
        'festival-xl': '8px 8px 0px 0px rgba(0,0,0,1)',
        'sticker': '4px 4px 0px 0px rgba(0,0,0,1), 8px 8px 0px 0px rgba(0,0,0,0.1)',
        'sticker-lg': '6px 6px 0px 0px rgba(0,0,0,1), 12px 12px 0px 0px rgba(0,0,0,0.1)',
      },
      borderWidth: {
        '3': '3px',
        '5': '5px',
        '6': '6px',
      }
    },
  },
  plugins: [],
}