---
title: Interview with Bud Parr, JAMstack engineer, Content Strategist
date: 2017-11-27 08:45:36 +0100
author: Frank Taillandier
description: Bud Parr, founder of TheNewDynamic, shares his vision on the current
  state of the JAMstack ecosystem.
image: https://github.com/budparr.png
permalink: "/article/interview-bud-parr/"

---
Bud is involved in the SSG landscape since quiet a few years now. He runs [his
own agency](https://www.thenewdynamic.com/) and [this website you're currently
reading](https://thenewdynamic.org), which aggregates curated content about the
JAMstack ecosystem. Bud also organizes [JAMstack NYC
meetups](http://www.meetup.com/the-new-dynamic/). and redesigned [Hugo
website](https://gohugo.io/). Bud kindly accepted to answer some questions.

![Bud Parr](https://github.com/budparr.png)

## Hi Bud, you've been an advocate and an observer for what is sometimes still simply referred as static sites. How did the landscape evolve since the early days?

To be honest, I lost a lot of sleep in the early days. This paradigm made so
much sense to me, but there were not many people involved or even aware of the
space. I really feared that if something happened to me, my clients wouldn't
easily find another developer for their project. Also, there were not a ton of
great choices in the ecosystem. The lack of a good editor for non-technical
users was a real problem. I even taught some clients how to use Markdown and
Github at one point, but that was clearly not ideal. Now we've seen real
progress; some of the [editors](/tools/content-management/) are as good or
better than anything you'd find in a traditional CMS.
Over the past year, we have seen several headless CMS vendors pop-up,
so whether your approach is Git-based, or API-powered, there are viable options.

Significantly, we've seen the emergence of Amazon's "Serverless," Google's
"Cloud Functions" and services built around the concept of microservices. This
gives us easy access to functionality that in the past we'd need a dedicated
back-end to handle, like form handling, authentication, real-time databases, and
more.

## In 2015 at Jekyllconf, Tom Preston-Werner said that [80% of the web should be static](https://www.youtube.com/watch?v=BMve1OCKj6M&t=39m55s), are we there yet ?

Peter Levine at Andreessen Horowitz reflected this sentiment too, when he
[wrote](https://a16z.com/2017/08/09/netlify/) <q>There are over 300M websites
deployed every year; most of those sites and webapps could be on Netlify</q>.
By Netlify, he means static, or [JAMstack](https://jamstack.org/). However,
we're not even close to those sorts of numbers yet, I don't think.

If you think of the web in three broad categories: The engineering-driven web,
the user-manipulated web (e.g. Wordpress themes), and the entirely abstracted
web (e.g. Squarespace). I'm not so sure there are incentives for the latter two
groups to adopt any of these technologies, and that's a big part of the web.
That first space, the engineered web, will largely be either web apps or static
sites. The lines will be blurred between the two and the tools we use to get
there will likely change a fair amount over the next couple of years.

## Public administrations in the US ([18F](https://18f.gsa.gov/)), in UK ([Alphagov](https://github.com/alphagov)) or in France ([Etalab](https://www.etalab.gouv.fr)) seem to embrace this workflow. Why is this so interesting for public and open source websites ?

These groups have large audiences with a low tolerance for latency, downtime and
errors, so it's a natural that they'd want the benefits of static. Also, many of
these teams working in the space are distributed, as well as fractured among
many agencies, so here a git-based—i.e. version-control—workflow makes a lot of
sense. That's great for all of us, because technology adoption is helped by
credible users in the space.

## We see also more and more tech companies, open-source projects adopt this workflow by default for publishing content. What are in your opinion the most visible that should help people think twice before rushing to their good old CMS?

The team that built the [last Obama campaign
website](http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/)
(in Ruby-based Jekyll) also built [Hillary Clinton's campaign
site](https://web.archive.org/web/20160701080059/https://www.hillaryclinton.com/)
(in Node.js-based Assemble). Those were sophisticated websites. We have a
[showcase of sites](/showcase/) at The New Dynamic showing off some great work.
I think the takeaway from the showcase, and a point that I've been trying to
make for years, is that the use-case for static is not just "blogs for hackers"
but documentation, landing pages, and even really sophisticated websites.
[Smashing Magazine](https://www.smashingmagazine.com/) is the latest great
example. A site with a deep archives and advanced functionality, like e-commerce
and, now, membership, it's really a banner site.

## Why aren't more agencies working with these modern workflows?

That's difficult for me to say, since I made a decision to *only* work this way.
I imagine awareness is still relatively low. I often see comments about how
JAMstack is only for simple brochure sites, or "blogs for hackers," so that's
likely the pervasive point-of-view. Name brand CMS systems are a safe choice,
even if not necessarily the right choice. When a client says "I want Wordpress,"
what I hear is "I want an web-based editor that people in my organization can
use without the help of a developer." I think many people take that statement
literally though.

## While this modern workflow feels natural for web developers, end-users often rely on a powerful UI, are both compatible?

Absolutely. There are two approaches in the space. One is Git-based, where much
of your content is in documents stored in a Git repo, and API-based, where you
generate content as an API that can be consumed in your front-end. We're seeing
really capable web-based editors for Git-based sites, like
[Forestry.io](https://forestry.io/), [Siteleaf](https://siteleaf.com),
[Cloudcannon](https://cloudcannon.com), and [Netlify
CMS](http://netlifycms.org/). Up until recently there were only two or three
players in the API-driven space, now we list 20 in our [headless-CMS
database](/tools/content-management/headless-cms/). So, we're seeing a variety
of approaches and plenty of competition here, and that's great!

## What is _your_ current workflow? What do you enjoy about it?

I currently use a mix of tools and services that I find works for a wide variety
of projects: [Hugo](https://gohugo.io) for site-building,
[Webpack](https://webpack.js.org/) for my asset pipeline,
[Netlify](https://netlify.com) for deployment and hosting,
[Forestry](https://forestry.io/) for client editing, and the [Tachyons
CSS](http://tachyons.io/) library to round out a pretty efficient workflow.

I find this workflow extremely efficient. Hugo can handle most any sort of
complexity or size of site, Netlify allows me to stage changes in a matter of
seconds, and Forestry allows me to turn editing over to clients. In short, this
set of technologies strips away the inefficiencies from my work, allowing me to
focus on my clients and their needs.

That said, I enjoy exploring new tools as they come about and a benefit to my
business as a web design and development shop is that I can adopt new tools as
they prove themselves to be viable.

For example, I built [www.retroreport.org](https://www.retroreport.org/) with
Hugo and I made great use of [Hugo's built-in custom output types](https://gohugo.io/templates/output-formats/) to generate
alternate views of content in JSON files for the video player. JAMstack is a
natural here, because the site gets traffic spikes when one of its videos gets
shared around the web and it's nice to know we won't have to deal with any
latency under these times of random load spikes.

[![retroreport.org](/uploads/retroreportorg.jpg)](https://www.retroreport.org)

## How do you sell SSG to your clients?

I don't. My clients hire me to make these decisions for them. When I do talk
about it, I emphasize the performance benefits, which alone makes the argument,
but also that static sites bring near 100% up-time and drastically reduces the
potential for getting hacked. What I don't talk about so much, but they benefit
from, is our ability to easily stage changes for their review.

## What would you like to see in the near future for this modern Web stack?

I think the decoupled nature of the JAMstack tech stack can be confusing for
people new to the space, and there aren't dominant players that bring about a
"way of being," like, say, an Angular in the SPA space. I think Netlify has done
a great job of mainstreaming these concepts by coining and promoting the idea of
the JAMstack, but from what I see, people still don't quite know where to start
or what the best tools for their use-case might be. So, I'd like to see things
become more mainstream, though I'm not sure exactly what that would, or should,
look like. The mission of The New Dynamic is to help with that, but we still
have a ways to go.
