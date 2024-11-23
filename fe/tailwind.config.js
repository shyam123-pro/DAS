/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This makes sure Tailwind purges unused styles in all your React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
