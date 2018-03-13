const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require("path")

const PurgecssPlugin = require("purgecss-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const glob = require("glob-all")

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g)
  }
}

module.exports = merge(common, {
  plugins: [
    // define const production  to selectivily call scripts
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),

    // In production, Run our CSS through PurgeCSS
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
    // In production, hash our CSS
    new ExtractTextPlugin({
      filename: getPath => {
        return getPath("css/[name].[contenthash].css")
      },
      allChunks: true,
    }),
    new UglifyJSPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  output: {
    filename: "js/[name].[chunkhash].js",
  },
})
