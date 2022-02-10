module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // wingdings: 'Wingdings',
      alfaSlabOne: 'AlfaSlabOne',
      courierPrime: 'CourierPrime',
      courierPrimeBold: 'CourierPrimeBold',
    },
    extend: {
      colors: {
        'game-yellow': '#EFCE4B',
        'game-yellow-brighter': '#FFF48C',
      },
    },
  },
  plugins: [],
};
