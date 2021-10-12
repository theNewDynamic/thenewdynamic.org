module.exports = {
  plugins: [
    require("postcss-import")({
      path: ["assets/css"],
    }),
    require("tailwindcss")("./assets/css/config/tailwind.config.js"),
  ],
};