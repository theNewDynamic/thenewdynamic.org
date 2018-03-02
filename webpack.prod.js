const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const glob = require("glob-all");

const postCSSLoaderOptions = {
  ident: "postcss",
  plugins: () => [
    // require('postcss-flexbugs-fixes'),
    // autoprefixer({
    //   flexbox: 'no-2009',
    // }),
    require("postcss-import"),
    require("tailwindcss")("./src/css/tailwind-config.js"),
    require("autoprefixer")
  ]
};

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

module.exports = merge(common, {
  module: {
    rules: [
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
            {
              loader: "postcss-loader",
              options: postCSSLoaderOptions
            }
          ]
        })
      }
    ]
  },

  plugins: [
    // define const production  to selectivily call scripts
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    }),
    // In production, hash our CSS
    new ExtractTextPlugin({
      filename: getPath => {
        return getPath("css/[name].[contenthash].css");
      },
      allChunks: true
    }),
    // In production, Run our CSS through PurgeCSS
    new PurgecssPlugin({
      whitelist: ["body", ".whitelisted-class"],
      paths: glob.sync([
        path.join(__dirname, "layouts/**/*.html"),
        path.join(__dirname, "themes/hugo-base-layouts/layouts/**/*.html")
      ]),
      // TailwindExtractor runs through our layouts to get the CSS for PurgeCSS
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html"]
        }
      ]
    }),
    new UglifyJSPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    filename: "js/[name].[chunkhash].js"
  }
});
