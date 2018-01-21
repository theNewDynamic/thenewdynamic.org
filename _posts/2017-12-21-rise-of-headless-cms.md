---
title: The rise of the headless CMS
published: false
date: 2017-12-02 09:45:36 +0100
authors:
  - Frank Taillandier
  - Bud Parr
description: ""
image: /uploads/2017/
permalink: /article/rise-of-the-headless-cms/
---

In JAMstack architectures, every carefully chosen tool has its own purpose, all parts act then beautifuly and automatically together, these decoupled systems are modular by design.

2018 could be the year where headless CMS begin to be massively adopted in JAMstack projects.

## Back to the future

Static site generators started from the will of developers to be able to work with a git-based workflow, and if editing a bunch or Markdown or JSON files is something they are comfortable with, the need to include a more diverse range of collaborators rapidly arise.

Even if services like GitHub allow some visual editing, we began to see tools like prose.io developed for the Healthcare.gov website. And with the growing popularity of GitHub Pages, some startups like CloudCannon, Siteleaf and Forestry.io understood it was time to offer end-users a decent editing interface for that kind of projects.

Those project were the first git-powered headless CMS that allow editing Markdown files and update static websites without having to deal with the CLI, hooray for multi-disciplinarity! It's a game changer as teams could benefit from all the advantages of static sites and keep all the contributors on board. You could think of these as CMS as a service.

But at the same time, other Content as a Service platforms like Contentful or Prismic also emerged. The goal here is not just to provide a user interface to your contributors but to provide powerful content modeling while making your content available to developers and others services through an API.

We saw a whole new bunch of API-powered CMS come up this year and something tells me it's just the beginning as we saw with static site generators, old timers like Jekyll or Nanoc are now challenged by the new kids like Hugo or Gatsby. And in the meantime hundreds of SSG appeared, everyone wants its own flavor.

It's becoming hard to keep our [Headless CMS directory](/tools/content-management/headless-cms/) up to date. And interestingly we begin to see API-based headless CMS like [Storyblok](https://www.storyblok.com/) take a component-based approach like React, Gatsby and al. It never stops.

API is a big part of the JAM, it's the one part responsible to interconnect the different distant services. On the average static website, you generally have at least 3 or 4 services acting together. For example a modern e-commerce website could make use of GitHub, Contentful, Algolia, Snipcart and Netlify.

Each of these service has a specific purpose: version your files, model your content, provide search, handle your checkout and payment, continuously deploy and host your website on a performant CDN.

Let's focus on the role of the headless CMS: decoupled from the front-end, its responsability is to manage, store and export your content.
