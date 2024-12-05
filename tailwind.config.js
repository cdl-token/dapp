/** @type {import('tailwindcss').Config} */
module.exports = {
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
        },
      },
      fontFamily: {
        neue: ["var(--font-neue-machina)"],
        apfel: ["var(--font-apfel)"],
      },
    },
  },
  plugins: [],
};
