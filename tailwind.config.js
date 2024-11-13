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
      wtSmoke:'#e8e8e8'
    },},
  },
  plugins: [],
}
