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
        "yellow-pink-gradients":
          "radial-gradient(circle at 20% 80%, #ffd3df 0%, #ffffff00 min(300px,50%)), radial-gradient(circle at 85% 60%, #fff4b7 0%,#ffffff00 min(360px,50%))",
      },
      backgroundSize: {
        "50%": "50%",
        "16": "4rem",
        "32": "8rem",
      },
      fontFamily: {
        system: "system-ui",
      },
      boxShadow: {
        "inner-md":
          "inset 0 4px 6px -1px rgb(0 0 0 / 0.1), inset 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "inner-xl":
          "inset 0 0px 25px 5px rgb(0 0 0 / 0.1), inset 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        "shadow-pulse": {
          "0%, 100%": {
            boxShadow:
              "20px 20px 32px var(--shadow-color1), -20px -10px 30px var(--shadow-color2), 20px -20px 42px var(--shadow-color3)",
          },
          "50%": {
            boxShadow:
              "-20px -20px 42px var(--shadow-color1), 20px 10px 40px var(--shadow-color2), -20px 20px 48px var(--shadow-color3)",
          },
        },
      },
      animation: {
        "shadow-pulse": "shadow-pulse 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
