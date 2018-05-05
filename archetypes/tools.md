---
title: {{ $term := index ( split .File.Dir "/") 1 }}"{{ replace $term "-" " " | title }}"
description: "This is the description for {{ $term | title }}"
date: {{ .Date }}
draft: false
color:

#NOTE: create with `$ hugo new <taxonomy>/<term>/_index.md`
---
