const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");

class TailwindExtractor {
	static extract(content) {
		return content.match(/[A-z0-9-:\/]+/g);
	}
}

module.exports = env => {
	console.log("NODE_ENV: ", process.env.NODE_ENV); // 'local'

	var CONFIG = {
		mode: "production",
		entry: {
			app: "./assets/index.js"
		},
		output: {
			path: path.resolve(__dirname, "assets/output"),
			filename: "js/[name].js" // string
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},			
				{
					test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								publicPath: "/fonts",
								name: "[name].[ext]",
								outputPath: "./../../static/fonts/"
								// useRelativePath: true
							}
						}
					]
				},
				// {
				// 	//Mustache loader for Algolia templates
				// 	test: /\.html$/,
				// 	loader: "mustache-loader?minify"
				// }
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				ENVIRONMENT: JSON.stringify(process.env.NODE_ENV)
			}),
			new CleanWebpackPlugin(["./assets/output"], {
				root: __dirname,
				verbose: true,
				dry: false,
				allowExternal: true
			})			
		]
	};
	return CONFIG;
};
