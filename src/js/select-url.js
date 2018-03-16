document.addEventListener(
  "DOMContentLoaded",
  function() {
    document.querySelector(
      'select[name="selectUrl"]'
    ).onchange = changeEventHandler
  },
  false
)

function changeEventHandler(event) {
  // You can use “this” to refer to the selected element.
  if (!event.target.value) log.console("select")
  window.location.href = event.target.value
}
