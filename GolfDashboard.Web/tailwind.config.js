module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    minWidth: {
      '1/2': '50%',
      '1/4': '25%'
    },
    extend: {
      colors: {
        accent: {
          green: '#339933',
          red: '#DA6C6C',
          blue: '#3E517A',
          yellow: '#EDF0DA'
        },
        primary: {
          100: '#E3E8E5',
          200: '#C6D2CB',
          300: '#9CB0A4',
          400: '#879D90',
          500: '#698474',
          600: '#546A5D',
          700: '#4A5C51',
          800: '#3F4F46',
          900: '#2d3831',
        },
        secondary: {
          100: '#d8dce4',
          200: '#9fa8bd',
          300: '#8b97af',
          400: '#657495',
          500: '#3E517A',
          600: '#38496e',
          700: '#324162',
          800: '#2b3955',
          900: '#1f293d'
        },
        warning: {
          100: '#D6B5B2',
          200: '#C1918B',
          300: '#AD6C65',
          400: '#A25951',
          500: '#98473E',
          600: '#894038',
          700: '#7A3932',
          800: '#5B2B25',
          900: '#3D1C19',
        },
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled']
    },
  },
  plugins: [],
}
