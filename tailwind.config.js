module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3a86ff',
          DEFAULT: '#3a86ff',
          dark: '#0a4f8c'
        },
        secondary: {
          light: '#8338ec',
          DEFAULT: '#8338ec',
          dark: '#5b1ca8'
        },
        neutral: {
          light: '#f6f7fb',
          DEFAULT: '#f0f1f5',
          dark: '#d1d3e0'
        }
      }
    },
  },
  plugins: [],
}
