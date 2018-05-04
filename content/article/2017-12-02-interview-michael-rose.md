---
title: Interview with Michael Rose, designer and front-end developer
date: 2017-12-02 09:45:36 +0100
author: Frank Taillandier
description: Michael Rose, one of the most active webdesigner in the Jekyll community,
  shares his vision on static site generators.
images: 
  - "/uploads/articles/michael-rose.jpg"
permalink: "/article/interview-michael-rose/"
related_tools:
- tool/jekyll.md
- tool/jekyll-themes.md
link: ''

---
Michael Rose one of the most active webdesigner in the Jekyll community. He is
the author of several themes: [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/), [Basically Basic](https://mmistakes.github.io/jekyll-theme-basically-basic/) or
[Hpster](https://mmistakes.github.io/hpstr-jekyll-theme/).
Michael shares his experience and designer's point of view about working with
static site generators like Jekyll, Gatsby or Hugo. No silver bullet, and still
plenty of room for improvement if you ask him.


## Hi Michael, how would you introduce yourself?

I suppose the simplest answer would be as a designer slash front-end developer.
I started my career as a traditional print designer and gradually moved into web
design and development, something I've been doing for the last 17 years or so.

When I'm not sitting in front of a computer I enjoy some light gaming on Xbox
One and the Nintendo Switch. Digitally drawing and painting on iPad. And
spending time with my wife and twin girls.

## How did you come to adopt Jekyll as a publishing platform?

Jekyll's use of [Liquid](https://shopify.github.io/liquid/) for building templates is what pulled me in. At the time I was building websites and blogs using Wordpress and had a hard time understanding what was going on "in the loop".

For me Liquid is clear and easy to understand. Taking a set of HTML documents
and peppering them with tags and if/then conditions just clicked.

Of course all the benefits of "going static" were nice too, but ultimately it
was the layout creation process. Which I suppose that's what pushed me into
building open-source themes for the community.

## What kind of websites are you working on?

For my day job I work on mostly e-commerce based sites as a frontend designer
and content administrator. In support of these sites I often use Jekyll to aide
in prototyping new content blocks and layouts before integrating them into
OpenText, an enterprise level CMS we use to power 30+ websites.

Away from work I work on a few content heavy blogs built with Wordpress, my
personal site built with Jekyll, and maintain several popular Jekyll themes.

## What do you like about the SSG workflow?

There are three things I like about working with SSGs.

1. Their simplicity. Flat files easily viewed, edited, and generated into HTML. There's no magic to process, you build the workflow _you_ want.
2. Their interoperability. Most SSGs use Markdown files as the content "database", which makes migrating to other generators slightly easier.
3. Their speed. The fact they don't rely on a database connection means webpages can be optimized and cached for enhanced speed. Something that isn't as easy to pull off for dynamic websites backed by Wordpress and friends.

## What is your most favorite feature in Jekyll?

Its use of [Liquid](https://shopify.github.io/liquid/). I've tried a few other
SSGs and Jekyll has been by far the easiest the learn and build with.

## What feature do you miss the most?

As a static site generator Jekyll really isn't meant to manage your assets. But
that is the one thing I miss the most when working on non-Wordpress sites.

The asset manager built into Wordpress is great and something I miss anytime I
work on image heavy posts in Jekyll. Sure there is tooling and workflows that
can help the process but its not the same as a native tool that allows you to
batch upload, edit, resize, and generate responsive image markup for you.

The core experience between SSGs seems about the same apart from the languages
they're developed in. Up until a few years ago I would have said the lack of a
GUI for editing/managing posts and pages was a biggie coming from
Wordpress-land. But with services like [Forestry.io](https://forestry.io),
[Cloudcannon](https://cloudcannon.com), and even `jekyll-admin` project that
void has been mostly filled.

I also looked Cloudinary and friends. They're not free... well not in a plan
that would cover my needs, and well Wordpress is all free so it's hard to argue
with that ;-)

I'm trying more and more to avoid polluting my Markdown files with custom tags.
I have this dream of having a pure Markdown only file that is portable, works
anywhere Markdown is supported, and can be previewed (images and all) easily

I've been taking a hard look at [Gatsby](https://www.gatsbyjs.org/) which is a
SSG that leverages modern tooling to do a lot of this and much more. It can
automatically convert image links written out in Markdown, resize, optimize, and
spit out the relevant responsive image markup with `srcset` with its
[gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/)
and [gatsby-images](https://www.gatsbyjs.org/packages/gatsby-image/) plugins
fairly quickly using [sharp](https://github.com/lovell/sharp).

 I haven't tried [version 3 of
 `jekyll-assets`](https://envygeeks.io/2017/11/21/jekyll-assets-3-released) but
 Ruby based plugins in Jekyll that do similar things via custom tags are pretty
 slow, likely due to Imagemagick or whatever libraries are available.

## Why is there so few Jekyll quality themes?

Up until recently 3rd party themes weren't available for use on GitHub Pages.
Those who knew Git and were comfortable forking a repo had some options for quality
themes. But I think the majority of users just want to leverage GitHub Pages for
a "free" site where they could blog on.

Now with [remote themes being supported on GitHub
Pages](https://github.com/blog/2464-use-any-theme-with-github-pages) perhaps
that will kickoff more quality themes. Especially since they can be installed
and updated painlessly now.

The other thing potentially holding back developers may be a lack of
standardization. For example Wordpress has a set of standards and nomenclature
for [theme development](https://codex.wordpress.org/Theme_Development). Right
now Jekyll themes are all over the place, with each developer doing things their
own way. Coming together on best practices for naming `_layouts`, what
configurations belong in a `_config.yml` file, and i8ln support in Jekyll core,
would help I think.

With my newer themes I've tried to mirror what [Jekyll's Minima
theme](https://github.com/jekyll/minima) has done. Since I'm guessing that's
where most people start with, keeping the layout names and configs similar has
worked out pretty good.

There's always going to be some deviation as themes add features and such, but
some sort of commonality would benefit us all. It's hard to argue with how
Wordpress does it. You can install any theme and get a new look without much
work.

## Why aren't there more webdesigners working with Static Site Generators?

I'm not entirely sure. I don't think its from the lack of awareness because it
seems like every other day I come across a blog post or article about using
SSGs. But that could just be the circle I'm in ;-)

Its possible many think they are just for building small personal sites. With
all of the services popping up like Netlify and high-profile launch of Smashing
Magazine on Hugo, I don't think that's the case. So maybe its just continuing to
get the word out that SSG are a powerful set of tools that can scale.

## The [hpster theme](https://dldx.github.io/hpstr-hugo-theme/) was ported to Hugo, have you looked into it?

Yes I have. When it was ported, Hugo was just starting out. Since then Hugo has
really grown in the SSG community and something I've been wanting to look into
more. The speed it can generate files is something I'd like to see Jekyll learn
from. As I have a rather large personal site with thousands of Markdown files…
my Jekyll builds take a few minutes. Where on Hugo I gather it would be a few
seconds.

The one thing holding me back from really digging into Hugo is its templating
language. Maybe its just me but it doesn't read as well as Liquid templates, and
I have a hard time understanding what is going on with the code.
