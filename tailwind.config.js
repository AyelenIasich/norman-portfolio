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
        dark:        '#0a0808',
        surface:     '#110d0d',
        red:         '#c0392b',
        'red-dark':  '#922b21',
        'red-bright':'#e74c3c',
        green:       '#2ecc71',
        gold:        '#fbbf24',
        snow:        '#f0eaea',
        muted:       '#6b4040',
        wire:        '#231515',
        // aliases para compatibilidad con otros componentes
        cyan:        '#c0392b',   // reemplazado por rojo
        matrix:      '#2ecc71',
        blue:        '#c0392b',
      },
      fontFamily: {
        grotesk: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'bounce-y': 'bounce-y 1.8s ease-in-out infinite',
        'ring-pulse': 'ring-pulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
