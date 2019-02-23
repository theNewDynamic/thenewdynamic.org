---
title: Build a JSON API With Hugo's Custom Output Formats
date: 2018-04-13 17:32:44 +0000
source: Régis Philibert, Forestry
link: https://forestry.io/blog/build-a-json-api-with-hugo/
content_type: Tutorial
related_tools:
- tool/hugo.md
video: false
category: ''

---
In order to make data that is “machine friendly” like this, we can expose it with a [**RESTful API**](https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming). Normally, the quickest way to bootstrap an API like this would be to start with a popular framework like Flask or Ruby on Rails, spin up a webserver, and connect a database. We can achieve something even simpler, however, by creating a read-only API with a static site generator. In this article, we’ll use [**Hugo**](https://gohugo.io/) to build a JSON API using its [**Custom**](https://gohugo.io/templates/output-formats#output-formats) [**Output Formats**](https://gohugo.io/templates/output-formats#output-formats) feature.