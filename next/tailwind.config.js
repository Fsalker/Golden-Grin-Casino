module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'game-yellow': '#EFCE4B',
    },
    fontFamily: {
      // wingdings: 'Wingdings',
      alfaSlabOne: 'AlfaSlabOne',
      courierPrime: 'CourierPrime',
      courierPrimeBold: 'CourierPrimeBold',
    },
    extend: {
      fontSize: {
        'game-20': '20px',
        'game-36': '36px',
        'game-48': '48px',
        'game-64': '64px',
        'game-90': '90px',
      },
      borderRadius: {
        'game-14': '14px',
        'game-24': '24px',
      },
    },
  },
  plugins: [],
};
