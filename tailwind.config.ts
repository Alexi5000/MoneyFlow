import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5E6D3',
        festival: {
          pink: '#E91E63',
          yellow: '#FFC107',
          orange: '#FF5722',
          purple: '#9C27B0',
          green: '#4CAF50',
        }
      },
      fontFamily: {
        'bungee': ['Bungee', 'cursive'],
        'fredoka': ['Fredoka', 'sans-serif'],
      },
      animation: {
        'bounce-fun': 'bounce-fun 2s ease-in-out infinite',
        'wiggle': 'wiggle 3s ease-in-out infinite',
        'confetti-fall': 'confetti-fall 3s linear infinite',
      },
      keyframes: {
        'bounce-fun': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(-2deg)' 
          },
          '50%': { 
            transform: 'translateY(-10px) rotate(2deg)' 
          },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        'confetti-fall': {
          '0%': { 
            transform: 'translateY(-100vh) rotate(0deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(100vh) rotate(360deg)',
            opacity: '0'
          },
        }
      },
      boxShadow: {
        'festival': '8px 8px 0 #1a1a1a',
        'festival-lg': '12px 12px 0 #1a1a1a',
      }
    },
  },
  plugins: [],
}

export default config