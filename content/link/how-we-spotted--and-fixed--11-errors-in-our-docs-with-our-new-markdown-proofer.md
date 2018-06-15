---
title: How we spotted--and fixed--11 errors in our docs with our new markdown proofer
date: 2018-06-15 16:54:13 -0400
source: Ricardo Feliciano, Circle CI
link: https://circleci.com/blog/markdown-proofer/
video: false
content_type: Article
category: ''
related_tools:
- tool/content/tool/markdown-proofer.md
keywords:
- testing

---
Static Site Generators (SSGs) such as [Hugo](http://gohugo.io/) and [Jekyll](https://jekyllrb.com/) are all the rage nowadays. These static on the backend and JavaScript on the frontend websites are called JAMStacks. Typically, we test them in two ways:

* via the SSG successfully building the site
* and [HTMLProofer](https://github.com/gjtorikian/html-proofer)

What if we wanted to do more? Let’s walk through a new tool I made for testing markdown files and how it improved the accuracy of CircleCI docs examples.