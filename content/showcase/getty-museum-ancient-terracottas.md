---
title: "Getty Museum's Ancient Terracottas"
date: 2016-02-04T03:47:00.000Z
website: 'http://www.getty.edu/publications/terracottas/'
repo:
related_tools:
  - middleman
  - lunrjs
creator:
  - name: 'Eric Gardner, Getty Museum'
    role: 'Design/Development'
    url: 'http://egardner.github.io/'    
    twitter_username:
image: /uploads/getty-museum-ancient-terracottas-1600.jpg
---


Static site generators are great for a lot of things but I'm especially excited about their potential in the world of book publishing. Most small publishers don't have the resources to maintain a new server-side application every time they want to publish a new book. And for us as a museum, the long-term availability of the content is an important concern. But the bar is set very high by the beautiful print books people are accustomed to, so delivering a poor experience in the name of long-term sustainability is not an option either.

I think that's where tools like Middleman really shine. There is a master set of content files (Markdown and YAML docs) and then a series of different output formats are auto-generated as necessary. Write once, put it in version control, and publish anywhere – that's the dream, and I think it's becoming doable.

Anyway, that's the underlying philosophy behind the project. It is 100% static – the "database" for catalogue entries is just a bunch of YAML files. Other static features include:

* Client-side search (full-text) via [Lunr.js](http://lunrjs.com/).
* [SmoothState](http://smoothstate.com/): These two actually work together; the full-text search index is too heavy to load each time the user navigates to a new page, so with SmoothState it is initialized once and then always ready. In some ways these performance gains were much more important than the transition effects, though the latter is why I first wanted to use it.
* The catalogue page is actually a self-contained [Vue.js](http://vuejs.org/) component; Vue is a really promising framework for these kind of static projects. Client-side JS apps plus static back-ends are a powerful combination.
* [Leaflet.js](http://leafletjs.com/) powers both the maps as well as the zoomable images; it's a really versatile library
* [PrinceXML](http://www.princexml.com/) for automatic generation of a printable PDF. This is the only non-open-source tool in the stack, but nothing else comes close to its output quality in my experience.


[source, Github](https://github.com/gettypubs/terracottas)

Additional Blog Posts: ["Building Books with Middleman Extensions"](http://egardner.github.io/posts/2015/building-books-with-middleman/), ["An Editor’s View of Digital Publishing"](http://blogs.getty.edu/iris/an-editors-view-of-digital-publishing/)", ["Interview with Eric Gardner, of Getty Publications"](/interview/2017/01/26/interview-with-eric-gardner-getty/)
