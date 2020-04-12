const purgecss = require("@fullhuman/postcss-purgecss")({
    content: ["./layouts/**/*.html", "./assets/js/**/*.{js,vue}"],
    defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
    whitelist: []
  });
  
  module.exports = {
    plugins: [
      require("postcss-import")({
        path: ["assets/css"]
      }),
      require("tailwindcss")("./assets/css/tailwindcss.config.js"),
      require("autoprefixer"),
      ...(process.env.NODE_ENV !== "development" ? [purgecss] : [])
    ]
  };
  