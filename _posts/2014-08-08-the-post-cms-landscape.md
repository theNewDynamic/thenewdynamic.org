---
title: "The Post-CMS Landscape"
layout: page
published: false
tags: 
  - Static Site Generators
categories: 
  - tools
---

In [_The No-db Landscape_](/tools/the-no-db-landscape/) I layed out the differences between "flat-file" CMSs and static site generators. Today we'll have a look at the "Post-CMS" CMS and some new developments in the field.

What does "post-CMS" mean anyway? I didn't [make up](http://developmentseed.org/blog/2012/07/27/build-cms-free-websites/) the [phrase](http://ben.balter.com/2012/10/01/welcome-to-the-post-cms-world/), but in short the post-CMS world is one where the tools we use to build a website are composed of whatever suits the job as opposed to being dictated by a CMS that typically constitutes an entire way of being and comes packaged with lots of middleware you may never use. The "post-CMS" approach is lightweight, minimalistic and goes hand-in-hand with the static site renaissance. 

Aside from the technilogical baggage inherent in most CMSs, the practical usage and flexibility of these systems is sclerotic. Think about what you might do to migrate from one CMS to another. You would 1) start by setting up a server and database, 2) configuring and installing the software, 3) applying your data model to the new CMS (i.e. set up fields etc), 4) figuring out the database scheme or find a plugin to help with the import and then spend hours if not days trying to get the import right, 5) template the new site. 

Contrast this with the typical static site generator, you'd 1) install the software and any dependencies (typically this takes inside of 60 seconds), 2) dump your content in a folder, and 3) start templating. The entire process is a matter of minutes, not hours or days. My example is simplistic, but I've done this. I've taken content in bunch of text files and have freely moved them from one application to the next to find the best fit. In this world you are rewarded for experimentation. 


One of the best exemplars of this approach is the static site generator [Metalsmith.io](http://www.metalsmith.io/). Just launched in March of this year, Metalsmith, built on node.js, is as sophisticated as it is simple, owing to its "everything is a plugin" philosophy. The Metalsmith site provides some examples, like ebook generator and build tool, and its creator Ian Storm Taylor nicely laid out his use own cases on [Hacker News](https://news.ycombinator.com/item?id=7363734) to demonstrate their thinking. 



webhook (open sourcing)
prismic/contently - metalsmith

drupal static
concrete 5 static

Hugo

Assemble release

Brocoli Taco

Google SSL