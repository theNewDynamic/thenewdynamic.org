var searchButton = document.getElementById("reveal-search");
var searchPanel = document.getElementById("search-panel");
var contentDiv = document.getElementById("content");
var searchBox = document.getElementById("searchbox");
var results = document.getElementById("results");

if (searchButton) {
  searchButton.onclick = function() {
    searchPanel.classList.toggle("drawer-hidden");
    results.classList.toggle("hidden");
    contentDiv.classList.toggle("opacity-0");
    // body.href = "/search-results/";
    searchBox.focus();
    searchBox.select();
  };
}

// if (searchBox) {
//   searchBox.addEventListener("input", event);
//
//   function event() {
//     results.classList.remove("hidden");
//     contentDiv.classList.add("opacity-0");
//   }
//   // results.classList.remove("hidden");
// }

// window.addEventListener(
//   "keydown",
//   function(event) {
//     if (event.defaultPrevented) {
//       return; // Do nothing if the event was already processed
//     }
//
//     if (event.key == "Escape") {
//       console.log("yay");
//       searchPanel.classList.toggle("drawer-hidden");
//       results.classList.toggle("hidden");
//       contentDiv.classList.toggle("opacity-0");
//       // contentDiv.classList.remove("opacity-0");
//       // results.classList.add("hidden");
//     }
//     // Cancel the default action to avoid it being handled twice
//     // event.preventDefault();
//   },
//   true
// );
