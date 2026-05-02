/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0d1321',
        stone: '#f3f4f6',
        accent: '#1d4ed8'
      }
    }
  },
  plugins: [],
}
