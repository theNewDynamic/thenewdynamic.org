var atomicalgolia = require("atomic-algolia");
var indexName = "tnd_all_content";
var indexPath = "./public/index.json";
var cb = function(error, result) {
  if (err) throw error;

  console.log(result);
};

atomicalgolia(indexName, indexPath, cb);
// var atomicalgolia = require("atomic-algolia");
// var indexName = "tnd_all_content";
//
// var indexData = [
//   {
//     objectID: "2",
//     title: "An dexample record"
//   }
// ];
//
// var cb = function(error, result) {
//   if (err) throw error;
//
//   console.log(result);
// };
//
// atomicalgolia(indexName, indexData, cb);
