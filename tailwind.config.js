// tailwind.config.js
module.exports = {
  darkMode: 'class', // <<-- important
  content: [
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { extend: {} },
  plugins: [],
};
