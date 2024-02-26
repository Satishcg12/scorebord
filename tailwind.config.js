/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "shake": {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(2px, 0, 0)" },
        },
        "blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        "rotate-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        },
      },
      animation: {
        "shake": "shake 0.3s ease-in-out 4",
        "blink": "blink 1s ease-in-out infinite",
        "rotate-gradient": "rotate-gradient 5s linear infinite",
      },
      fontFamily: {
        "digital-display": ["Digital Display"],
        "quikhand": ["Quikhand"],
      },
    },
  },
  plugins: [],
}

