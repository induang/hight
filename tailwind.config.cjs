/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['**/*.{html,js}'],
  theme: {
    colors: {
      'custom-cupcake-primary': '#fe4362',
      'custom-cupcake-secondary': '#fc9d9b',
      'custom-cupcake-accent': '#ffccad',
      'custom-cupcake-ghost': '#c9c8aa',
      'custom-fluore-primary': '#13F4EF',
      'custom-fluore-secondary': '#68FF00',
      'custom-fluore-accent': '#FAFF00',
      'custom-fluore-ghost': '#FFBF00',
      'custom-candy-primary': '#FFDBEA',
      'custom-candy-secondary': '#DDD8FF',
      'custom-candy-accent': '#D6EEFC',
      'custom-candy-ghost': '#FDF8E6',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
