/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      dropShadow: {
        '2xl': '25px 20px 20px rgba(0, 0, 0, 1)'
    }
  },
  plugins: [],
}
};
