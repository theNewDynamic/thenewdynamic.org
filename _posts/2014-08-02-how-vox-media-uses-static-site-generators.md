---
title: How Vox Media uses Static Site Generators
layout: page
category: use-cases
---
I'm constantly on the lookout for sophisticated and interesting uses of static site generators. Here's the forward thinking Vox Media on their use of Middleman as part of their publishing strategy:

> In a nutshell, our Editorial Apps system consists of a static [Middleman](http://middlemanapp.com/) site, which is populated from one or more Google Spreadsheets at build time (using our [middleman-google-drive](https://github.com/voxmedia/middleman-google_drive) extension, which we'll talk about in a future article), and then deployed to [Chorus](http://product.voxmedia.com/2012/5/6/5426772/all-together-now-introducing-the-vox-product-blog-and-chorus) by doing a git push and using git post-receive hooks, in a way not unlike deploying an app to [Heroku](https://www.heroku.com/).

Read the rest at [Vox Media's Product blog](http://product.voxmedia.com/2014/7/29/5863004/take-a-peek-at-the-code-that-powered-the-verge-50).