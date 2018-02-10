//var listjs = require('list.js/dist/list.min.js');
var List = require('list.js');


var libraryFilters = {
  valueNames: ['title', 'isbn', 'author', 'date', 'genre'],
  listClass: 'filteredlist'
}


var library = new List('filter', libraryFilters)



// //and clear the filters
// if (document.getElementById("filter-none")) {
//     document.getElementById("filter-none").onclick=function(){
//     authorList.filter();
//   };
// }
