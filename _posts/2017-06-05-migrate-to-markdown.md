---
title: Migrating from any CMS to Markdown
published: true
category: Tutorial
meetup:
start_at:
venue:
address:
link:
description: "A tested process for Migrating out of any CMS"
---

We had a great talk last week by [Brian Rinaldi](https://www.youtube.com/watch?v=XjPZWh9oV7E&t=412s), who reviewed some of the ways to migrate from Wordpress and other CMS's into a Git-based JAMStack site. Most of the migrations I've done have come from other CMSs, so I thought I'd outline the process here.

My process is primarily manual and I'm sure there's room to make this easier, but the manual steps have helped me make sure I'm transferring clean content.

Before you begin, you need to have your content model in place so you understand what the top-level collections  are, and what your fields look like.

The overall process is just three steps:

1) Output your content into templates from your existing CMS that are formatted much like Markdown documents.

2) Run that output through an HTML to Markdown converter.

3) Convert the resulting content into individual files.

---

## 1) Output content to templates

This part will require some thought. What we're doing is creating a blank HTML template and looping through a section of our content. However your content is broken down (posts/pages/collections/sections) you'll create one of these templates for each section. If you have a great number of entries in any given section, you may need to break it into smaller chunks and output each separately.

_the example is for YAML, but can be adjusted for whatever format you need, TOML, or JSON_


You can see below that within my for-loop, I'm merely outputting a Markdown document with front matter; with one exception.

Here's a typical markdown document:

```
---
title: "Some Title"
description: "this is the best."
---
And any body copy goes here.
```


For our export, we'll change one thing. We'll swap out the opening three dashes `---` with a symbol `@@@`. This will be important later, because we'll use that symbol to demarcate the beginning of each document.

```
@@@
title: "Some Title"
description: "this is the best."
---
And any body copy goes here.
```

Here's what a finished document looks like, below (that happens to be from the Webhook CMS):

{% raw %}
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
{% block content %}
{% set content = cms.pages %}
{% for object in items %}
@@@<br />
title: "{{ object.name }}"<br />
draft:{% if object.isDraft == true %}true{% else %}false{% endif %}<br />
date:{% if object.publish_date %} {{ object.publish_date | date('c') }}{% endif %}<br />
image:{% if object.image %} {{ object.image.url }}{% endif %}<br />
description:{% if object.meta_description %} "{{ object.meta_description }}"{% endif %}<br />
_slug: {{ object.slug }}<br />
---<br />

{{ object.copy | safe }}
{% endfor %}
<br />
{% endblock %}



</body>
</html>
```
{% endraw %}

## 2) Run through a HTML to Markdown converter

Once you render that page in your browser, view source. Now you'll want to get that HTML into Markdown. I use Dom Christie's excellent ["to-markdown"](https://github.com/domchristie/to-markdown) for this process. If you're going to be using it a lot, you can fork it and run your own version, but it's running at [domchristie.github.io/to-markdown/](http://domchristie.github.io/to-markdown/) and you can use it there as well.

**Note: Be sure you check the "Github Flavored Markdown" box**

Copy your HTML content and paste it into the HTML box on the left, and on the right you'll find your rendered Markdown content.

Copy that content and paste it into a text editor (I use Sublime for this because it can handle large files and has good Regex).  This is your opportunity to scan your content and clean it up to make sure you've output it correctly. It can sometimes take trial-and-error to get the fields' formatting and data right.

One thing that the Markdown converter doesn't do well is to convert spaces, which you may use for YAML objects, like this:

```
image:
  - path: "/path/image.jpg"
    caption: "caption copy here"
```

I output with dollar signs (or use any symbol that makes sense for your content) with spaces, like this:

```
image:
$$- path: "/path/image.jpg"
$$$$caption: "caption copy here"
```

And then replace the dollar signs in mass once you've copied over to the text editor.

## 3) Convert to Files

Now you have one long document that will look like this:

```
@@@
title: "Some Title"
description: "this is the best."
_slug: some-title
---
And any body copy goes here.

@@@
title: "Some Title two"
description: "this is the best."
_slug: some-title-two
---
And any body copy goes here.

@@@
title: "Some Title three"
description: "this is the best."
_slug: some-title-three
---
And any body copy goes here.


```

The final step is to convert that one document into many.

First, save the document into a text file called `export.txt` and use your terminal to navigate into the folder where it is saved.

Run the following [csplit](http://man7.org/linux/man-pages/man1/csplit.1.html) command in your terminal. _This is for a Mac, so other systems may require a different command_.

```
csplit -k -n 3 export.txt '/^@@@/' {'999'}; \
for i in xx*; do sed -i '' 's/@@@/---/g' $i; \
done; \
for i in xx*; \
do mv $i `egrep -m1 -e 'slug:.*' $i | sed -e s/[^\]\[A-Za-z0-9~.,_{}\(\)\'\-\+]/-/g -e s/_slug--//`.md; \
done
```

This should output all the entries to documents in the same folder that look like `some-title.md`. Here's a Gist with a similar example: [gist](https://gist.github.com/budparr/d929f3d662baa341fb843cd36e3dfe04)

You can also change `_slug` in my example to `date` if you need your documents to be date-based for something like Jekyll posts.

That's the process. It will most likely require some trial-and-error, and a fair amount of patience, but once you're in Markdown heaven you'll have content that is readable, easy to manipulate, and portable from system to system.

If you want to discuss this process, you're welcome to reach out on [Twitter](https://twitter.com/thenewdynamic), or join our [Slack](/slack/).


<style>
pre  {
  background-color: #eee;
  padding: 2em;
  max-width: 100%;

}
article {
  overflow: hidden;
}
</style>
