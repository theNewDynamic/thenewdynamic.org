---
title: "How Vox Media uses Static Site Generators"
date: 2014-08-02T22:09:00.000Z
posted_date: 2015-05-02T22:09:00.000Z
type: articles
slug: how-vox-media-uses-static-site-generators
source:
excerpt: Here&#39;s the forward thinking Vox Media on their use of Middleman as part of their publishing strategy
tool:
  - Middleman
---
I&#39;m constantly on the lookout for sophisticated and interesting uses of static site generators. Here&#39;s the forward thinking Vox Media on their use of Middleman as part of their publishing strategy:

&gt; In a nutshell, our Editorial Apps system consists of a static [Middleman](http://middlemanapp.com/) site, which is populated from one or more Google Spreadsheets at build time (using our [middleman-google-drive](https://github.com/voxmedia/middleman-google_drive) extension, which we&#39;ll talk about in a future article), and then deployed to [Chorus](http://product.voxmedia.com/2012/5/6/5426772/all-together-now-introducing-the-vox-product-blog-and-chorus) by doing a git push and using git post-receive hooks, in a way not unlike deploying an app to [Heroku](https://www.heroku.com/).

Read the rest at [Vox Media&#39;s Product blog](http://product.voxmedia.com/2014/7/29/5863004/take-a-peek-at-the-code-that-powered-the-verge-50).

This is interesting for a lot of reasons. Vox is, aside even from their publishing efforts, is on the forefront of content management with their Chorus CMS, so I&#39;m happy to hear that static sites fit into their vision. I&#39;m also interested to hear that their using Google Spreadsheets for data. As easy as I find Markdown documents and YAML lists, not everyone feels comfortable with them and a spreadsheet is comfortable and certainly good for some data, and, of course, using Google Spreadsheets has the benefit of being great for collaboration.

I&#39;ve seen others use this approach. Jim Pravetz used GS for an online shop and wrote about it on his blog [(&quot;Generating Jekyll Pages From Data&quot;)](http://jimpravetz.com/blog/2011/12/generating-jekyll-pages-from-data/), though I believe he&#39;s now using Shopify for that site now. Coderwall has a brief tutorial on [&quot;Use a Google Spreadsheet as your JSON backend&quot;](https://coderwall.com/p/duapqq) too.

Vox has made the source code for the [Verge-50 site](https://github.com/voxmedia/verge-50) public so anyeone can benefit from their work.

