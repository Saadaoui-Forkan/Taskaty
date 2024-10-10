import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1020px',
      xl: '1440px',
    },
    extend: {
      colors: {
        slateGray: "#595f68",
        coolGray: "#ced4da",
        dustyGray: "#7b7777",
        rubyRed: "#c82333",
        coralRed: "#f43a4c",
        white: "#fff",
        royalPurple: "#573d7d",
        leafGreen: "#28a745",
      },
    },
  },
  plugins: [],
};
export default config;
