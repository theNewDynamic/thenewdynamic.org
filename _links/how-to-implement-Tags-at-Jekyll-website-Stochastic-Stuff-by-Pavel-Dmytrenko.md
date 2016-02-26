---
title: "How to implement Tags at Jekyll website"
source: Pavel Dmytrenko
date: 2016-02-25 22:21
link: http://pavdmyt.com/how-to-implement-tags-at-jekyll-website/
type: Tutorial
tool:
  - jekyll
---
Recently I have finished adding tagging infrastructure into this website. That’s was a bit tricky since Jekyll does not fully support this feature from the box. It is possible to add tags into the post’s YAML front matter and then access them using page varialbes via page.tags. However, there are no built-in means to generate tags page which collects all tags from the posts, sorts them alphabetically and builds a list of the posts assigned to every tag. Let’s take a look at one possible way to implement described functionality.





