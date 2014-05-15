---
layout: page
title: Archive
permalink: /archive/
#include: "snippets/news.html"
sharing: false
published: true
---

<div class="list">
	{% for news in site.posts limit:250 %}
		<h5 class="title">
			<a href="{{ news.url }}">
				{{ news.title }}
			</a>
		<br />
		<small>
			{{ news.date | date: "%B %d, %Y" }}
		</small>
	</h5>
		<hr />
	{% endfor %}
</div>
