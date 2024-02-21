/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#111",
        white: "#fff",
        gray: {
          light: "#f2f2f2",
          medium: "#d1d1d1",
          dark: "#a9a9a9",
        },
        green: {
          light: "#00db33",
          medium: "#00a827",
          dark: "#005c15",
        },
        wine: {
          DEFAULT: "#800000",
        },
      },
      fontFamily: {
        nunito: ["Nunito_400Regular"],
        nunito_semibold: ["Nunito_600SemiBold"],
        nunito_bold: ["Nunito_700Bold"],
        ubuntu: ["Ubuntu_400Regular"],
        ubuntu_bold: ["Ubuntu_700Bold"],
      },
    },
  },
  plugins: [],
}
