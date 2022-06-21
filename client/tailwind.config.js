/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["/public/index/html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: ["dark"],
  },
};
