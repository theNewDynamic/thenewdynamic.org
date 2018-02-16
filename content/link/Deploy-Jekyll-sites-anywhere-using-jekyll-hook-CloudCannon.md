---
title: "Deploy Jekyll sites anywhere using jekyll-hook"
source: "Mike Neumegen, CloudCannon"
date: 2016-01-26 19:50:00 +0000
link: http://cloudcannon.com/tutorial/2016/01/26/deploy-jekyll-sites-anywhere-with-jekyll-hook/
content_type: Tutorial
tool:
  - tool/jekyll.md
  - tool/jekyll-hook.md
---
jekyll-hook is a Node.js program which runs on a server. It listens for new commits on a GitHub repository using webhooks. When there is a commit, jekyll-hook pulls the latest source code, builds the site with Jekyll, then deploys the built site to a directory.
