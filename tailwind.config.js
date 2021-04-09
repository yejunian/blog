module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      md: '640px',
      lg: '1280px',
    },
    extend: {
      lineHeight: {
        tight: '1.2',
        snug: '1.4',
        normal: '1.6',
        relaxed: '1.8',
        loose: '2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
