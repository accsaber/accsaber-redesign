/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
