/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Asegura que Tailwind escanee los archivos de Angular
  ],
  darkMode: 'class', // Activa el modo oscuro manualmente con una clase
  theme: {
    extend: {},
  },
  plugins: [],
};