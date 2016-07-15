window.onload = function() {
  var menuToggle = document.getElementById('js-mobile-menu');// may still need something for unbind
  var menu = document.getElementById('navigation-menu');
  menuToggle.addEventListener('click', function() {
    menu.classList.toggle('show');
  });
}; // window.onload
