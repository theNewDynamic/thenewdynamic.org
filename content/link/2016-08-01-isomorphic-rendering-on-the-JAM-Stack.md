---
tags:
- essentials
date: 2016-08-01T00:00:00Z
link: http://hawksworx.com/blog/isomorphic-rendering-on-the-jam-stack/
source: Phil Hawksworth
title: Isomorphic rendering on the JAM Stack
tool:
- netlify
- gulp
type: Tutorial
url: /2016/08/01/isomorphic-rendering-on-the-JAM-Stack/
---

I have been experimenting with something that seemed obvious to me for a while. A web development model which gives a pre-rendered, ready-to-consume, straight-into-the-eyeballs web page at every URL of a site. One which, once loaded, then behaves like a client-side, single page app.

The fact that so many frameworks set about this with all manner of complex add-ons and machinery gave me cause to think I was missing something big. So I built a simple proof of concept with a static site generator to see if this model could work. I'm pretty pleased with it. Let me talk you through the approach and show you the result.





