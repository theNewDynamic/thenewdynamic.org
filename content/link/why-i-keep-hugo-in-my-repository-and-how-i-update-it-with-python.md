---
title: Why I keep Hugo in my Repository and How I Update it with Python
date: 2018-08-01 15:29:32 -0400
source: Bryan Klien
link: https://www.bryanklein.com/blog/hugo-update-script-and-binaries-in-repository/
video: false
content_type: Tutorial
category: ''
related_tools:
- tool/hugo.md
keywords: []

---
For one of my projects I have a few different site developers and content authors. I really wanted to simplify the process of adding a new member to the team and get them up to speed quickly.

Fortunately, the Static Site Generator “Hugo” uses compiled binaries and does not require anything setup on the system to run. Having said that, setting up a couple of external tools (NPM and Python) can make running and updating Hugo on any OS a breeze for anyone on the team.