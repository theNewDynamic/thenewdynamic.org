const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = merge(common, {
  devtool: "inline-source-map",

  plugins: [
    // define production === true to selectivily call scripts
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    // In production, hash our CSS, here we do not
    new ExtractTextPlugin({
      filename: getPath => {
        return getPath("css/[name].dev.css")
      },
      allChunks: true,
    }),
  ],
  output: {
    filename: "js/[name].dev.js",
  },
})
