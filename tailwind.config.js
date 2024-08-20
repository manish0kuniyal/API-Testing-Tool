/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {    colors: {
      bkShade: '#191919',
      wtShade: '#fcfcfc',
      accent: '#e3342f',
    },},
  },
  plugins: [],
}
