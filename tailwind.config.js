module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}', './modules/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ocean: '#00897B',
        coral: '#FF6B6B',
        sand: '#FFF8F0',
        oceanDark: '#00695C',
        slate: '#475057',
      },
      fontFamily: {
        display: ['Baloo 2', 'sans-serif'],
        body: ['System'],
      },
    },
  },
  plugins: [],
};
