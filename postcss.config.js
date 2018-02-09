module.exports = {
  plugins: [
    require("tailwindcss")("./src/css/tailwind-config.js"),

    require("cssnano")({
      discardComments: {
        removeAll: true
      },
      minifyFontValues: false,
      autoprefixer: false
    })
  ]
};
