/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // dark = #0a0a0a  → bg-dark (deep black)
        dark: '#0a0a0a',
        // surface = #1a1a1a  → bg-surface (cards)
        surface: '#141414',
        // red = #FF1744  → primary hacker red
        red: '#FF1744',
        // red-dark = #D32F2F  → darker red
        'red-dark': '#D32F2F',
        // red-bright = #FF5252  → bright red accents
        'red-bright': '#FF5252',
        // cyan = #00FFFF  → secondary accent
        cyan: '#00FFFF',
        // matrix = #00FF41  → matrix green details
        matrix: '#00FF41',
        // green = #22c55e  → success/completed
        green: '#22c55e',
        // gold = #fbbf24  → in-progress status
        gold: '#fbbf24',
        // snow = #f1f5f9  → primary text
        snow: '#f1f5f9',
        // muted = #808080  → secondary text
        muted: '#808080',
        // wire = #2a2a2a  → borders
        wire: '#2a2a2a',
      },
      fontFamily: {
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'glitch-red': 'glitch-red 5s infinite',
        'red-pulse': 'red-pulse 3s ease-in-out infinite',
        'red-blink': 'red-blink 0.8s step-end infinite',
        'bounce-red': 'bounce-red 1.8s ease-in-out infinite',
        'scan-lines': 'scan-lines 8s linear infinite',
      },
      keyframes: {
        'glitch-red': {
          '0%, 87%, 100%': { transform: 'none', textShadow: 'none' },
          '88%': {
            transform: 'skewX(-4deg)',
            textShadow: '3px 0 #FF1744, -3px 0 #00FFFF, 0 0 20px rgba(255,23,68,0.8)',
          },
          '89%': {
            transform: 'skewX(4deg) translateX(3px)',
            textShadow: '-3px 0 #FF1744, 3px 0 #00FFFF, 0 0 25px rgba(255,23,68,0.9)',
          },
          '90%': {
            transform: 'translateX(-3px)',
            textShadow: '2px 2px #FF1744, -2px -2px #00FFFF',
          },
          '91%': { transform: 'none', textShadow: 'none' },
        },
        'red-pulse': {
          '0%, 100%': {
            textShadow: '0 0 20px #FF1744, 0 0 40px #FF1744',
            filter: 'drop-shadow(0 0 10px #FF1744)',
          },
          '50%': {
            textShadow: '0 0 40px #FF1744, 0 0 80px #FF5252',
            filter: 'drop-shadow(0 0 25px #FF1744)',
          },
        },
        'red-blink': {
          '0%, 100%': { opacity: '1', color: '#FF1744', textShadow: '0 0 10px #FF1744' },
          '50%': { opacity: '0.3', color: '#FF5252' },
        },
        'bounce-red': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(15px)' },
        },
        'scan-lines': {
          '0%': { top: '-100%' },
          '100%': { top: '100%' },
        },
      },
    },
  },
  plugins: [],
}
