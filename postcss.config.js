module.exports = {
  plugins: [
    require('postcss-import'),
    require("tailwindcss")("./src/css/tailwind-config.js"),
    require('autoprefixer')
  ]
};
