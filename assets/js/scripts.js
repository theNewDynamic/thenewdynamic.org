---
layout: null
---
{% include scripts/jquery/dist/jquery.min.js %}

  $(function() {
    var menu = $('.js-mobile-menu');
    var menuToggle = $('#js-mobile-menu');

    $(menuToggle).on('click', function(e) {
      e.preventDefault();
      menu.slideToggle(function(){
        if(menu.is(':hidden')) {
          menu.removeAttr('style');
        }
      });
    });
  });