import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#5F143F",
          pink2: "#691E49",
          pink3: "#732853",
          pink4: "#7D325D",
          pink5: "#873C67",
          pink6: "#914671",
          pink7: "#9B507B",
          pink8: "#A55A85",
          primary: "#5F143F",
          accent: "#691E49",
          deep: "#5F143F",
        },
        gold: {
          DEFAULT: "#E8D5A8",
          dark: "#DCC18C",
          light: "#F2E3C2",
        },
        cream: {
          warm: "#FFF5E9",
          soft: "#FFF9F2",
          ivory: "#F8F3EF",
        },
        text: {
          primary: "#40343A",
          secondary: "#88777D",
        },
        border: {
          soft: "#EBD8E2",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        editorial: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(95, 20, 63, 0.08)",
        card: "0 10px 30px -4px rgba(64, 52, 58, 0.06)",
        float: "0 20px 40px -6px rgba(95, 20, 63, 0.15)",
        gold: "0 4px 20px -2px rgba(220, 193, 140, 0.25)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2.5s infinite linear",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
