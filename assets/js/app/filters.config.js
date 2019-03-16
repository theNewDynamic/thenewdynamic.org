var config = {
	searchableFields: ["title", "tags", "language", "interactions"],
	sortings: {
		name_asc: {
			field: "title",
			order: "asc"
		}
	},
	aggregations: {
		tool_type: {
			title: "Type",
			conjunction: true,
			sort: "term",
			order: "asc",
			size: 2000
		},
		interactions: {
			title: "Interaction Type",
			conjunction: false,
			sort: "title",
			order: "desc",
			size: 2000
		},
		data_model: {
			title: "Data Model (for CMSs)",
			conjunction: false,
			sort: "title",
			order: "desc",
			size: 2000
		},
		language: {
			conjunction: false,
			sort: "term",
			order: "asc",
			size: 2000
		},
		license: {
			title: "License",
			conjunction: false,
			sort: "title",
			order: "asc",
			size: 2000
		},
		tags: {
			title: "Tags",
			conjunction: false,
			sort: "term",
			order: "asc",
			size: 2000
		}
	}
};

export default config;
