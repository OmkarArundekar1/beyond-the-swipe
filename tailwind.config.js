/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        accent: {
          50: '#fff5f7',
          100: '#ffe3e9',
          200: '#ffc7d4',
          300: '#ffa3ba',
          400: '#ff7a9d',
          500: '#f95980',
          600: '#e03a63',
          700: '#b82b4c',
          800: '#8f1e39',
          900: '#6b1429',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
