// For tools' mobile nav
document.addEventListener(
  "turbolinks:load",
  function() {
    var selectButton = document.querySelector('select[name="selectUrl"]')

    if (selectButton) {
      this.onchange = changeEventHandler
    }
  },
  false
)
function changeEventHandler(event) {
  // You can use “this” to refer to the selected element.
  if (!event.target.value) alert("Please Select One")
  else window.location.href = event.target.value
}
