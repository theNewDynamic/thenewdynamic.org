---
title: "Travis CI deployments to DigitalOcean"
source: Mxime Kjaer
date: 2016-01-28 09:37
link: http://kjaermaxi.me/travis/
type: Tutorial
tool:
  - jekyll
---
In my continuous quest to make this site lean and mean, all of the above have led me to set up automatic deployments to my server. This means that my workflow now just consists of creating content and committing it — the rest is done automatically. Travis CI builds the site, compresses assets, runs a few tests, and deploys it all to DigitalOcean, where Nginx serves it.





