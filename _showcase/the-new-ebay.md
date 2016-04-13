---
title: "The New Ebay, website introducing new Ebay apps"
date: 2016-04-12T00:00:00.000Z
tool:
 - middleman
 - contentful
website: http://anywhere.ebay.com/mobile/
creator:
  - role: Design, Development
  - link: http://www.instrument.com/latest/the-new-ebay-creating-excitement-through-code
  - name: Instrument
image_path: /uploads/showcase-ebay.jpg
---

### Build Architecture

The site was developed in Ruby, using Middleman as our static site generator, and pulling content from Contentful. Contentful allowed us to create custom content types as well as specify fields that needed to be localized. Rake tasks were used to pull down all of the Contentful data and assets that were then organized into YAML files for each locale. With one localizable template and some logic, 24 independent static pages were created with the correct data based on the locales we had configured.

Read the rest at [Instrument](http://www.instrument.com/latest/the-new-ebay-creating-excitement-through-code)
