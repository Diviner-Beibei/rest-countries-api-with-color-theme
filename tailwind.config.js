/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif'],
      'nunito-sans': ['Nunito Sans', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        normal: '0 4px 4px 0 rgba(0,0,0,0.25)',
      },
      // colors: {
      //   'light': {
      //     'primary': 'hsl(200, 15%, 8%)',
      //     'main': 'hsl(0, 0%, 98%)',
      //     'component': 'hsl(0, 0%, 100%)',
      //     'search': 'hsl(0, 0%, 52%)'
      //   },
      //   'dark': {
      //     'primary': 'hsl(0, 0%, 100%)',
      //     'main': 'hsl(207, 26%, 17%)',
      //     'component': 'hsl(209, 23%, 22%)',
      //     'search': 'hsl(0, 0%, 100%)'
      //   }
      // },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
}

