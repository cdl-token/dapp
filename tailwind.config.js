/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AF52DE",
        custom: {
          bg: "#060606",
          gray: "#A1A1A1",
          darkgray: "#151718",
          gray2: "#212325",
          green: "#77ED91",
          green2: "#2DC24E",
          red: "#F92C2C",
        },
      },
      fontFamily: {
        neue: ["var(--font-neue-machina)"],
        apfel: ["var(--font-apfel)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
