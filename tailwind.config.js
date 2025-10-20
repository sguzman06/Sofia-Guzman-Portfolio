/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  container: {
  center: true,
  padding: '1rem',
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
},
  darkMode: 'class',
  theme: { extend: {
    colors: {
      space: {
        cadet: '#343352',
        light: '#4a4973',
      },
      neon: {
        pink: '#ff6ec7',
        cyan: '#00fff7',
        yellow: '#fff176',
      },
    },
  }, },
  plugins: [],
  theme: {
  extend: {
    keyframes: {
      blob: {
        '0%, 100%': { transform: 'translate(0,0) scale(1)' },
        '33%': { transform: 'translate(20px,-30px) scale(1.05)' },
        '66%': { transform: 'translate(-15px,25px) scale(0.97)' },
      },
    },
    animation: {
      blob: 'blob 12s ease-in-out infinite',
    },
  },
}
}
