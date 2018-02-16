---
title: "Netlify CMS 3rd party OAuth"
source: Václav Klecanda
date: 2017-06-02 23:49:00 +0000
link: http://www.vxk.cz/tips/2017/05/18/netlify-cms/
content_type: Tutorial
tool:
  - tool/netlify-cms.md
---
I wanted to allow users to authenticate with their github accounts, but Netlify did’t have support for 3rd party OAuth providers (learn more here). It allows you to create account in their app, connect your repository with the web and let them to serve it via their fast CDN network. But I didn’t need serving via other service. I just needed to let users edit the webs with knowing nothing about GIT. That is why I wrote netlify-cms-github-oauth-provider.





