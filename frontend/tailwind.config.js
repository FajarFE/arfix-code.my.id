/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#4B5563',
      'white': '#ffffff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'dark': 'linear-gradient(332deg, rgba(0,0,0,1) 0%, rgba(75,85,99,1) 35%)',
      'transparent': 'transparent',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      patrick: ['Patrick Hand', 'cursive'],
    },
    extend: {
      
    }
  },
})

