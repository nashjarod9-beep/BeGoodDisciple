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
        bgd: {
          blue: {
            light: "#60A5FA",
            sky: "#3B82F6",
            brand: "#2563EB",
            deep: "#1E3A8A",
            dark: "#0F172A",
          },
          gold: {
            light: "#FDE047",
            brand: "#FBBF24",
            accent: "#F59E0B",
            deep: "#D97706",
          },
          slate: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            800: "#1E293B",
            900: "#0F172A",
          }
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        heading: ["var(--font-heading)", "Poppins", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(59, 130, 246, 0.25)",
        "glow-gold": "0 0 25px -5px rgba(251, 191, 36, 0.35)",
        card: "0 10px 30px -10px rgba(30, 58, 138, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "bgd-gradient-hero": "linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 50%, #FEF3C7 100%)",
        "bgd-gradient-primary": "linear-gradient(135deg, #3B82F6 0%, #1E3A8A 100%)",
        "bgd-gradient-gold": "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
        "bgd-gradient-card": "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(239,246,255,0.7) 100%)",
      }
    },
  },
  plugins: [],
};
export default config;
