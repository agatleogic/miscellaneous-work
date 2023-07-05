module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      visibility: ["group-hover"]
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
