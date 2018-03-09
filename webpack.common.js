const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
    // algolia: "./src/algolia.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
            // plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // “publicPath” is used by several Webpack’s plugins to update the URLs inside CSS, HTML files when generating production builds.
              publicPath: "/dist/Fonts",
              // “path” tells  Webpack where it should store the result
              outputPath: "/Fonts/"
            }
          }
        ]
      },
      {
        //Mustache loader for Algolia templates
        test: /\.html$/,
        loader: "mustache-loader"
        // loader: 'mustache-loader?minify'
        // loader: 'mustache-loader?{ minify: { removeComments: false } }'
        // loader: 'mustache-loader?noShortcut'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      [
        "./static/dist/js/*.js",
        "./static/dist/css/*.css",
        "./static/dist/Fonts/*.*"
      ],

      {
        root: __dirname,
        verbose: true,
        dry: false,
        allowExternal: true
      }
    )
  ],
  output: {
    path: path.join(__dirname, "./static/dist/")
  }
};