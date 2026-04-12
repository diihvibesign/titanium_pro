/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D12',
        primary: '#FE1616',
        secondary: '#272727',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        drama: ['Playfair Display', 'serif'],
      },
      animation: {
        'star-btn': 'star-btn calc(var(--duration)*1s) linear infinite',
      },
      keyframes: {
        'star-btn': {
          '0%': { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
      },
    },
  },
  plugins: [],
}
