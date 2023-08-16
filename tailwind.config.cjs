/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['**/*.{html,js}'],
  theme: {
    colors: {
      'custom-primary': '#fe4362',
      'custom-secondary': '#fc9d9b',
      'custom-accent': '#ffccad',
      'custom-ghost': '#c9c8aa',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
