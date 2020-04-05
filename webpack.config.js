const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm
const SriPlugin = require("webpack-subresource-integrity"); // installed via npm
const devMode = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    main: "./assets/index.js"
  },
  output: {
    path: path.join(__dirname, "./static/js"),
    filename: devMode ? "[name].js" : "[name].[contenthash].js",
    publicPath: "/js/", // DO WE NEED THIS?,
    crossOriginLoading: "anonymous"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new SriPlugin({
      hashFuncNames: ["sha256"],
      enabled: process.env.NODE_ENV === "production"
    }),
    new AssetsPlugin({
      filename: "assets.json",
      path: path.join(__dirname, "./data"),
      prettyPrint: true,
      integrity: true,
      entrypoints: false
    })
  ]
};
