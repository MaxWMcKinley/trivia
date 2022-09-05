/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      dropShadow: {
        '2xl': '25px 20px 20px rgba(0, 0, 0, 1)'
      }
    },
  },
  plugins: [],
};

// module.exports = {
//   theme: {
//     extend: {
//       screens: {
//         'ph': {'raw': '(max-width: 480px)'},
//       },
//     }
//   }
// }
