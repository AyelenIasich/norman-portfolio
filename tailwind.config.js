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
        // dark = #0a1a1a  → bg-dark / text-dark
        dark: '#0a1a1a',
        // surface = #0f2323  → bg-surface
        surface: '#0f2323',
        // teal = #14b8a6  → text-teal / bg-teal / border-teal
        teal: '#14b8a6',
        // gold = #fbbf24  → text-gold / border-gold
        gold: '#fbbf24',
        // snow = #f1f5f9  → text-snow (primary text)
        snow: '#f1f5f9',
        // muted = #94a3b8  → text-muted (secondary text)
        muted: '#94a3b8',
        // wire = #1e3a3a  → border-wire / bg-wire
        wire: '#1e3a3a',
      },
      fontFamily: {
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
