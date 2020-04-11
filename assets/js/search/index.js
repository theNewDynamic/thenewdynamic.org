import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import {
	searchBox,
	hits,
	clearRefinements,
	refinementList,
	poweredBy,
} from "instantsearch.js/es/widgets";

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

const refinementTemplate = `<a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
{{label}} <span class="text-xs text-gray-600">({{count}})</span>
</a>`;

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
		cssClasses: {
			item: "tool_type",
		},
		templates: {
			empty(results) {
				return `<h3 class="text-2xl">No results for <q>${results.query}</q></h3>`;
			},
			item(hit) {
				return `
        <a href="${hit.uri}" class="block w-full h-full no-underline shadow-md hover:shadow-xl">
          <div class="${hit.primary_section}">
            <div class="px-2 py-1 text-xs">${hit.tool_type}</div>
          </div>
            <div class="p-3">
            <h2 class="font-bold text-xl text-gray-800 leading-tight mb-2">          
              ${hit.title}
            </h2>
            <p class="text-sm text-gray-700">${hit.description}</p>      
            </div>    
          </a>
        `;
			},
		},
	}),
	clearRefinements({
		container: "#clear-refinements",
		templates: {
			resetLabel: "Clear Filters",
		},
	}),
	refinementList({
		container: "#refinement-tool_type",
		attribute: "tool_type",
		sortBy: ["name:asc", "count:desc"],
		limit: 25,
		// templates: {
		// 	item: refinementTemplate,
		// },
	}),
	refinementList({
		container: "#refinement-interaction_type",
		attribute: "interaction_type",
		sortBy: ["name:asc", "count:desc"],
		limit: 25,
		// templates: {
		// 	item: refinementTemplate,
		// },
	}),
	refinementList({
		container: "#refinement-data_model",
		attribute: "data_model",
		sortBy: ["name:asc", "count:desc"],
		limit: 25,
		// templates: {
		// 	item: refinementTemplate,
		// },
	}),
	refinementList({
		container: "#refinement-license",
		attribute: "license",
		sortBy: ["name:asc", "count:desc"],
		limit: 25,
		// templates: {
		// 	item: refinementTemplate,
		// },
	}),
	refinementList({
		container: "#refinement-tags",
		attribute: "tags",
		sortBy: ["name:asc", "count:desc"],
		showMore: true,
		showMoreLimit: 50,
		limit: 10,
		// templates: {
		// 	item: refinementTemplate,
		// },
	}),
	poweredBy({
		container: "#powered-by",
	}),
]);

search.start();
