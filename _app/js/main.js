var toggleState = function (elem, one, two) {
  var elem = document.querySelector(elem);
  elem.setAttribute('data-state', elem.getAttribute('data-state') === one ? two : one);
};

nav.onclick = function (e) {
  toggleState('.sliding-panel', 'closed', 'open');
  e.preventDefault();
};

