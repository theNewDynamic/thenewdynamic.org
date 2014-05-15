---
title: 'Edge Case: Nested And Mixed Lists'
published: true
layout: page
series: series1
series: series1
tags: ['content-2', 'css', 'edge-case', 'lists-2', 'markup-2']
category: News
---
Nested and mixed lists are an interesting beast. It's a corner case to make sure that
<ul>
	<li><span style="line-height:1.714285714;font-size:1rem;">Lists within lists do not break the ordered list numbering order</span></li>
	<li><span style="line-height:1.714285714;font-size:1rem;">Your list styles go deep enough.</span></li>
</ul>
<h3>Ordered - Unordered - Ordered</h3>
<ol>
	<li>ordered item</li>
	<li>ordered item
<ul>
	<li><strong>unordered</strong></li>
	<li><strong>unordered</strong>
<ol>
	<li>ordered item</li>
	<li>ordered item</li>
</ol>
</li>
</ul>
</li>
	<li>ordered item</li>
	<li>ordered item</li>
</ol>
<h3>Ordered - Unordered - Unordered</h3>
<ol>
	<li>ordered item</li>
	<li>ordered item
<ul>
	<li><strong>unordered</strong></li>
	<li><strong>unordered</strong>
<ul>
	<li>unordered item</li>
	<li>unordered item</li>
</ul>
</li>
</ul>
</li>
	<li>ordered item</li>
	<li>ordered item</li>
</ol>
<h3>Unordered - Ordered - Unordered</h3>
<ul>
	<li>unordered item</li>
	<li>unordered item
<ol>
	<li>ordered</li>
	<li>ordered
<ul>
	<li>unordered item</li>
	<li>unordered item</li>
</ul>
</li>
</ol>
</li>
	<li>unordered item</li>
	<li>unordered item</li>
</ul>
<h3>Unordered - Unordered - Ordered</h3>
<ul>
	<li>unordered item</li>
	<li>unordered item
<ul>
	<li>unordered</li>
	<li>unordered
<ol>
	<li><strong>ordered item</strong></li>
	<li><strong>ordered item</strong></li>
</ol>
</li>
</ul>
</li>
	<li>unordered item</li>
	<li>unordered item</li>
</ul>
