var contentDiv = document.getElementById("content")
var header = document.getElementById("page-header")
var searchInput = document.getElementById("searchbox")
var results = document.getElementById("results")

document.addEventListener("DOMContentLoaded", function() {
  if (searchInput) {
    searchInput.addEventListener("input", event, false)
    function event() {
      results.classList.remove("results-hidden")
      contentDiv.classList.add("hidden")
      header.classList.add("hidden")
      console.log("yay")
    }
  }

  window.addEventListener(
    "keydown",
    function(event) {
      if (event.defaultPrevented) {
        return // Do nothing if the event was already processed
      }
      if (event.key == "Escape") {
        results.classList.toggle("results-hidden")
        contentDiv.classList.toggle("hidden")
        header.classList.toggle("hidden")
      }
    },
    true
  )
})
