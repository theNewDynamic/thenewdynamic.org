---
title: Passing post variables to includes in Jekyll
source: Sverrir Sigmundarson
date: 2016-10-01 18:18:00 +0000
link: https://blog.sverrirs.com/2016/10/jekyll-passing-post-variables-to-includes.html
content_type: Tutorial
tool:
- tool/jekyll.md

---
By default Jekyll include documents loaded by your layout files do not have access to variables defined in the YAML header in your posts or pages. This can pose a bit of a problem if you want some parts of your site to have access to your post data (e.g. such as its title).
