if (PRODUCTION) {
  var documentLoad = "turbolinks:load"
} else {
  var documentLoad = "DOMContentLoaded"
}

if (document.querySelector('select[name="selectUrl"]')) {
  document.addEventListener(
    documentLoad,
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
    else window.location.href = event.target.value
  }
}
