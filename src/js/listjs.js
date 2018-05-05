if (PRODUCTION) {
  var documentLoad = "turbolinks:load"
} else {
  var documentLoad = "DOMContentLoaded"
}

document.addEventListener(documentLoad, function() {
  var List = require("list.js")

  var options = {
    valueNames: [
      "title",
      "tags",
      "description",
      "main-category",
      "related_tools",
      "data_model",
      "license",
      "article-count",
      "language",
      "name",
    ],
    listClass: "filteredlist",
  }

  var tools = new List("filter", options)
  //console.log(tools)

  var filterButtonsDataModel = document.getElementsByClassName(
    "filter-buttons-data_model"
  )
  var filterByDataModel = Array.prototype.filter.call(
    filterButtonsDataModel,
    function(filterBtn) {
      var filter = filterBtn.id
      filterBtn.onclick = function() {
        tools.filter(function(item) {
          return item.values().data_model == filter ? true : false
        })
      }
    }
  )

  var filterBtnsLanguage = document.getElementsByClassName(
    "filter-buttons-language"
  )

  var filterByLanguage = Array.prototype.filter.call(
    filterBtnsLanguage,
    function(filterBtn) {
      var filter = filterBtn.id
      filterBtn.onclick = function() {
        tools.filter(function(item) {
          return item.values().language == filter ? true : false
        })
      }
    }
  )

  var filterBtnsLicense = document.getElementsByClassName(
    "filter-buttons-license"
  )

  var filterByLicnse = Array.prototype.filter.call(filterBtnsLicense, function(
    filterBtn
  ) {
    var filter = filterBtn.id
    filterBtn.onclick = function() {
      tools.filter(function(item) {
        return item.values().license == filter ? true : false
      })
    }
  })

  var filterBtnsTools = document.getElementsByClassName("filter-buttons-tools")
  var filtersByTools = Array.prototype.filter.call(filterBtnsTools, function(
    filterBtn
  ) {
    var filter = filterBtn.id
    //console.log(filterBtn.id)
    filterBtn.onclick = function() {
      tools.filter(function(item) {
        return item.values().related_tools == filter ? true : false
      })
    }
  })

  var filterBtnsTags = document.getElementsByClassName("filter-buttons-tags")

  var filterByTags = Array.prototype.filter.call(filterBtnsTags, function(
    filterBtn
  ) {
    var filter = filterBtn.id
    filterBtn.onclick = function() {
      tools.filter(function(item) {
        return item.values().tags == filter ? true : false
      })
    }
  })

  //and clear the filters
  if (document.getElementById("clear-filters")) {
    document.getElementById("clear-filters").onclick = function() {
      tools.filter()
    }
  }
  if (document.getElementById("sort-by-article-count")) {
    tools.sort("article-count", { order: "asc" })
  }
})
// console.log("listjs is in")
// document.addEventListener("DOMContentLoaded", function() {})
