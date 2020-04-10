import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { searchBox, hits, clearRefinements, refinementList } from "instantsearch.js/es/widgets";
// import item from "item.html";

const searchClient = algoliasearch(
	"EGKL8BPJHJ",
	"fcbd6ff119bc3ddf14fa6115baa892ef"
);

const search = instantsearch({
	indexName: "jamstack-tools",
	routing: true,
	// TODO routing: searchRouting,
	searchClient,
});

search.addWidgets([
	searchBox({
		container: "#searchbox",
		placeholder: "Search for Jamstack tools",
		searchAsYouType: true,
		showReset: false,
		showSubmit: false,
		showLoadingIndicator: false,
		cssClasses: {
			input:
				"block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm",
		},
	}),

	hits({
		container: "#hits",
		// template: item
		templates: {
			empty: '<h3 class="text-2xl">No results for <q>{{ query }}</q></h3>',
			item: `
			  <div class="">      
			  <div>{{tool_type}}</div>
                <div class="">
                  {{title}}
                </div>
                <div class="hit-description">
                  {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
                </div>                
              </div>
            `,
		},
	}),
	clearRefinements({
		container: '#clear-refinements',
	  }),
	refinementList({
		container: "#refinement-tool_type",
		attribute: "tool_type",
		sortBy: ['name:asc','count:desc'],
		limit: 25,
	}),
	refinementList({
		container: "#refinement-interaction_type",
		attribute: "interaction_type",
		sortBy: ['name:asc','count:desc'],
		limit: 25,
	}),
	refinementList({
		container: "#refinement-data_model",
		attribute: "data_model",
		sortBy: ['name:asc','count:desc'],
		limit: 25,
	}),
	refinementList({
		container: "#refinement-license",
		attribute: "license",
		sortBy: ['name:asc','count:desc'],
		limit: 25,
	}),
	refinementList({
		container: "#refinement-tags",
		attribute: "tags",
		sortBy: ['name:asc','count:desc'],
		showMore: true,
		showMoreLimit: 50,
		limit: 10,
	}),

	
]);

search.start();
