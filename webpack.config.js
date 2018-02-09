const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

const glob = require("glob");
const webpack = require("webpack");

// const PATHS = {
//   src: path.join(__dirname, "public")
// };

// the path(s) that should be cleaned
let pathsToClean = ["./static/dist"];
// the clean options to use
let cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false,
  allowExternal: true
};
/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 * https://github.com/FullHuman/purgecss-webpack-plugin
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}
module.exports = function(environment) {
  var CONFIG = {
    entry: {
      app: "./src/js/main.js"
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
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  minimize: true || {
                    discardComments: {
                      removeAll: true
                    },
                    minifyFontValues: false,
                    autoprefixer: false
                  }
                }
              },
              "postcss-loader"
            ]
          })
        }
      ]
    },
    output: {
      path: path.join(__dirname, "./static/dist/")
    },

    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    },

    plugins: [
      new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
  };

  switch (environment) {
    case "development":
      CONFIG.output.filename = "js/[name].js";
      CONFIG.plugins.push(
        new ExtractTextPlugin({
          filename: getPath => {
            return getPath("css/[name].css");
          },
          allChunks: true
        })
      );
      watch: true;
      break;
    case "production":
      CONFIG.output.filename = "js/[name].[hash].js";
      CONFIG.plugins.push(
        new ExtractTextPlugin({
          filename: getPath => {
            return getPath("css/[name].[contenthash].css");
          },
          allChunks: true
        }),

        new PurgecssPlugin({
          paths: glob.sync(

          path.join(__dirname, "src/layouts/*.html"),
         // path.join(__dirname, "src/layouts/**/*.html")
      ),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html", "js", "php", "vue"]
        }
      ]
    })


      );
      break;
    default:
      CONFIG.output.filename = "js/[name].[hash].js";
  }
  return CONFIG;
};
