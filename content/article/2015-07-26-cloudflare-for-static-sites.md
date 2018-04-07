---
title: Cloudflare for Static Sites
date: 2015-07-26 02:44:00 +0000
category: article
posted_date: 2015-07-26 02:44:00 +0000
slug: cloudflare-for-static-sites
source: ''
excerpt: I've found Cloudflare to be quite useful for static sites.
tool:
- CloudFlare

---
I've found [Cloudflare](https://www.cloudflare.com/) to be quite useful for all the sites I manage, including static sites. Aside from their great service, I like keeping DNS information for the sites I manage in one place. When you change DNS settings at Cloudflare, the changes happen very quickly.

I'm not entirely sure static sites' performance benefit from Cloudflare's network, particulalry if you're already serving your assets from a CDN, but they offer an incredible number of features for performance, threat control, stats, caching and asset minification, and I think overall Cloudflare is particularly helpful for managing static sites.

I've sometimes missed not having an htaccess file for setting up rules on sites I'm serving from Google Cloud, AWS, or Github Pages, but Cloudflare fills that gap. You can set rules (unfortunately only three for free accounts) for forwarding pages, and their "scrapesheild" service allows you to obfuscate email address, offers hotlink protection and server side excludes.

One feature I'm looking forward to trying is their SSL service, which, at a very basic level, is offered for free. I've been using Cloudflare for quite a few years now and manage quite a few sites through them. The services they provide have grown significantly and their recent redesign has really helped make everything easy to use.

p.s. If you use Cloudflare, be sure to enable Two-factor authentication in your account.
