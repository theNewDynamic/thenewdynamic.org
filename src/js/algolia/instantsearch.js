// import instantsearch, {
//   connectors,
//   widgets
// } from "instantsearch.js/dist/instantsearch";
// instantsearch() function without reference to the widgets or connectors
import instantsearch from "instantsearch.js/es";

// // import connectors individually
// import {connectSearchBox} from 'instantsearch.js/es/connectors';

// import widgets individually
import { searchBox } from "instantsearch.js/es/widgets";
import { stats } from "instantsearch.js/es/widgets";
import { clearAll } from "instantsearch.js/es/widgets";
import { refinementList } from "instantsearch.js/es/widgets";
import { hits } from "instantsearch.js/es/widgets";
import { pagination } from "instantsearch.js/es/widgets";

import hitTemplate from "./templates/hits-listed-content.html";
import noResultsTemplate from "./templates/no-results.html";
import queryResultsTemplate from "./templates/query-results.html";

const search = instantsearch({
  appId: "EGKL8BPJHJ",
  apiKey: "fcbd6ff119bc3ddf14fa6115baa892ef",
  indexName: "all_content",
  urlSync: true
  // ,
  // searchParameters: {
  //   filters: 'section:"tools"'
  // }
});

// initialize SearchBox

search.addWidget(
  searchBox({
    //container: "#search-box",
    container: "#searchbox",
    poweredBy: false,
    placeholder: "Search for Tools, Articles, and Showcase",
    magnifier: false,
    reset: false
  })
);

search.addWidget(
  stats({
    container: "#stats",
    templates: {
      body: queryResultsTemplate
    }
  })
);

search.addWidget(
  clearAll({
    container: "#clear-all",
    templates: {
      link: "Reset"
    },
    autoHideContainer: true,
    clearsQuery: true,
    cssClasses: {
      link:
        "inline-block px-3 py-1 no-underline rounded-t text-white text-sm bg-grey-darkest"
    }
  })
);

search.addWidget(
  refinementList({
    container: "#sections",
    attributeName: "section",
    operator: "and",
    limit: 10,
    collapsible: { collapsed: true },
    cssClasses: {
      item: "inline-block mr-3 my-2",
      list: "nav nav-list",
      count: "badge pull-right",
      active: "active"
    }
  })
);

search.addWidget(
  hits({
    hitsPerPage: 100,
    container: "#hits",
    collapsible: true,
    templates: {
      empty: noResultsTemplate,
      item: hitTemplate
    }
  })
);

// initialize pagination
search.addWidget(
  pagination({
    container: "#pagination",
    maxPages: 20,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: true
  })
);

// templates: {
//   item: function(data) {
//       return '<div class="mb-4"><div class="text-sm text-grey mb-2">' + data.section + '</div><a href="' + data.uri + '" class="text-lg no-underline text-black mb-3">' + data.title + '</a></div>'
//     }
// }

search.start();
