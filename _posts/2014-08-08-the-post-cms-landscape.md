---
title: The Post-CMS Landscape
layout: page
published: false
tags:
  - Static Site Generators
  - Post CMS
  - Prismic.io
  - Content.ly
  - Webhook
categories:
  - tools
---
In [_The No-db Landscape_](/tools/the-no-db-landscape/) I wrote about the differences between "flat-file" CMSs and static site generators. Today we'll have a look at the idea of a "Post-CMS" and some new developments.


While I didn't [make up](http://ben.balter.com/2012/10/01/welcome-to-the-post-cms-world/), the term ["Post CMS,"](http://developmentseed.org/blog/2012/07/27/build-cms-free-websites/) the idea has resonated with me enough to devote part of this site to the idea. To my mind, "post-CMS" means the disaggregation and, in many cases, elimination of the component parts of a CMS. So a post-cms may have a database of some sort, and it may have an editor and many other facets of a CMS, but each of those tools is not only entirely optional, but may very well come from different sources. They're _ála carte_ rather than _prix fixe_.




Statically generated sites are but a subset of the post-CMS paradigm and actually the most minimal manifestation; the opposite, in most cases, of a CMS. When we think of static site generators we think of content in markdown or text documents, or perhaps a JSON file or even a spreadsheet, which is then processed through templates with the result being an entire website generated at once. There are trade-offs to this approach and one of them is the lack, at the moment, of a truly competent web-based editor. It's easy enough to display and organize a site's content and I find text files and spreadsheets far less alienating than having my content stuck away in a database, yet for non-technical people, the lack of editor is daunting and can lead to errors in metadata across documents.


[Prose.io](http://prose.io) was a good start, but some of capabilities are only for Jekyll-based sites and it languishes in a state of nearly complete development. Other editors, like [Draft](https://draftin.com) and (Stack Edit)[https://stackedit.io/] have loose integrations with Github where many people store their site's documents, but aren't purpose-built for the function have no media upload capability.

This leads me to another trend that's started over the past few years: Entirely separating the function of content management from the function of displaying that content on a website.  Stripping the "system" from content management, these tools are billed as "content management as a service" and are entirely focused on the content editing aspects of a website. In fact, none of the features of a content management system are present other than content management. Examples include [Osmek](http://osmek.com/), [Contentful](https://www.contentful.com/), and [Prismic](https://prismic.io/). [Webhook](http://www.webhook.com/) is a closely related example, though it's a bit more of a fully blown system than the others, but I include it because it's the only one that is open source (Webhook is a service and the underlying software is being open sourced) and it is also a static site generator.














One of the best exemplars of this approach is the static site generator [Metalsmith.io](http://www.metalsmith.io/). Just launched in March of this year, Metalsmith, built on node.js, is as sophisticated as it is simple, owing to its "everything is a plugin" philosophy. The Metalsmith site provides some examples of how you might use it, like ebook generator and build tool, and its creator Ian Storm Taylor nicely laid out his use own cases on [Hacker News](https://news.ycombinator.com/item?id=7363734) to demonstrate their thinking.



webhook (open sourcing)
prismic/contently - metalsmith


drupal static
concrete 5 static


Hugo


Assemble release


Brocoli Taco


Google SSL
