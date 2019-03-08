<template>
  <!-- Following classes conditions allow styling loading etc.. -->
  <div class="to-load" :class="{ 'is-loading': loading, 'done-loading': !loading }">
    <!-- Search ROW -->
    <div class="relative mr-16 my-8">
      <input
        aria-describedby="name-desc"
        type="search"
        v-model="query"
        class="bg-purple-white shadow w-full rounded border-0 py-3 pl-12 pr-4"
        placeholder="Search by name..."
      >
      <div class="absolute pin-l pin-t mt-3 ml-4 text-purple-lighter">
        <svg
          version="1.1"
          class="h-4 text-dark"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 52.966 52.966"
          style="enable-background:new 0 0 52.966 52.966;"
          xml:space="preserve"
        >
          <path
            d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
            c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
            C52.074,52.304,52.086,51.671,51.704,51.273z M21.983,40c-10.477,0-19-8.523-19-19s8.523-19,19-19s19,8.523,19,19
            S32.459,40,21.983,40z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="font-sans sm:grid grid-columns-8 grid-gap-4">
      <div class="facets col-span-2 bg-white shadow py-8 px-4">
        <!-- itemJS returns an object containing facets and items.
        We here loop through aggregation and load a facet vue component for each-->
        <div v-for="facet in searchResult.data.aggregations" :key="facet.id">
          <facet :facet="facet" :filters="filters"></facet>
        </div>
      </div>

      <div class="results col-span-6">
        <div class="sm:grid grid-columns-2 lg:grid-columns-3 grid-gap-4 xl:grid-columns-4">
          <div
            v-for="item in searchResult.data.items"
            :key="item.id"
            class="bg-white col-span-1 h-full mb-4 shadow hover:shadow-lg"
          >
            <!-- itemJS returns an object containing facets and items.
            We here loop through results and load a facet plan component for each-->
            <tool :item="item"></tool>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let itemsJS = require("itemsjs");
import facet from "./components/facet.vue";
import tool from "./components/tool.vue";

import config from "./filters.config.js";

export default {
  components: {
    facet,
    tool
  },
  name: "app",
  data: function() {
    // Configuration has been loaded from ../configuration.js
    let configuration = config;
    // We generate the filters from the configuration
    var filters = {};
    Object.keys(configuration.aggregations).map(function(v) {
      filters[v] = [];
    });
    return {
      loading: true,
      configuration: configuration,
      // Query is the current value of text search input
      query: "",
      // We must populate the following with emtpty values, so the App can start without the
      // JSON endpoint fetched. There is no way for the computed method to wait for data to be fetched.
      items: {},
      searchResults: {
        data: {
          items: {},
          aggregations: {}
        }
      },
      // initializing filters with empty arrays
      filters: filters
    };
  },
  mounted: function() {
    fetch("../tool/index.json") // Call the fetch function passing the url of the API as a parameter
      .then(resp => {
        return resp.json(); // json response is turned into an object
      })
      .then(data => {
        // We populate the items variable of the app with the itemJS object built from config and json
        this.items = itemsJS(data.data.items, this.configuration);
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    // Reset method is not used yet.
    reset: function() {
      let filters = {};
      Object.keys(configuration.aggregations).map(function(v) {
        filters[v] = [];
      });

      this.filters = filters;
      this.query = "";
    }
  },
  computed: {
    // Computed method must start witha an emptuy object.
    searchResult: function() {
      let result = {
        data: {
          items: {}
        }
      };
      console.log("Search Results", this.items.search);
      // It updates when items.search is available (after json endpoint is fetched and interpreted)
      if (typeof this.items.search != "undefined") {
        result = this.items.search({
          per_page: 500,
          sort: "name_asc",
          query: this.query,
          filters: this.filters
        });
      }
      return result;
    }
  }
};

// let params = (new URL(document.location)).searchParams;
// let name = params.get('name'); // is the string "Jonathan Smith".
// let age = parseInt(params.get('age')); // is the number 18

// console.log("param", age)
</script>

<style lang="scss" scoped>
.to-load {
  min-height: 70vh;
  opacity: 0.2;
  transition: opacity 300ms;
  &.done-loading {
    min-height: 0;
    opacity: 1;
  }
}
</style>