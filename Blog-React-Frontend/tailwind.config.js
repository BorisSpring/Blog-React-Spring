/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: {
        default: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '786px',
      lg: '1024px',
      xl: '1300px',
    },
    extend: {},
  },
  plugins: [],
};
