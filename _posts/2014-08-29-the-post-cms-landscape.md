---
title: "The Post-CMS Landscape"
layout: page
published: true
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


I didn't [make up](http://ben.balter.com/2012/10/01/welcome-to-the-post-cms-world/) it up, but I love the idea of a  ["Post CMS"](http://developmentseed.org/blog/2012/07/27/build-cms-free-websites/) world and it should resonate with anyone who has devoted countless hours to installing, configuring, updating and coding big content management systems. To my mind, "post-CMS" means the disaggregation and, in many cases, elimination of the component parts of a CMS. What remains is simply the tools we need to for a particular project and nothing more.

Is there such a thing as a Post-CMS CMS? Perhaps, but it doesn't look much like what we've known in the past. A post-CMS CMS may or may not have a database of some sort, and it may have an editor and many other facets of a CMS, but it won't have layers of pre-built software that comes with it. Each of those components is not only entirely optional, but may very well come from different sources. They're _ála carte_ rather than _prix fixe_; tapas rather than Beef Wellington!

An exemplar of this approach is the static site generator [Metalsmith.io](http://www.metalsmith.io/). Just launched in March and already proving to be popular, Metalsmith, built on Node.js, is as sophisticated as it is simple, owing to its "everything is a plugin" philosophy. 

Statically generated sites are but a subset of the post-CMS paradigm and actually the most minimal manifestation; the opposite, in most cases, of a CMS. When we think of static site generators we think of content in markdown or text documents, or perhaps a JSON file or even a spreadsheet, which is then processed through templates with the result being an entire website generated at once. There are trade-offs to this approach and one of them is the lack, at the moment, of a truly competent web-based editor. 

Another recent trend: Entirely separating the function of content management from the functions of displaying that content on a website. Stripping the "system" from content management, these tools are billed as "content management as a service" and are entirely focused on the content editing aspects of a website. In fact, none of the features of a content management system are present other than actual content management. You can use your content on as many sites as you like; it's all available via an API to deploy with, typically, a variety of programming languages.

CMaaS examples include [Osmek](http://osmek.com/), [Contentful](https://www.contentful.com/), and [Prismic](https://prismic.io/). [Webhook](http://www.webhook.com/) is a closely related example, though it's a fully blown system, it is also a static site generator.

One contender in the CMaaS field, Prismic.io, has created their own static site generator, [baked.js](http://prismicio.github.io/baked.js/) [(blog post)](https://blog.prismic.io/U3TAFgEAAC8AwopU/bakedjs-integrate-content-management-into-a-static-website-generator-using-javascript). Additionally, the community has contributed plugins for Metalsmith to integrate both [Prismic.io](https://github.com/mbanting/metalsmith-prismic) and [Contentful](https://github.com/contentful/contentful-metalsmith).

One aspect of static site generators I enjoy is the ease with which one can move content from one application to another. After all, these are developer tools and should be chosen to fit the job. One wonders though, with the CMaaS systems, how easy it would be to move content from on system to another if a provider went out of business, changed their service or pricing, or your needs changed.