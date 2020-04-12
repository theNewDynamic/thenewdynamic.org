module.exports = {
	theme: {
		textIndent: {
			// defaults to {}
			"1": "0.25rem",
			"2": "0.5rem",
		},
		textShadow: {
			// defaults to {}
			default: "0 2px 5px rgba(0, 0, 0, 0.5)",
			lg: "0 2px 10px rgba(0, 0, 0, 0.5)",
		},
		fontVariantCaps: {
			// defaults to these values
			normal: "normal",
			small: "small-caps",
			"all-small": "all-small-caps",
			petite: "petite-caps",
			unicase: "unicase",
			titling: "titling-caps",
		},
		fontVariantNumeric: {
			// defaults to these values
			normal: "normal",
			ordinal: "ordinal",
			"slashed-zero": "slashed-zero",
			lining: "lining-nums",
			oldstyle: "oldstyle-nums",
			proportional: "proportional-nums",
			tabular: "tabular-nums",
			"diagonal-fractions": "diagonal-fractions",
			"stacked-fractions": "stacked-fractions",
		},
		fontVariantLigatures: {
			// defaults to these values
			normal: "normal",
			none: "none",
			common: "common-ligatures",
			"no-common": "no-common-ligatures",
			discretionary: "discretionary-ligatures",
			"no-discretionary": "no-discretionary-ligatures",
			historical: "historical-ligatures",
			"no-historical": "no-historical-ligatures",
			contextual: "contextual",
			"no-contextual": "no-contextual",
		},
		textRendering: {
			// defaults to these values
			"rendering-auto": "auto",
			"optimize-legibility": "optimizeLegibility",
			"optimize-speed": "optimizeSpeed",
			"geometric-precision": "geometricPrecision",
		},
		textStyles: (theme) => ({
			// defaults to {}
			heading: {
				output: false, // this means there won't be a "heading" component in the CSS, but it can be extended
				fontWeight: theme("fontWeight.bold"),
				lineHeight: theme("lineHeight.tight"),
			},
			h1: {
				extends: "heading", // this means all the styles in "heading" will be copied here; "extends" can also be an array to extend multiple text styles
				fontSize: theme("fontSize.5xl"),
				"@screen sm": {
					fontSize: theme("fontSize.6xl"),
				},
			},
			h2: {
				extends: "heading",
				fontSize: theme("fontSize.4xl"),
				"@screen sm": {
					fontSize: theme("fontSize.5xl"),
				},
			},
			h3: {
				extends: "heading",
				fontSize: theme("fontSize.4xl"),
			},
			h4: {
				extends: "heading",
				fontSize: theme("fontSize.3xl"),
			},
			h5: {
				extends: "heading",
				fontSize: theme("fontSize.2xl"),
			},
			h6: {
				extends: "heading",
				fontSize: theme("fontSize.xl"),
			},
			link: {
				fontWeight: theme("fontWeight.bold"),
				color: theme("colors.blue.800"),
				"&:hover": {
					color: theme("colors.blue.600"),
					textDecoration: "underline",
				},
			},
			richText: {
				fontWeight: theme("fontWeight.normal"),
				fontSize: theme("fontSize.base"),
				lineHeight: theme("lineHeight.relaxed"),
				"> * + *": {
					marginTop: "1em",
				},
				h1: {
					extends: "h1",
				},
				h2: {
					extends: "h2",
				},
				h3: {
					extends: "h3",
				},
				h4: {
					extends: "h4",
				},
				h5: {
					extends: "h5",
				},
				h6: {
					extends: "h6",
				},
				ul: {
					listStyleType: "disc",
				},
				ol: {
					listStyleType: "decimal",
				},
				a: {
					extends: "link",
				},
				"b, strong": {
					fontWeight: theme("fontWeight.bold"),
				},
				"i, em": {
					fontStyle: "italic",
				},
			},
		}),
		fontFamily: {
			brand: [
				"URW Franklin Gothic W01",
				"URW Franklin Gothic",
				"system-ui",
				"BlinkMacSystemFont",
				"-apple-system",
				"Segoe UI",
				"Roboto",
				"Oxygen",
				"Ubuntu",
				"Cantarell",
				"Fira Sans",
				"Droid Sans",
				"Helvetica Neue",
				"sans-serif",
			],
			sans: [
				"Nunito",
				"Avenir Next W00",
				"Avenir Next",
				"Avenir",
				"system-ui",
				"BlinkMacSystemFont",
				"-apple-system",
				"Segoe UI",
				"Roboto",
				"Oxygen",
				"Ubuntu",
				"Cantarell",
				"Fira Sans",
				"Droid Sans",
				"Helvetica Neue",
				"sans-serif",
			],
			serif: [
				"Constantia",
				"Lucida Bright",
				"Lucidabright",
				"Lucida Serif",
				"Lucida",
				"DejaVu Serif",
				"Bitstream Vera Serif",
				"Liberation Serif",
				"Georgia",
				"serif",
			],
			mono: [
				"Menlo",
				"Monaco",
				"Consolas",
				"Liberation Mono",
				"Courier New",
				"monospace",
			],
		},
		extend: {
			gridTemplateColumns: {
				// Simple 16 column grid
				"16": "repeat(16, minmax(0, 1fr))",
			},
			colors: {
				"primary-color": {
					100: "#F8E6EB",
					200: "#EDC2CD",
					300: "#E19DAF",
					400: "#CB5374",
					500: "#B50938",
					600: "#A30832",
					700: "#6D0522",
					800: "#510419",
					900: "#360311",
				},
			},
		},
	},
	variants: {
		textIndent: ["responsive"],
		textShadow: ["responsive"],
		ellipsis: ["responsive"],
		hyphens: ["responsive"],
		kerning: ["responsive"],
		textUnset: ["responsive"],
		fontVariantCaps: ["responsive"],
		fontVariantNumeric: ["responsive"],
		fontVariantLigatures: ["responsive"],
		textRendering: ["responsive"],
	},
	plugins: [
		require("@tailwindcss/ui")({
			layout: "sidebar",
		}),
		require("tailwindcss-typography")({
			// all these options default to the values specified here
			ellipsis: true, // whether to generate ellipsis utilities
			hyphens: true, // whether to generate hyphenation utilities
			kerning: true, // whether to generate kerning utilities
			textUnset: true, // whether to generate utilities to unset text properties
			componentPrefix: "", // the prefix to use for text style classes
		}),
	],
};
