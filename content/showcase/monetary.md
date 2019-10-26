---
title: Monetary
date: 2019-10-26T08:31:18-04:00
related_tools:
- tool/netlify.md
- tool/netlify-cms.md
- tool/jekyll.md
website: https://monetery.com/
repo: ''
creator: []
image_path: "/uploads/showcase/"
images:
- "/uploads/showcase-monetary-jekyll-netlify-cms.jpg"

---
One of the most interesting solutions we tried came from a company called [Netlify](https://www.netlify.com/), and their project [Netlify CMS](https://www.netlifycms.org/).

We thought Netlify CMS might benefit us for the following reasons:

* It’s built for use with Static Site Generators so we get to keep the speed, security and scalability benefits that drew us to SSGs in the first place
* It’s SSG agnostic, so it would work with our existing [Jekyll](https://jekyllrb.com/) site but not prevent us from changing our mind down the road (hi there, [GatsbyJS](https://www.gatsbyjs.org/)!)
* There is no database backend since content changes are stored as Git commits – which makes [InfoSec](https://www.dwolla.com/security/) folks happy!
* It provides a simple and usable editor experience
* It’s open source, so there is no vendor lock-in, and we can contribute features that are important to us back to the community

With buy-in from our stakeholders, we decided to move forward. We’ll talk about the decisions we had to make and show you how to integrate Netlify CMS with Jekyll on your own site.

Read more at the [Dwolla Engineering Blog](https://www.dwolla.com/updates/implementing-netlify-cms/)