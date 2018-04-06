const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(common, {
  mode: "development",
  plugins: [
    // define production === false to selectivily call scripts
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
    // In production, hash our CSS, here we do not
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  output: {
    filename: "js/[name].dev.js",
  },
})
