/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        blush: {
          50: '#fff0f3',
          100: '#ffe0e8',
          200: '#ffc1d4',
          300: '#ff93b2',
          400: '#ff5587',
          500: '#ff1f5f',
          600: '#f0003f',
          700: '#cb0034',
          800: '#a8032f',
          900: '#8c072c',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(0.7)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 0.4 },
        },
      },
    },
  },
  plugins: [],
}
