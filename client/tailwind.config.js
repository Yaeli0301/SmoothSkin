/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF4D6D',
        secondary: '#111111',
        accent: '#FFD6DD',
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0, 0, 0, 0.08)',
        cta: '0 8px 32px rgba(255, 77, 109, 0.35)',
      },
      fontFamily: {
        sans: ['Heebo', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
