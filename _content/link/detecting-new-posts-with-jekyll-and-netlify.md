---
title: Detecting new posts with Jekyll and Netlify
date: 2018-09-04 19:23:30 -0400
source: Human Who Codes
link: https://humanwhocodes.com/blog/2018/09/detecting-new-post-jekyll-netlify/
video: false
content_type: Tutorial
category: ''
related_tools:
- tool/netlify.md
- tool/jekyll.md
keywords: []

---
This blog has long featured the ability to subscribe by email, so you could get an email notification when a new post was published. I’ve used various services over the years to achieve this, first with FeedBurner and later with Zapier. As I’m a do-it-yourself kind of person, I never liked relying on external services to determine when a new post appeared on my blog. I figured I would never be able to build my own system When I moved this blog from the dynamic Wordpress to the static Jekyll\[1\]. Still, it seemed like a waste to have a service keep polling an RSS feed to see if it changed. After all, I know when my blog is being built…why can I just check for a new post then? It took me a little while and several iterations but eventually I figured out a way.