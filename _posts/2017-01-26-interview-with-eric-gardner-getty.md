---
title: Interview with Eric Gardner, of Getty Publications
published: true
date: 2017-01-26 11:30:00
category: Interview
meetup:
start_at:
venue:
address:
link:
description:
---
Following the publication of [the digital publishing workflow based on Git and Middleman of a publisher](http://blogs.getty.edu/iris/an-editors-view-of-digital-publishing/), [Antoine Fauchié](https://www.quaternum.net) asked a few questions to [Eric Gardner](http://egardner.github.io/), developer and designer in the [Digital Publishing team](http://www.getty.edu/publications/digital/index.html) at Getty Publications.

## How and why do you choose a static site generator as the backbone of the publishing workflow for Getty Publications? And not another native development?

When I first started working at the Getty, the digital publishing program was very new. There had been some prior experiments using a more traditional CMS-based approach as well as a mobile app developed by a third-party vendor, but after a few years these projects were already becoming difficult to maintain.

I wanted to explore a static workflow for a couple of reasons. First, I wanted to make sure that our work would remain accessible for as long as possible. Technology changes fast, but academic publishing is a slow process – especially in fields like classics and art history, where research can unfold over decades.No one would want to publish with us if they were afraid their work would disappear in 2 years. Complex software like a CMS or a mobile app needs constant maintenance to remain viable; you can’t continue publishing new books if the maintenance burden grows with every new project. The output of a static-site generator is exactly that – static – so the hope is the final product will continue working for a long time. And even if not, the underlying content will live as human-readable text files in a Git repository forever.

A second concern was vendor lock-in. Companies like Adobe and Apple have created some pretty slick tools, but who really owns your content at the end of the day? If a product stops being supported, there is very little you can do as a publisher – your work will be lost. An open-source platform seemed like the only way to ensure that our authors and editors remained in control of their material.

Finally, as someone with a design background, I care a lot about the design and experience we deliver to our users. The printed books that the Getty publishes are really beautiful, and I want to hang on to as much of that tradition as I can on the web. Fortunately, a “static” site doesn’t need to be a boring one – static HTML, CSS, and JS applications can deliver all kinds of interactive features as well as a high-quality design, typography, etc.

## How did your team apprehend this new workflow? Was the appropriation easy?

It’s true that publishing this way means that some things are very different. Fortunately I have great colleagues who were willing to learn the new process. Our digital team has done a few “GitHub 101” trainings that have been well received, and writing in Markdown is not so different from writing in any other word processor. I’m still hoping we can make the process more painless though – setting up a development environment to be able to preview things locally can still be pretty daunting, for example. I'm interested in developing tools to help make this process easier for people.  

## Do you think that a web-based workflow could replace the demonic couple Word + InDesign? And especially with the same facility for the writing and the structuration (WYSIWYG), and the same efficiency for the formatting (InDesign)?

I think we’re getting close (and I shudder to think about trying to get clean text out of a set of InDesign book files…). But our tools still have a way to go; I [wrote about this](http://blogs.getty.edu/iris/digital-publishing-needs-new-tools/) on the Getty blog a while back. People use Word and InDesign because they are intuitive and well-thought-out; our workflow is still a lot rougher in comparison. The plain text world has a lot of really powerful tools of its own, however: real version control (way better than Track Changes), amazingly powerful editors like Emacs or Vim, the ability to specify exactly what you mean with a simple markup language like Markdown or Asciidoc, etc. I think that full WYSIWYG parity with Word and InDesign is no longer the best goal to have here. Instead, tools that are intuitive and reliable but focus on helping people express _meaning_ in a way that is not tightly-coupled with any single mode of presentation is the way forward.

## Does this new workflow increase the quality of Getty Publications work?

Haha, I feel like the bar is already set pretty high so I just want to produce work that is of the same quality as our print books. But digital publishing can allow you to do things that simply would not be possible in print, and it is my hope that some of these new affordances of the medium will help to advance scholarship in unique ways. We're currently working on a digital book that features a lot of musical notation, for example, and being able to have annotation, discussion, and audio/visual playback all in the same place is very exciting.

## Is this new workflow saving time and money? Is there a difference for the cost of books, including printed books?

This probably varies among publishers, but in general I'd say no. Quality publishing requires a lot of specialized human labor, and digital format won't change that. However, it does allow us to make things available that might not otherwise be viable to publish. Since I started at the Getty we've worked on several catalogues for collections of artworks. These are primarily research tools for a pretty specialized audience. They are very expensive to print and don't generally sell well. By releasing a catalogue as an online-first, multi-format publication, we can still make the information (including high-quality interactive images) available for scholars. And the ability to generate a PDF from the web version means that people who still want a print copy can purchase one, through our print-on-demand vendor. So in situations like this I think digital publishing can help to make some projects more cost-effective.

## What are the constraints you still encounter today? What would be your ideal workflow?

Earlier I mentioned that setting up a development environment and working with some more hard-core programming tools (like Git) can be pretty frustrating & confusing for non-programmers, and that the tools could be improved. I'd love a simple GUI app that facilitated writing in Markdown, working in Git, and doing some basic tasks with book templates, without forcing the end-user to worry about managing dependencies or installing libraries.

## Do you think that other publishers will follow this static site generator strategy (no WYSIWYG, light markup, no databases, YAML metadata, Git for the versioning, etc.)? Could a network be born around this concept?

There has certainly been some interest from colleagues at other museums. So far I don't think anyone else has published a book using this process but hopefully that will change soon. Once we refine our process a bit more I plan to do a bit more "evangelizing" ;-)

*This interview was originaly published on [Jamstatic.fr](https://jamstatic.fr/), the french community of static site generators' users : [Publier des livres avec un générateur de site statique](https://jamstatic.fr/2017/01/23/produire-des-livres-avec-le-statique/).*
