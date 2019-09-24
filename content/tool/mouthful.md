---
title: Mouthful
date: 2018-04-23T12:58:01.000+00:00
description: Self-hosted alternative to Disqus
tools:
- Interaction
license: Open Source
language: Go
related_tools: []
tags:
- comments
urls:
  website: https://mouthful.dizzy.zone/
  github: https://github.com/vkuznecovas/mouthful
  twitter: ''
  other: ''
resources: []
cat_test: ''
weight: 
interactions:
- comments/discussion
data_model: ''

---
Mouthful is a small but powerful commenting engine. Intended to be used as a self hosted alternative to disqus. It’s ad free. It supports markdown. It uses sqlite as the main database engine with dynamodb, mysql and postgres support. Written in GO and preact it comes with moderation support as well as an admin panel. The client is lightweight(\~14KB gzipped).