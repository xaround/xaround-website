module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        section1: "rgb(10,10,12)",
        section2: "rgb(0,0,0)",
      },
      transitionProperty: {
        'bg': 'background-color',
      },
    },
  },
  plugins: [],
};