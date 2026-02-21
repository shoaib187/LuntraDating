/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        marqueeXtoY: "scrollXtoY 10s linear infinite",
        marqueeYtoX: "scrollYtoX 10s linear infinite",
      },
      keyframes: {
        scrollXtoY: {
          "0%": { transform: "translateY(50%)" },
          "100%": { transform: "translateY(-50%)" },
        },
        scrollYtoX: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(50%)" },
        },
      },
    },
  },
  plugins: [],
};
