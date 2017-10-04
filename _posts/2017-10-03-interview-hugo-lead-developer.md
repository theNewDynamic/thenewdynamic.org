---
title: Interview with Bjørn Erik Pedersen, Hugo lead developer
published: true
date: "2017-10-03 08:45:36 +0200"
category: article
description: "As Hugo is getting more and more popular and fast, we ask a few questions to Bjørn Erik Pedersen, the current lead developer, about the past, present and future of Hugo."
permalink: /article/interview-hugo-lead-developer/
---

By [Frank Taillandier](https://twitter.com/dirtyf)

[Hugo](/tool/hugo/) has become one of the most popular static site generator over the last couple of years. Partly because it's the fastest out there: it only takes 1ms for Hugo to build a page. Yes, that's 1000 pages per second and that's pretty impressive if you ask me. But speed isn't the only reason to adopt Hugo - who is fast reaching the [20K on GitHub](https://github.com/gohugoio/hugo).

Hugo comes also with handy features like partials, shortcodes, i18n, custom outputs (JSON, AMP, epub, Atom, etc.), nested sections and so on… And features and releases keep up coming at a good pace. Since v0.14, [Bjørn Erik Pedersen](https://github.com/bep) has taken the lead on development, we took the opportunity to ask him a few questions about this open source project.

![Bjorn Erik Pedersen](/uploads/2017/hugo-bjorn-erik-pedersen.jpg)

## Hi Bjørn Erik, how did you become involved in Hugo?

I spent one Sunday moving my [blog](http://bepsays.com/en/) from WordPress to Jekyll, and when I was finally done I had this "now what?" feeling. I was hoping the move would push me to write some more blog content, but already that same afternoon I Googled "Jekyll alternative" and found Hugo. Soon I found stuff I wanted to improve on and found Go, the programming language.

I'm a very experienced developer, but my first few lines of Go code was some improvement in how live reloading with CSS, JavaScript and images is handled in Hugo, a code patch that I think has survived all my other later changes and additions. And then I just continued creating pull requests, mostly motivated by learning this great new programming language but also encouraged by [Steve Francia](https://stevefrancia.com/), who created the first versions of Hugo. He is brilliant as an open source project motivator.

## What is Hugo trying to achieve?

Hugo is a great way to create and publish **lots of content** to the web. In the early days of Hugo we received many questions about "how to create a single landing page" type of site. We have gotten pretty good at that, too, but that is not the main use case.

In Gutenberg terms, we are a website generator for documentation, books, magazines, newspapers, blogs… You will notice this in the new features we add as well, like the recent ["Nested Sections"](https://github.com/gohugoio/hugo/releases/tag/v0.22) and ["Related Content"](https://github.com/gohugoio/hugo/releases/tag/v0.27): Get a solid structure for your content and easy ways to find it.

We also care about typography and languages. Hugo is big in China and Japan, and that brings its own set of challenges. It helps to be built with Go. Two of its creators, Ken Thompson and Rob Pike, also created [UTF-8](https://en.wikipedia.org/wiki/UTF-8). I just recently spent a couple of hours adding support for French Guillemets in Hugo. Common in France, of course, but I have never heard of it before.

## What makes Hugo so fast?

I read this a lot: "Hugo is so fast because it is built with Go". And that is a big part of the story, but Hugo doubled its speed in two sequential recent releases, so there are other factors. Hugo has had "fast" in its slogan from day one, so we have to really care about it.

I try to play the zero-sum game when adding new features: The processing time added by the new feature will have to be compensated by improvements in others, and Go plays a vital part in this. It is getting faster and better for every release, but it's not just that it is a fast compiled programming language with a simple concurrency model and a very solid standard library. It also comes with an extremely good toolset built for creating fast applications fast; a fast compiler, built-in benchmark support and a very easy to use profiler.

Performance bottlenecks show up in the most surprising places, so you have to benchmark. Performance gains and losses come from smaller accumulated changes over time. And speed matters. Try Hugo's server with livereload and you will see.

## What are the most visible websites powered by Hugo?

[![Federal Front Door](/uploads/showcase-labs-us-gov-hugo.jpg)](/showcase/labs-us-gov-hugo/)

Some nice sites I know about are [labs.usa.gov](https://labs.usa.gov/), [netlify.com](https://www.netlify.com), [cdnplanet.com](https://www.cdnplanet.com/), [support.balsamiq.com](https://support.balsamiq.com/) [crossref.org](https://www.crossref.org/), [1password.com](https://1password.com/), [borisfx.com](http://borisfx.com/), [Urban Airship documentation](https://docs.urbanairship.com/).

And there are more coming. For one, [Smashing Magazine](https://www.smashingmagazine.com) has announced that they are working on a [redesign built on Hugo](https://next.smashingmagazine.com).

[![Showcase: Samashing Magazine](/uploads/screenshot-smashing-mag-hugo.jpg)](/showcase/smashing-magazine/)

## What's the current status of the project?

We have a more or less automated release process now, so I release every time we have something new that can be formulated into a title in a release note, usually once every 5 weeks or so. And Hugo is used by many. It is hard to measure because it can be installed from so many sources, but I was a little surprised to learn that more than 8000 installed it just from `brew` the last 30 days, and the [gohugo.io](https://gohugo.io/) website gets loads of traffic.

## Hugo is open source. How do you manage it?

I only implement features that I want myself; often I get some extra motivation if it is also a technical challenge. But as Hugo has gained popularity and mistakes have become more expensive, I have started to write short design documents to discuss and refine with the community. Features can sit in the backlog for a long time until a simple and elegant solution pops into my head while trout fishing.

Other than that, with open source maintenance with very few maintainers and many users, we have to be effective. We try to keep a tidy shop, with strict commit message guidelines, and we take no questions and discussions on GitHub. Use the [Hugo Forum](https://discourse.gohugo.io/) for that. And Steve Francia once taught me to be polite, even with the internet trolls. It sounds counter-intuitive, but it actually works.

## How is development currently sponsored?

[Netlify](netlify.com) hosts our sites for free and [Discourse](https://www.discourse.org/) keeps the forum running. [Travis](https://travis-ci.org/), [Appveyor](https://www.appveyor.com/) and [CircleCI](https://circleci.com/) for builds. But other than that, no sponsors. We have briefly talked about it.

## What's next for Hugo?

Hugo 1.0 should be "around the corner". There are a couple of missing items from my mental roadmap, but it should not take too long. The most important and interesting one is probably coming in the next release, work titled ["page bundles"](https://github.com/gohugoio/hugo/issues/3651). And after that, I have a few ideas. I may want to explore if Hugo can be adapted to handle really big sites, like millions of pages, but I suspect that is a task bigger than I can do on my own free time.
