---
title: "Supercharging Jekyll with a ServiceWorker - Eduardo saying things"
source: Eduard Boucas
date: 2015-06-04 23:22:00 +0000
link: https://eduardoboucas.com/blog/2015/06/04/supercharging-jekyll-with-a-serviceworker.html
content_type: Tutorial
tool:
  - tool/jekyll.md
---
From a performance point of view, it puts the developer in control of how local caching works — what files to cache, when to cache them, serve them and update them. Because it runs in the background, it can silently fetch and cache all the files for the About me and Contact sections of a website whilst the visitor is still scrolling about on the landing page. When they do visit those pages, they will be served instantly because the files are already on disk, there’s no need to wait for a trip to the server.





