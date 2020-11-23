module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    // "./styles/*.{css,sass,scss}",
  ],
  darkMode: "media", // 'media' or 'class'
  theme: {
    // extend: {
    //   colors: {
    //     'accent-1': '#333',
    //   },
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
