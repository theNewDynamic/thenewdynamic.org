---
title: "Segment"
date: 2014-10-28T13:57:00.000Z
related_tools:
  - tool/metalsmith.md
website: https://segment.com/
repo:
creator:
  - name:
    role:
    url:
    twitter_username:
images:
  - "/uploads/showcase/segment.jpg"
---

By the creators of Metalsmith. If it's just the simplest blog with a running series of Markdown files, then really any of the static site generators will do. But once you get into trying to implement some more advanced features then you run up against the limitations of most (if not all) of them because they assume way too much up front. A couple real-world examples from us at Segment.io are: **Documentation** - for our [docs](https://segment.io/docs) we want to be able to use the same simple static site generator without having all of the blogging logic. Basically the nesting of the files should result in the nesting of the URLs. But we also want to be able to tie in metadata that we have in our database about all of our integrations. And we'd also like to be able to write custom handlebars helpers that turn a simple JSON object into a widget that renders API calls in any of our supported languages. **Academy** - for our [academy](https://segment.io/academy) I really want to get to the point where we can generate PDFs for each of our articles and being to re-distribute them that was as eBooks (or potentially for a collection of articles) because that kind of thing appeals to enterprises who are looking for guidance. And we could even end up doing the same thing with our docs pages. And then we also want to have custom handlebars helpers for. **Blog** - for our [blog](https://segment.io/blog) we want just the most basic implementation, although maybe with some niceties about author metadata to load in avatars and such.Whenever you try and get into additional features that weren't considered by the original "static site" (or worse "static blog") generators, you usually end up building really cludgey code, if it's even possible. So with Metalsmith we avoid all of that, because the plugins can do whatever they want, and it's super trivial to add local plugins to the mix if you're cooking up something which you know is unique to just you. source: Ian Storm Taylor, posted at [Hacker News](https://news.ycombinator.com/item?id=7363734)
