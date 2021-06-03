import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import instantsearch from 'instantsearch.js';
import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
import { simple as simpleMapping } from 'instantsearch.js/es/lib/stateMappings';
import * as instantWidgets from 'instantsearch.js/es/widgets';
import { tnd_config } from '@params'


// Depending if user uses Data file or Params for config, casing won't be consistent...
const indexName = typeof tnd_config.indexName != "undefined" ? tnd_config.indexName : tnd_config.indexname
const appId = typeof tnd_config.appId != "undefined" ? tnd_config.appId : tnd_config.appid
const apiKey = typeof tnd_config.apiKey != "undefined" ? tnd_config.apiKey : tnd_config.apikey
const startEmpty = typeof tnd_config.startEmpty != "undefined" ? tnd_config.startEmpty : tnd_config.startempty

let searchClient

let meiliSettings = {}
searchClient = instantMeiliSearch(appId, apiKey, meiliSettings)



let settings = {
  indexName,
  searchClient,

}
// If routing is true, we complement settings with those two.
if(tnd_config.routing){
  settings = {
    ...settings,
    routing: {
      router: historyRouter(),
      stateMapping: simpleMapping()
    },
  }
}
// If startEmpty is true, we complement settings a custom searchFunction
if(startEmpty) {
  settings = {
    ...settings,
    searchFunction(helper) {
      if (helper.state.query === '') {
        // empty query string -> hide the search results & abort the search
        document.body.classList.add('tnd-search-empty-query')
        document.body.classList.remove('tnd-search-filled-query')
      } else {
        document.body.classList.remove('tnd-search-empty-query')
        document.body.classList.add('tnd-search-filled-query')
      }
      helper.search();
    },
  }
}


// if tndAlgoliaSettings object export is found at /assets/tnd-search/instantsearch/settings.js 
// we spread its content on top of current settings.
if(typeof tndSettings !== "undefined"){
  settings = {
    ...settings,
    ...tndSettings
  }
}
const search = instantsearch(settings);

let widgets = []
tnd_config.widgets.forEach(widget => {
  if(widget.js) {
    // if tndWidgets object export is found at /assets/tnd-search/instantsearch/widgets.js 
    // we spread its content on top of current widget settings.
    if(tndWidgets[widget.js] !== 'undefined'){
      widget = {
        ...widget,
        ...tndWidgets[widget.js]
      }
    }
  }
  const widgetExist = require('./widgetExists.jsx')(widget)
  if(widgetExist){
    widgets.push(
      instantWidgets[widget.name](require('./widgetSettings.jsx')(widget))
    )
  } else {
    console.log(`No ${widget.name}`)
  }
});
//  attributesToSnippet: ['description:50'],
//snippetEllipsisText: '...',
let configure = {}
const allowedSettings = [
  "hitsPerPage",
  "distinct",
  "clickAnalytics",
  "enablePersonalization",
  "attributesToSnippet",
  "snippetEllipsisText"
]
allowedSettings.map(item => {
  if(typeof tnd_config[item] !== "undefined"){
    return configure = {
      ...configure,
      [item]: tnd_config[item]
    }
  }
})
widgets.push(instantWidgets.configure(configure))

search.addWidgets(widgets);

search.start();