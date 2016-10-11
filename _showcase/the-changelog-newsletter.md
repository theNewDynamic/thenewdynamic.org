---
title: "The Changelog Newsletter"
date: 2015-08-30T14:57:00.000Z
posted_date: 2015-08-30T14:57:00.000Z
type: showcase
slug: the-changelog-newsletter
website: https://changelog.com/weekly/
image_path: /uploads/1440946470090_changelog.jpg
tool:
  - middleman
creator:
  - role: "Developer"
  - link: https://changelog.com/
  - name: Adam Stacoviak — Founder & Editor-in-chief, The Changelog
---
Via the [Trello API](https://trello.com/docs/). We have a sub-200 LOC Ruby script that connects to the board (using the [Ruby Trello](https://github.com/jeremytregunna/ruby-trello) gem), loops over the lists, and outputs ERB (Ruby-embedded HTML) according to the rules laid out above. [Middleman](https://middlemanapp.com/) consumes that output and produces HTML that is shipped off to [Campaign Monitor](https://www.campaignmonitor.com/) for delivery. More at ["Trello as a CMS"](https://changelog.com/trello-as-a-cms/)

