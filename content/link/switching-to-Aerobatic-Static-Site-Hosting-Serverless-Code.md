---
title: "Switching to Aerobatic Static Site Hosting"
source: Ryan Brown, Serverless Code
date: 2016-03-13 13:23:00 +0000
link: https://serverlesscode.com/post/aerobatic-static-site-hosting-conversion/
type: Tutorial
tool:
  - aerobatic
  - jekyll
  - hugo
---

Aerobatic runs on AWS, so features like their CDN (actually CloudFront) and free SSL certificates (issued by ACM) are backed by familiar tools. The hugo-lambda templates cover some of the same ground, but Aerobatic also comes with a wealth of knowledge and best practices in its configuration. They set cache lifetimes, do URL rewriting, and build Jekyll or Hugo sites automatically.
