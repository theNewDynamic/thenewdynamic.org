const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PurgecssPlugin = require("purgecss-webpack-plugin")
const glob = require("glob-all")

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g)
  }
}

module.exports = merge(common, {
  mode: "production",
  plugins: [
    // define production === true to selectivily call scripts
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    new PurgecssPlugin({
      whitelist: [
        "body",
        "ais-hits",
        "ais-hits--item",
        "results-hidden",
        "hidden",
        "ais-pagination",
        "ais-pagination--item__active ais-pagination--item__first",
        "ais-pagination--item__last",
        "bg-primary-color",
        "turbolinks-progress-bar",
        "opacity-25",
      ],
      paths: glob.sync([
        path.join(__dirname, "layouts/**/*.html"),
        path.join(__dirname, "src/js/algolia/templates/*.html"),
        path.join(__dirname, "themes/hugo-base-layouts/layouts/**/*.html"),
      ]),
      // TailwindExtractor runs through our layouts to get the CSS for PurgeCSS
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html"],
        },
      ],
    }),
    // In production, hash our CSS, here we do not
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
  ],
  output: {
    filename: "js/[name].[contenthash].js",
  },
})
