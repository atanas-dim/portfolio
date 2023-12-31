import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        noise: "url(/noise-dark.png)",
      },
      backgroundSize: {
        "50%": "50%",
        "16": "4rem",
        "32": "8rem",
      },
    },
  },
  plugins: [],
};
export default config;
