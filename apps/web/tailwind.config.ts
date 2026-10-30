import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#142033",
        brand: { 50: "#edf4ff", 100: "#dbe8ff", 600: "#1856a8", 700: "#13478d", 900: "#102f59" },
        leaf: { 50: "#edf9f5", 600: "#147a62", 700: "#0f624f" },
        canvas: "#f5f7fa",
        line: "#dce3ec"
      },
      boxShadow: { soft: "0 12px 32px rgba(20,32,51,.08)" },
      borderRadius: { xl: "14px", "2xl": "20px" },
      fontFamily: { sans: ["Manrope", "Segoe UI", "Noto Sans Devanagari", "sans-serif"] }
    }
  },
  plugins: []
} satisfies Config;
