---
title: Next.js
date: 2018-03-24 08:52:50 +0000
tools:
- Static Site Generator
license: Open Source
related_tools:
- tool/zeit.md
- tool/nuxtjs.md
urls:
  website: https://nextjs.org/
  github: https://github.com/zeit/next.js
  twitter: ''
  other: ''
resources:
- name: Introductory Blog Post
  url: https://zeit.co/blog/next5
- name: Next Serverless
  url: https://github.com/cyrilwanner/next-serverless
description: Next.js is a minimalistic framework for server-rendered React applications
data_model: ''
language: React
tags:
- SSR
cat_test: ''
weight: 30

---
Next.js is a minimalistic framework for server-rendered React applications, which supports exporting as a standalone static app without any Node.js server. The export app supports almost every feature of Next.js including dynamic urls, prefetching, preloading and dynamic imports.

> **Why Next.js?**
>
> There are a few big reasons. First, since we have this global shared component system built with React, it makes sense for us to use an architecture that is based on Javascript and integrates well with React. We have a lot of sites with a lot of pages, so in order to keep performance strong, we prefer a server-rendered architecture with code splitting, which is exactly what Next gives us.
>
> On top of that, you can generate a static site or run your own node server with exactly the same codebase. This feature is killer: it gives us the flexibility to start simple, and not worry about massive refactors or technology changes as projects begin and mature, also allowing us to maintain different services using the same foundation.
>
> For example, our docs pages are likely to stay static for a while, but other sites we work on like our learning and community portals will have user logins from the get-go and be better fit as dynamic sites. With Next, we can use the same architecture for both of these types of sites, which makes our developers much more productive.

[Jeff Escalante, in an interview on the DatoCMS blog.](https://www.datocms.com/blog/how-hashicorp-gets-the-best-out-of-datocms/)