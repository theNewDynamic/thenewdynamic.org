var config = {
	searchableFields: ["title", "tags"],
	sortings: {
		title: {
			field: "title",
			order: "asc"
		}
	},
	aggregations: {
		tool_type: {
			title: "Type",
			conjunction: true,
		  sort: "title",
			order: "asc",
			size: 2000
    },
    data_model: {			
			title: "Data Model (for CMSs)",
			conjunction: false,
		  sort: "title",
			order: "asc",
			size: 2000
    },    
    language: {			
			conjunction: false,
		  sort: "title",
			order: "asc",
			size: 2000
    },
    tags: {
			title: "Tags",
			conjunction: false,
		  sort: "title",
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
    
    

	}
};

export default config;
