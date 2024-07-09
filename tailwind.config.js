/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
