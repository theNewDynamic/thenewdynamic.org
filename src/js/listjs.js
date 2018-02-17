var List = require("list.js");
var options = {
  valueNames: ["title", "category", "description", "main-category", "related_tools"],
  listClass: "filteredlist"
};
var tools = new List("filter", options);
//console.log(tools)

var filterBtns = document.getElementsByClassName("filter-buttons");

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

var filterBtns_tools = document.getElementsByClassName("filter-buttons-tools");


var filters_tools = Array.prototype.filter.call(filterBtns_tools, function(filterBtn) {
  var related_tools = filterBtn.id;
  console.log(filterBtn.id)
  filterBtn.onclick = function() {
    tools.filter(function(item) {
      if (item.values().related_tools == related_tools) {
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
