/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#eef8ff",
          100: "#d8eeff",
          500: "#0891b2",
          700: "#0f4b6e",
          900: "#0b2337",
        },
        sand: "#f5e6cf",
        coral: "#ff7b66",
      },
      boxShadow: {
        soft: "0 10px 35px -10px rgba(10, 35, 58, 0.2)",
      },
      backgroundImage: {
        "shoreline-gradient":
          "radial-gradient(circle at 15% 10%, #9ad5df 0%, transparent 35%), radial-gradient(circle at 80% 0%, #ffd8be 0%, transparent 35%), linear-gradient(165deg, #f6fbff 0%, #e3f5ff 52%, #fff8ef 100%)",
      },
    },
  },
  plugins: [],
};
