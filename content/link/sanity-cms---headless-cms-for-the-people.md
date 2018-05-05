---
title: Sanity CMS - headless CMS for the people
date: 2018-02-05 19:46:28 -0500
link: http://blog.novanet.no/sanity-cms-headless-cms-for-the-masses/
source: Ingve Vikan Sund
content_type: Tutorial
related_tools:
- tool/sanity.md
video: false
category: ''
keywords: []

---
A headless CMS is free of the presentation layer, and focuses entirely on the content. It does not ship with any frontend template structure or middleware for hijacking the pipeline.

By choosing a headless CMS you can more freely choose which technology you wish to build your application with, since all communication is done via an API. Its also more convenient to use the same data foundation for multiple clients this way. It can be viewed more as a service or a repository on which you query to retrieve data.

In this example, we'll look into Sanity CMS, and use a ASP.NET core web app as the client. We'll also make use of a .NET core Sanity client implementation by Olav (which can be found here https://github.com/onybo/sanity-client).