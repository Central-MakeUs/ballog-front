import plugin from 'tailwindcss/plugin'

module.exports = {
  darkMode: 'class',
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('light', '.light &')
    }),
  ],
}
