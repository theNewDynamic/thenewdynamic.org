document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[name="selectUrl"]').onchange=changeEventHandler;
},false);
function changeEventHandler(event) {
    // You can use “this” to refer to the selected element.
    if(!event.target.value) alert('Please Select One');
    else window.location.href=event.target.value;
}
