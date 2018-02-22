import instantsearch, {
  connectors,
  widgets
} from "instantsearch.js/dist/instantsearch";

import hitTemplate from "./templates/hits.html";
import noResultsTemplate from "./templates/no-results.html";
import queryResultsTemplate from "./templates/query-results.html";

var search = instantsearch({
  appId: "EGKL8BPJHJ",
  apiKey: "fcbd6ff119bc3ddf14fa6115baa892ef",
  indexName: "all_content",
  urlSync: true
});

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    //container: "#search-box",
    container: "#searchbox",
    placeholder: "Search for Tools, Articles, and Showcase",
    magnifier: false,
    reset: false
  })
);

// initialize currentRefinedValues
search.addWidget(
  instantsearch.widgets.currentRefinedValues({
    container: "#current-refined-values",
    clearAll: "after",
    clearsQuery: true,
    templates: {
      item: queryResultsTemplate
    },
    attributes: [
      { name: "section", label: "Sections" },
      { name: "license", label: "licensel" }
      // {name: 'brand', label: 'Brand'},
      // {name: 'category', label: 'Category'},
    ],
    onlyListedAttributes: false
  })
);

// initialize clearAll
search.addWidget(
  instantsearch.widgets.clearAll({
    container: "#clear-all",
    templates: {
      link: "Reset everything"
    },
    autoHideContainer: true
  })
);

// initialize RefinementList

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: "#refinement-list",
//     attributeName: "Section",
//     templates: {
//       header: "Section"
//     }
//   })
// );
//
// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: "#refinement-list",
//     attributeName: "Section",
//     templates: {
//       header: "Section"
//     },
//     searchForFacetValues: {
//       placeholder: "Search for Sections",
//       templates: {
//         noResults: '<div class="sffv_no-results">No matching brands.</div>'
//       }
//     }
//   })
// );

// search.addWidget(
//   instantsearch.widgets.refinementList({
//     container: "#refinement-list",
//     attributeName: "Section",
//     templates: {
//       header: "Sections"
//     }
//   })
// );

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#sections",
    attributeName: "section",
    operator: "and",
    limit: 10,
    cssClasses: {
      list: "nav nav-list",
      count: "badge pull-right",
      active: "active"
    }
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    filters: "section:tool",
    hitsPerPage: 100,
    container: "#hits",
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }
  })
);

// initialize pagination
search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination",
    maxPages: 20,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false
  })
);

// templates: {
//   item: function(data) {
//       return '<div class="mb-4"><div class="text-sm text-grey mb-2">' + data.section + '</div><a href="' + data.uri + '" class="text-lg no-underline text-black mb-3">' + data.title + '</a></div>'
//     }
// }

search.start();
