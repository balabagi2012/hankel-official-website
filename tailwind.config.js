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
    extend: {
      colors: {
        white: "white",
        bgGray: "#F9F9F9",
        textGray: "#4E4E4E",
        lightYellow: "#fff4e3",
        lightBlue: "#ceecf0",
        blue: "#1e56a0",
        deepBlue: "#13325D",
        orange: "#FF8A50",
      },
    },
  },
  plugins: [],
};
