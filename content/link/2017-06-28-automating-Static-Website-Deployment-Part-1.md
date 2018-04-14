---
title: Automating Static Website Deployment, Part 1
source: AlphaGeek
date: 2017-06-28 14:15:00 +0000
link: http://computersfearme.com/post/automate-website-updates-part1/
content_type: Tutorial
tags: deployment
related_tools:
- tool/hugo.md
- tool/s3.md
- tool/jekyll.md
- tool/middleman.md
- tool/assemble.md
- tool/spike.md

---
Now that I have 8 static websites deployed into AWS using S3 and CloudFront I need to automate the deployment process so that I can make changes quickly and get them to production with less effort. To that end I have developed some scripts and configurations that automate the deployment of this site to a QA environment and production when changes are pushed to either branch.
