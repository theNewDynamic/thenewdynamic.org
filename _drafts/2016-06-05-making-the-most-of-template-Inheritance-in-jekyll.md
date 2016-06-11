---
title: Making the Most of Jekyll Layouts for Complex Content
published: true
category: article
description: Strategies for keeping Jekyll templates maintainable with complex content.
---

Jekyll uses a simple template layout model that, while lacking features of some templating engines, can be quite helpful in keeping our templates reusable and neat. _For an overview of how layouts work in Jekyll, check out  this video on Cloudcannon's Jekyll tips site: [http://jekyll.tips/jekyll-casts/layouts/], but here I'll go through some tactics I use for more complex sets of content._


Most of us typically use a [default layout](http://ben.balter.com/jekyll-style-guide/layouts-and-includes/#the-sites-primary-layout) for our primary page structure, which should include our document skeleton, head, and any global elements for our site's pages, like a footer or navigation ([_here's what one of mine might look like._](https://gist.github.com/budparr/81c4f8ffb5e3c9147b7916706341912b#file-default-html))


From there it is common to use other layouts, one for pages, and another for posts. That's fine, but for more complicated sites we may have more than one type of page or post, and we want to make sure we don't repeat elements in those layouts, if we can help it. 

First, the Jekyll default page/post nomenclature doesn't fit my mental model in that it's not quite specific enough. While I might indeed have a page layout, I also think of two of two basic layout types: 

- **listing** views, which are pages that tend to combine some page content and list aggregates of collection items, and two,
- **individual** layout views to display one item from a collection.

For a recent project I built out listing pages for blog posts as well as the organization's multi-media reports and video, which were then broken down into categories and two different collections. All total, quite a few pages sharing similar attributes, but varying logic on each to pull in the appropriate content.

Aside: When developing our content model, it's helpful to create consistent field names in front matter across collections, like "title," "description," "featured_image_path." The more consistency we have the more we can reuse in our code.

There are a few ways to handle this content and be sparing with our templates. Our goal is to minimize complexity and processing overhead to keep our builds fast, and code maintainable.

One, if most of our content is the same, but we need some extra logic for various pages, we could use one template and add the extra logic with an "include" tag. Jekyll's [Include tag](https://jekyllrb.com/docs/templates/#tags) can take an embedded variable or even parameters in the tag, allowing us to call the include dynamically, and manipulate its content from within the layout.

// insert graphic of md file calling an include, and layout displaying it. Use a "limit" (or something) to show a variable.

However, for the this use-case, I needed to allow for a bit more variability on each page than I felt the Include tag affords, yet still keep things as simple as possible.

So, I set up a base template for listing pages that included the basic structure they needed, yet leaving out the logic to call specific content. This structure included a wider content area than article pages, and room for a contextual menu in a sidebar. 

Here's what that looks like: note the`  {% raw %}{{ content }} {% endraw %}` tag in the middle. Just like in our default template, this tag is going to pull in either content from the page, or, if another template references it, the whole of that template. And that's what we're going to do. 

// insert graphic showing main listing page layout.

In the various forms of content I outlined above, the variable parts are 1) determining what content to get 2) how each item called is displayed (for instance, the blog posts include text descriptions below the image and a date, whereas the media does not, and 3) some may have a different contextual navigation sidebar.

I know that I need a template for my blog posts. I'll call it landing-posts.html and in that *template* I'll only include the logic for the posts and the contextual navigation(categories). Remember that we're only filling in where.

Likewise, for video and other media I'll create a template with their logic for the main content and acorn textual menu. These two content types are similar, do I can get away with just one template for both, which I'll call listing-media.html.

To be sure, there may very well be other ways to accomplish this, but with the goal of keeping things simple and fast, 






Documentation: 














