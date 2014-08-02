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


  WebFontConfig = {
    google: { families: [ 'Open+Sans:300italic,400italic,400,300,700:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();