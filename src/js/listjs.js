var List = require("list.js");
var options = {
  valueNames: ["js-title", "category", "js-description", "js-main-category"],
  listClass: "js-filteredlist"
};
var tools = new List("filter", options);
console.log(tools)
var filterBtns = document.getElementsByClassName("js-filter-buttons");

var filters = Array.prototype.filter.call(filterBtns, function(filterBtn) {
  var category = filterBtn.id;
  console.log(filterBtn.id)
  filterBtn.onclick = function() {
    tools.filter(function(item) {
      if (item.values().category == category) {
        return true;
      } else {
        return false;
      }
    });
  };
});
//and clear the filters
if (document.getElementById("clear-filters")) {
    document.getElementById("clear-filters").onclick=function(){
    tools.filter();
  };
}
