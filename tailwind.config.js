/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // light theme
        background: {
          DEFAULT: "#F3F8F4", // light
          dark: "#0F1A13",    // dark
        },
        card: "#FFFFFF",
        text: "#1A2E22",
        textSecondary: "#5F7F6E",
        primary: "#4CAF50",
        success: "#16A34A",
        error: "#DC2626",
        primaryDark: "#3D8C41",
        border: "#DDE5DD",

        // dark theme
        "background-dark": "#0F1A13",
        "card-dark": "#1B2A20",
        "text-dark": "#D8EDE0",
        "textSecondary-dark": "#8FB7A4",
        "primary-dark": "#6DDE76",
        "primaryDark-dark": "#52B55C",
        "success-dark": "#16A34A",
        "error-dark": "#DC2626",
        "border-dark": "#2E4236",
      },
    },
  },
  plugins: [],
}

