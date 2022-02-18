module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // wingdings: 'Wingdings',
      alfaSlabOne: "AlfaSlabOne",
      courierPrime: "CourierPrime",
      courierPrimeBold: "CourierPrimeBold",
    },
    extend: {
      colors: {
        "game-yellow": "#EFCE4B",
        "game-yellow-brighter": "#FFF48C",
      },
      animation: {
        card: "card 0.4s ease-in-out 1",
      },
      keyframes: {
        card: {
          "0%": {
            transform: "rotate(0) scale(0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
