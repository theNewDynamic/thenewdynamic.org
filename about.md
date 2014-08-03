---
layout: page
title: About the Site
permalink: /about/
---
The purpose of this site is to promote the use of static site generators for people who build websites. I hope to fill the site out and as it grows add functionality to to make it easy to find resources and information related to the top static site generators.

The site will be editorially driven; that is, it will not attempt to be comprehensive, just, hopefully, interesting.

Soon, I will make the tags live links and add search and other functionality.

[Pull requests welcome](https://github.com/budparr/thenewdynamic)


#### Details of the site.

This site is built with [Jekyll](http://jekyllrb.com/) with my own [theme](https://github.com/budparr/jekyll-on-the-rocks) coded by hand in Sublime Text and is published to [Github Pages](https://pages.github.com/).

As of August 2, 2014, this site's ["PageSpeed Insights"](https://developers.google.com/speed/pagespeed/insights/) score is 94/100 for desktop and 87/100 for mobile, with 98/100 for user experience. That's tested on an interior page without the twitter feed and the insights tool's primary complaint is that I'm not using "browser caching," but that's not possible with Github Pages as host. My favorite site on this subject is Patrick Sexton's ["Feedthebot"](http://www.feedthebot.com/pagespeed/), if you care to optimize your site.

Of course, PageSpeed Insights doesn't actually test for the speed of a site, just its configuration. A quick ["WebPageTest"](http://www.webpagetest.org/) test from an east coast location (I'm based in New York City) shows load times of 0.785s for first load and 0.501s for subsequent loads and 1.291s and 0.083s, respectively from the west coast, with both rendering "A"s across the board except for "Cache Static Content," which, again, is not part of the stock Github Pages offering. This is a simple and lightweight site, so I wouldn't call these "real world" test examples, but I do follow best practices, like loading javascript asynchronously, and so on.


I have a branch of this site published to an [AWS](http://aws.amazon.com/) S3 bucket, using [@laurilehmijoki's](https://github.com/laurilehmijoki) excellent [S3_website gem](https://github.com/laurilehmijoki/s3_website) and [Travis Continuous Integration](https://travis-ci.org/) Service to push my builds from Github to S3. Here are some tutorials:

- ["Host a static site on Amazon S3 & deploy with Github & Travis", by Charles Lirsac and the gang from nowhere becaause there ti s no sumehwere](http://lirsac.me/blog/host-on-amazon-s3-and-deploy-with-github-and-travis/)
- ["Static website on S3, CloudFront and Route 53, the right way!", by Michaël Gallego](http://www.michaelgallego.fr/blog/2013/08/27/static-website-on-s3-cloudfront-and-route-53-the-right-way/)
- ["Deploying your Jekyll Site to S3 with Travis CI", by Mathias Meyer](http://www.paperplanes.de/2013/8/13/deploying-your-jekyll-blog-to-s3-with-travis-ci.html)
