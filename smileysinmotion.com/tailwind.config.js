const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // 'media' or 'class'
  theme: {
    extend: {
      // colors: {
      //   'accent-1': '#333',
      // },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
        mono: ["Courier New", "Courier", "monospace"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
