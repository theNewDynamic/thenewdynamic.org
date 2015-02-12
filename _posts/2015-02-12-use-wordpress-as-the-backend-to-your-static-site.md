---
title: "Use Wordpress as the Backend to your Static Site, using Roots"
layout: page
category: "editing-content"
---
I've seen caching systems that serve static pages from Wordpress before, but this is the first time I've seen Wordpress as the content editing interface for a statically generated site. The gist is that you use the Wordpress JSON API as your data store for the static site generator, so the only job for Wordpress is editing content and outputing a JSON file.

There is some complexity here: running an instance of Wordpress as well as Roots, deoployed via [Netlify](https://www.netlify.com/) and Github. But there are plenty of use-cases for something like this where you need the interface for editing (or, perhaps, just have a lot of content in Wordpress), but want to take advantage of the flexibility and performance or scalability of a static site. It looks like the Carrot Creative team are working on a lot of integrations for [Roots](http://roots.cx/). Here's a tutorial on setting it up, which altogether takes about twenty minutes.

<iframe width="640" height="480" src="https://www.youtube.com/embed/gdWZ0Bpvmw4?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
