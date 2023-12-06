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
      },
      animation: {
        "shake": "shake 0.3s ease-in-out 4",
      },
      fontFamily: {
        "digital-display": ["Digital Display"],
        "quikhand": ["Quikhand"],
      },
    },
  },
  plugins: [],
}

