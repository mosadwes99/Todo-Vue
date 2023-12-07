/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        linear: "linear-gradient(to right, #195abd, #55bdf4)",
        linearReverse: "linear-gradient(to left, #195abd, #55bdf4)",
      },
    },
  },
  plugins: [],
};
