---
title: "Develop sites over HTTPS from static site generators (like Jekyll)"
source: Paul Bakaus
date: 2016-08-05 11:46:00 +0000
link: https://paulbakaus.com/tutorials/html5/serve-pwaamp-over-https-from-static-site-generators-like-jekyll/
content_type: Tutorial
tool:
  - tool/jekyll.md
  - tool/grow.md
---
If you’re using a static site generator like Jekyll or Grow (recommended), you know that commands like jekyll serve or grow run will spin up local web servers that allow you to live develop and preview your static site. Unfortunately, these generators don’t create a secure context behind an HTTPS domain, something I need often to test PWA features or certain AMP tags.
