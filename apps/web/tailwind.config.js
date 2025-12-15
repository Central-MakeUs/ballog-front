import plugin from 'tailwindcss/plugin'

module.exports = {
  darkMode: 'class',
  // theme: {
  //   extend: {
  //     colors: {
  //       'usage-background-default': 'var(--color-usage-background-default)',
  //       'usage-text-default': 'var(--color-usage-text-default)',
  //     },
  //   },
  // },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('light', '.light &')
    }),
  ],
}
