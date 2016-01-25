---
title: The Next Iteration of The New Dynamic
date: 2016-01-25T19:09:00.000Z
category: article
description: "Jekyll, Netlify, CloudCannon, job board coming soon"
---
Always a work in progress, I've switched the site back to Jekyll. [Jekyll 3.1](http://jekyllrb.com/news/2016/01/24/jekyll-3-1-0-released/) is a fast (**significantly** faster than 2.4) and capable beast, but as always, has its nuances, so I feel I need to spend some quality tinkering time with it.

I had intended to host the site on S3 as I had originally done, provisioning my own ["Let's Encrypt"](https://letsencrypt.org/) TSL certificate, but when it came down to it, [Netlify](https://www.netlify.com/) is so fast and easy, not to mention their instant provisioning of "Let's Encrypt," that I couldn't resist. And, the Netflify gang is an important part of the nascent static community, such as it is, so hosting there seems quite natural.

As I've building up my collections on the site, I've set up defaults for managing the site's content in [CloudCannon's](http://cloudcannon.com/) editor, which is beautiful and capable. I use it for my clients, so, even though I do most of my work locally, I like having the ability to do so. Defaults are pretty easy to set up and have the added benefit of forcing you to standardize your fields a bit.

I've also started using [Imgix](https://www.imgix.com/) for provisioning images. It's super nice being able to manipulate images on the fly and their CDN is fast and it's quite easy to get up and running. Stay tuned for a post soon about getting up and running.


### Changes

#### Job Board

You may notice a menu item for "Job Board." I don't know exactly  what this will look like in the end, but I know there are people out there who want their sites built static and poking around Github to find them (and this has happened to me). **If you build static sites for clients of any sort and want to be listed, drop me a line (I'll add a form soon) with your name, Twitter and or Github handle, which tools you use, or speciality, and location.**

---

#### Color Scheme and Layout Changes.

Okay, so the red was feeling a bit strong. I may go back to it. I chose it in the first place because it's a sports car color; i.e. fast, but not sure anyone cares about that but me. The layout is evolving a bit. It's always a challenge organizing a lot of connected information and plan for the extremes (like, we have over a hundred [Jekyll](/tool/jekyll/) articles alone, whereas with some tools we only have a handful).

---

#### links

Links are getting unweildy, so stay tuned for a better way to manage those. For now I've dumped them on their own page, organized by tool (which means there could be some duplication, too).

---

I think that's it. This site always feels to me half-done, but at the same time tinkering seems inevitable; so I hope you'll forgive the little non-working things, as I focus on some of the bigger picture things, like adding more original content.

If you are particularly involved with a static site generator and want to make sure our links here are up-to-date for that tool, please do submit.