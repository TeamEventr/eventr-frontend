import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "eventr-gray": {
          50: "#e3e3e8", //90%
          100: "#babac4", //75%
          200: "#8c8c9a", //60%
          300: "#75758a", //50%
          500: "#3b3b45", //25%
          700: "#232329", //15%
          800: "#17171c", //10%
          900: "#0c0c0e", //5%
          950: "#070708", //3%
        },
        "eventr-main": "#262161", // Purple
        "eventr-main-light": "#3A2A7A", // Purple
        "eventr-secondary": "#FFD300", // Orange
      },
      fontFamily: {
        gothic: ["League Gothic", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
