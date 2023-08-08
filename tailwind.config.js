/** @type {import('tailwindcss').Config} */
/*eslint-env node*/

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#a445ed",
        error: "#ff5252",
      },
    },
  },
  plugins: [],
};
