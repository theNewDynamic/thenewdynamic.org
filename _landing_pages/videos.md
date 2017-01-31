---
title: Videos
layout: videos
regenerate: true
description: 'This is a list of videos showcasing static site generators.'
---

{% if page.url == '/videos/' %}
  {% assign title = page.title  %}
{% endif %}

<h1>
  {{ title }}
</h1>

<div class="flex flex-wrap justify-around">
  {% include components/videos.html type="youtube" %}
</div>
