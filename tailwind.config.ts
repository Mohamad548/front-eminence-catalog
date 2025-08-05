import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'sans-serif'],
      },
      colors: {
          'brand-blue': '#0A192F', // Darker navy
          'brand-blue-dark': '#020c1b', // Even darker
          'brand-blue-light': '#1f93b8',
          'brand-blue-sky': '#64ffda', // Neon cyan/teal
          'brand-gray': '#8892b0',
          'brand-gray-light': '#ccd6f6',
          'brand-black': '#000000',
          'brand-gold-dark': '#d2ab67',
          'brand-gold-light': '#f5e884',
          'brand-slate': '#112240',
          'neon-pink': '#F57DFF',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        'subtle-glow': 'subtle-glow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-glow': {
          'from': { 'box-shadow': '0 0 10px -5px #64ffda' },
          'to': { 'box-shadow': '0 0 10px 5px #64ffda' },
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(100, 255, 218, 0.4)',
        'glow-gold': '0 0 20px rgba(245, 232, 132, 0.4)',
      },
    },
  },
  plugins: [],
}
export default config
