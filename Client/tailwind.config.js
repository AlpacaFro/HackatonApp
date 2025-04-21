/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#89A8B2",
        "primary-light": "#B3C8CF",
        "neutral-dark": "#F1F0E8",
        "neutral-light": "#E5E1DA",
      },
      backgroundImage: {
        "home-bg": "url('/src/assets/440836.jpeg')",
      },
    },
  },
  plugins: [],
};
