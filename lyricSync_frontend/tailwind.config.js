/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accentDark: "#2E0249",
        accentMid: "#570A57",
        accentLight: "#A91079",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        textPulse: {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "drop-shadow(0 0 10px rgba(169,16,121,0.6))",
          },
          "50%": {
            transform: "scale(1.05)",
            filter: "drop-shadow(0 0 25px rgba(248,6,204,0.8))",
          },
        },
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        textPulse: "textPulse 4s ease-in-out infinite",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
      fontFamily: {
        modern: ["Poppins", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
