/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "brand-yellow": "#fed685",
        "brand-purple": "#3969B3",
        "brand-light-purple": "#85B5FF"
      }
    },
  },
  plugins: [],
}

