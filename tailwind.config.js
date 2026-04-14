/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f0f0e',
        paper: '#f5f3ee',
        warm: '#e8e4d8',
        accent: '#c9501e',
        muted: '#8a8579',
        border: 'rgba(15,15,14,0.12)'
      },
      fontFamily: {
        mono: ['"DM Mono"', 'monospace'],
        syne: ['Syne', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        fadeUp: 'fadeUp 0.8s forwards',
        lineExpand: 'lineExpand 1s forwards',
        scrollPulse: 'scrollPulse 2s infinite',
        dividerScroll: 'dividerScroll 28s linear infinite',
        ditherSpin: 'ditherSpin 0.8s linear infinite',
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        ditherSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineExpand: {
          'to': { width: '80%' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.1)' },
        },
        dividerScroll: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        }
      }
    }
  },
  plugins: [],
}