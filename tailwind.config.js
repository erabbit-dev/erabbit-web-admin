/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue,ts}'],
  theme: {
    extend: {
      fontSize: {
        12: '12px',
        16: '16px',
        18: '18px'
      },
      width: {
        1000: ' var(--er-max-width)'
      },
      padding: {
        '20-60': '20px 60px'
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
