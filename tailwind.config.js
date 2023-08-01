/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  theme: {
    extend: {
      fontSize: {
        12: '12px',
        18: '18px'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
