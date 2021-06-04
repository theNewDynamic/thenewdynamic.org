let timerId
export let tndWidgets = {
  searchBox: {
    queryHook(query, refine) {
      clearTimeout(timerId);
      timerId = setTimeout(() => refine(query), 500);
    },
  },
  hits: {
    transformItems(items) {
      return items.map(item => ({
        ...item,
        type: item.type.toUpperCase(),
      }));
    },
  },
  refinementBase: {
    templates: {
      item: `<a href="{{url}}" class="block w-full hover:bg-gray-400 px-3 -ml-3 py-1 text-gray-700{{#isRefined}} font-bold{{/isRefined}}">{{label}} <span class="text-xs text-gray-600 font-normal">({{count}})</span>
      </a>`,
      sortBy: ["name:asc", "count:desc"],
      operator: 'and'
    },
  }
}