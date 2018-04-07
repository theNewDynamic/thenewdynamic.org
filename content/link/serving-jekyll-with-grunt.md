---
title: Serving Jekyll with Grunt | MrLoh
source: Tobias Lohse
date: 2016-06-03 09:13:00 +0000
link: http://mrloh.se/2015/06/serving-jekyll-with-grunt/
content_type: Tutorial
tool:
- tool/jekyll.md
- tool/grunt.md

---
If you are running a Jekyll blog, you might find that simply running jekyll serve to generate all your files is not enough. I for example want to minify/uglify my CSS and JavaScript files and I totaly depend on Autoprefixer. So if you have done some serious front-end Web Development before you probably have used Grunt for things like that — if you haven’t heard of it, go check it out now. But running grunt watch and jekyll serve parallel is really slow, since a change in any grunt-processed file (e.g. your main.scss) will trigger several Jekyll builds, because Grunt will most likely creates several new files which will each trigger a Jekyll build. That’s no good! To solve the problem we will instead handle the compiling for any CSS/Sass and JavaScript/CoffeeScript ourselves with Grunt and only trigger Jekyll builds — also with grunt — if other files change and serve the whole thing with Grunt as well. 





