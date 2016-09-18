---
title: "Does Varnish Make Jekyll Sites Faster?"
source: Matthew Simpson
date: 2016-09-07 11:12
link: https://www.matthewsimpson.net/2016/09/07/does-varnish-make-jekyll-faster/?
type: Tutorial
tool:
  - jekyll
---
I started reading about Varnish a while ago and decided to give it a go on my server. I was curious to see if it would do anything to speed up delivery of my site even though it’s built using Jekyll, so is completely static. I only realised once I’d set it up (which took longer than expected do to the site using SSL) that I could notice a difference myself, and would have to jiggle some stuff around so that I could performance test it. I’ll explain how it Varnish works and how I tested it compared to going straight to Apache.





