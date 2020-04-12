import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import {
  searchBox,
  hits,
  clearRefinements,
  refinementList,
  stats,
  poweredBy,
} from "instantsearch.js/es/widgets";

const searchClient = algoliasearch(process.env.APP_ID, process.env.SEARCH_API);

const search = instantsearch({
  indexName: "jamstack-tools",
  routing: true,
  // TODO routing: searchRouting,
  searchClient,
});

const refinementTemplate = `<a href="{{url}}" class="block w-full hover:bg-gray-400 px-3 -ml-3 py-1 text-gray-700{{#isRefined}} font-bold{{/isRefined}}">{{label}} <span class="text-xs text-gray-600 font-normal">({{count}})</span>
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
        "block border -mt-4 w-full h-full pl-8 pr-3 py-2 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm",
    },
  }),

  hits({
    container: "#hits",
    cssClasses: {
      item: "tool_type w-full border text-3xl",
      list:
        "w-full m-0 sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
    },
    templates: {
      empty(results) {
        return `<h3 class="text-2xl">No results for <q>${results.query}</q></h3>`;
      },
      item(hit) {
        return `
        <a href="${hit.uri}" class="bg-white rounded-b block w-full h-full no-underline shadow-md hover:shadow-xl">
          <div class="${hit.primary_section}">
            <div class="px-2 py-1 text-xs font-semibold uppercase">${hit.tool_type}</div>
          </div>
            <div class="p-3">
            <h2 class="font-bold text-xl text-gray-700 leading-tight mb-2">          
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
    templates: {
      item: refinementTemplate,
    },
  }),
  refinementList({
    container: "#refinement-interaction_type",
    attribute: "interaction_type",
    sortBy: ["name:asc", "count:desc"],
    limit: 25,
    templates: {
      item: refinementTemplate,
    },
  }),
  refinementList({
    container: "#refinement-data_model",
    attribute: "data_model",
    sortBy: ["name:asc", "count:desc"],
    limit: 25,
    templates: {
      item: refinementTemplate,
    },
  }),
  refinementList({
    container: "#refinement-license",
    attribute: "license",
    sortBy: ["name:asc", "count:desc"],
    limit: 25,
    templates: {
      item: refinementTemplate,
    },
  }),
  refinementList({
    container: "#refinement-tags",
    attribute: "tags",
    sortBy: ["name:asc", "count:desc"],
    showMore: true,
    showMoreLimit: 50,
    limit: 10,
    templates: {
      item: refinementTemplate,
    },
  }),
  stats({
    container: "#stats",
    cssClasses: {
      text: "mr-2 font-medium text-base text-gray-700",
    },
    templates: {
      text: `
        {{#hasNoResults}}No tools{{/hasNoResults}}
        {{#hasOneResult}}1 tool{{/hasOneResult}}
        {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} tools{{/hasManyResults}}        
      `,
    },
  }),
  poweredBy({
    container: "#powered-by",
  }),
]);

search.start();
