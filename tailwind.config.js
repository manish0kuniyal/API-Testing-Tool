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
      prShade: '#D4C4EC',
      wtSmoke:'#f5f5f5'
    },},
  },
  plugins: [],
}
