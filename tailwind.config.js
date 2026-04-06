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
        // dark = #08131f  → bg-dark / text-dark
        dark: '#08131f',
        // surface = #0d1e2d  → bg-surface (cards)
        surface: '#0d1e2d',
        // blue = #00b4ff  → electric blue main accent
        blue: '#00b4ff',
        // green = #22c55e  → green for completed/success details
        green: '#22c55e',
        // gold = #fbbf24  → secondary accent
        gold: '#fbbf24',
        // snow = #f1f5f9  → primary text
        snow: '#f1f5f9',
        // muted = #94a3b8  → secondary text
        muted: '#94a3b8',
        // wire = #192d42  → borders
        wire: '#192d42',
      },
      fontFamily: {
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
