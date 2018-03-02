const webpack = require("webpack")
const merge = require("webpack-merge")
const common = require("./webpack.common.js")

const postCSSLoaderOptions = {
  ident: "postcss",
  plugins: () => [
    // require('postcss-flexbugs-fixes'),
    // autoprefixer({
    //   flexbox: 'no-2009',
    // }),
    require("postcss-import"),
    require("tailwindcss")("./src/css/tailwind-config.js"),
    require("autoprefixer"),
  ],
}

module.exports = merge(common, {
  devtool: "inline-source-map",
  module: {
    rules: [
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      // By default we support CSS Modules with the extension .module.css
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          "style-loader",

          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true,
              minimize: true || {
                discardComments: {
                  removeAll: false,
                },
                minifyFontValues: false,
                autoprefixer: false,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: postCSSLoaderOptions,
          },

          // require.resolve("style-loader"),
          // {
          //   loader: require.resolve("css-loader"),
          //   options: {
          //     importLoaders: 1,
          //   },
          // },
          // {
          //   loader: require.resolve("postcss-loader"),
          //   options: postCSSLoaderOptions,
          // },
        ],
      },
    ],
  },
  plugins: [
    // define production === true to selectivily call scripts
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
    }),
  ],
  output: {
    filename: "js/[name].js",
  },
})
