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
        primary: '#E91E63',
        secondary: '#111111',
        accent: '#F8E1E7',
        surface: '#FAFAFA',
      },
      borderRadius: {
        card: '20px',
        pill: '24px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(17, 17, 17, 0.06)',
        card: '0 8px 32px rgba(233, 30, 99, 0.08)',
      },
      fontFamily: {
        sans: ['Heebo', 'system-ui', 'sans-serif'],
        display: ['Heebo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
