//console.log("NODE_ENV", process.env.NODE_ENV);
module.exports = {
	plugins: [
		require("postcss-import")({
			path: ["./assets/css"]
		}),
		require("tailwindcss")("./assets/css/tailwindcss/tailwind.config.js"),
		require("autoprefixer")({
			grid: false,
			browsers: [">1%"]
		}),
		...(process.env.NODE_ENV !== "development"
			? [
					require("@fullhuman/postcss-purgecss")({
						content: ["./layouts/**/*.html", "./components/**/**/*.html", "./assets/js/app/**/*.vue"],
						extractors: [
							{
								extractor: class {
									static extract(content) {
										//console.log(process.env.NODE_ENV);
										return content.match(/[A-z0-9-:\/]+/g);
										//return content.match(/[A-z0-9-:\/]+/g) || [];
									}
								},
								extensions: ["vue", "html"]
								
							}
						],
						whitelist: ["fill-current"]
					})
			  ]
			: []) //If Development, do not use PurgeCSS
	]
};
