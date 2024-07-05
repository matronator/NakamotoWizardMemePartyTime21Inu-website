/** @type {import('tailwindcss').Config} */
export default {
  content: ["*.html", "src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      }
    }
  },
  corePlugins: {
    'preflight': false,
  },
  darkMode: 'class',
};
