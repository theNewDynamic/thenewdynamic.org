const path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
var AssetsPlugin = require("assets-webpack-plugin")

module.exports = {
  entry: {
    app: "./src/index.js",
    // algolia: "./src/algolia.js"
  },
  output: {
    path: path.join(__dirname, "./static/assets/"),
    publicPath: "/assets/", // DO WE NEED THIS?
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true || {
                discardComments: {
                  removeAll: true,
                },
                minifyFontValues: false,
                autoprefixer: false,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-import"),
                require("tailwindcss")("./src/css/tailwind-config.js"),
                require("autoprefixer"),
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
            // plugins: [require('babel-plugin-transform-object-rest-spread')]
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // “publicPath” is used by several Webpack’s plugins to update the URLs inside CSS, HTML files when generating production builds.
              // publicPath: "/assets/Fonts",
              // “path” tells  Webpack where it should store the result
              outputPath: "/Fonts/",
            },
          },
        ],
      },
      {
        //Mustache loader for Algolia templates
        test: /\.html$/,
        //loader: "mustache-loader",
        loader: "mustache-loader?minify",
        // loader: 'mustache-loader?{ minify: { removeComments: false } }'
        // loader: 'mustache-loader?noShortcut'
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(
      [
        "./static/assets/js/*.js",
        "./static/assets/css/*.css",
        "./static/assets/Fonts/*.*",
      ],

      {
        root: __dirname,
        verbose: true,
        dry: false,
        allowExternal: true,
      }
    ),
    new AssetsPlugin({
      filename: "webpack_assets.json",
      path: path.join(__dirname, "./data"),
      prettyPrint: true,
    }),
  ],
}
