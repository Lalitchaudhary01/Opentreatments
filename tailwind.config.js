// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00C6D2",
        "background-light": "#F4FAFA",
        "background-dark": "#0A1414",
        "text-primary": "#001B36",
        "text-secondary": "#6C7A89",
        "card-light": "rgba(255, 255, 255, 0.6)",
        "card-dark": "rgba(16, 34, 36, 0.6)",
        "border-light": "rgba(255, 255, 255, 0.8)",
        "border-dark": "rgba(25, 52, 54, 0.8)",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.25rem",
        xl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 4px 30px rgba(0, 0, 0, 0.05)",
      },
    },
  },
};
