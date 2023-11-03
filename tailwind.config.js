/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "white",
      lightYellow: "#fff4e3",
      lightBlue: "#ceecf0",
      blue: "#1e56a0",
      deepBlue: "#13325d",
    },
    extend: {},
  },
  plugins: [],
};
