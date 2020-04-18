---
title: s3deploy
repo: bep/s3deploy
date: 2018-03-06T16:38:02.000+00:00
description: A simple tool to deploy static websites to Amazon S3 with Gzip and custom
  headers support (e.g. "Cache-Control").
tools:
- "Hosting-Deployment"
license: Open Source
urls:
  website: ''
  github: https://github.com/bep/s3deploy
  twitter: ''
  other: ''

language: ''
related_tools: []
tags: []
resources: []
cat_test: tools/content-management/headless-cms/git-based.md

---
Note that `s3deploy` is a perfect tool to use with a continuous integration tool such as [CircleCI](https://circleci.com/). See [this static site](https://github.com/bep/bego.io) for a simple example of automated depoloyment of a Hugo site to Amazon S3 via `s3deploy`