---
title: "How I Added Additional Post Types to My GatsbyJS Site"
source: Ben Newton
date: 2018-01-09 12:25
link: https://benenewton.com/how-i-added-additional-post-types-to-my-gatsby-js-site/
type: Tutorial
tool:
  - gatsby
---
First things first, I needed to add the source for my new posts. The starter is already pulling data from markdown files in /content/posts utilizing gatsby-source-filesystem. I thought I could just add another reference to markdown files in a new directory and I’d reference that in a separate GraphQL query and have a separate array of posts to work with, but that is not how it works. 





