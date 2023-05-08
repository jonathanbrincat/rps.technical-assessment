const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Gantari', 'Avenir', ...defaultTheme.fontFamily.sans],
      serif: ['pt-serif', ...defaultTheme.fontFamily.serif],
      display: ['Bungee Shade', ...defaultTheme.fontFamily.mono],
      mono: [...defaultTheme.fontFamily.mono],
    },
    extend: {
      textShadow: {
        DEFAULT: `1px 2px 6px ${colors.black}`,
      },
      // animation: {
      //   fxLeft: 'left 0.5s ease-in-out',
      //   fxRight: 'right 0.5s ease-in-out',
      // },
      // keyframes: {
      //   left: {
      //     '0%': { left: '0' },
      //     '100%': { left: '-100%' },
      //   },
      //   right: {
      //     'from': { left: '100%' },
      //     'to': { left: '0' },
      //   },
      // }
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
    plugin(({ addVariant }) => {
      addVariant('c-active', ['&.carousel__slide--active'])
      addVariant('c-cue', ['&.carousel__slide--cue'])
      // addVariant('c-to-left', ['&.carousel__slide--to-left'])
      // addVariant('c-from-left', ['&.carousel__slide--from-left'])
      // addVariant('c-to-right', ['&.carousel__slide--to-right'])
      // addVariant('c-from-right', ['&.carousel__slide--from-right'])
      // REFERENCE: c-to-left:fx-left c-from-left:fx-left c-from-left:direction-reverse c-to-right:fx-right c-to-right-reverse:direction-reverse c-from-right:fx-right
    })
  ],
}
