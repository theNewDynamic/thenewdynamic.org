---
title: "How do Static Site Generators Work?"
date: 2015-11-10T15:22:00.000Z
posted_date: 2015-11-10T15:22:00.000Z
type: articles
slug: how-do-static-site-generators-work
source:
excerpt: A brief overview of how a typical static site generator converts markdown files into fully formed HTML files.
tool:
---
### CONTENT IN

Most, but not all, static site generators use markdown files to store content, with information about each file of content specified using YAML formatted front matter. It looks like this:
```markdown

---
title: &#39;The Title of an Entry Here&#39;
date: 2015-04-15
category: &#39;News&#39;
excerpt: &#39;A short excerpt here&#39;
layout: default
foo: &#39;Bar&#39;
---
Some markdown content here, which is likely the longest part. This can be quite long, in fact.

```



### HTML OUT

Now, imagine a folder of these markdown files on your hard drive. We&#39;ll call this your project. The code of our static site generator could say &quot;for each markdown file in folder x, move it to folder y.&quot; But that&#39;s not too exciting.

Let&#39;s say, instead of just moving that file, the generator reads all the files in a certain directory or directories and creates an &quot;object&quot; with them: &quot;For each file in folder x, list its contents in our object.&quot; That object is just a stored list of all the files, including their file names, any meta-data specified in the front matter, and their content.

That object might look something like this (in Ruby, as output from Jeyll):


**\{&quot;layout&quot;=&gt;&quot;default&quot;, &quot;title&quot;=&gt;&quot;The Title of an Entry Here&quot;, &quot;category&quot;=&gt;&quot;News&quot;, &quot;excerpt&quot;=&gt;&quot;A short excerpt here&quot;, &quot;published&quot;=&gt;true, &quot;url&quot;=&gt;&quot;/news/2015/04/14/post-title-here/&quot;, &quot;dir&quot;=&gt;&quot;/news/2015/04/14&quot;, &quot;date&quot;=&gt;2015-04-14 00:00:00 -0400, &quot;id&quot;=&gt;&quot;/news/2015/04/14/post-title-here&quot;, &quot;categories&quot;=&gt;\[&quot;news&quot;], &quot;next&quot;=&gt;, &quot;previous&quot;=&gt;, &quot;tags&quot;=&gt;\[], &quot;path&quot;=&gt;&quot;\_posts/2015-04-14-post-title-here.md&quot;, &quot;content&quot;=&gt;&quot;Some markdown content here, which is likely the longest part. This can be quite long, in fact.&quot;, &quot;section&quot;=&gt;&quot;post&quot;}**


You can tell already that in creating the object the static site  generator has extrapolated some information, like a &quot;url&quot; created from our specified date and category: &quot;For each file in folder x, write to our object and combine its category, date and file name to create a url in a format like &#39;/category/yyyy-mm-dd/original-base-filename.html&#39;.&quot;

Once we&#39;ve generated our object, the generator can do quite a bit with it. We can create an HTML page with the url as created above, and that file could be manipulated further using some of the meta-data we&#39;ve specified.

More than likely, we don&#39;t want to display content written in Markdown, so the generator will convert our markdown into HTML before outputting it to our new file: &quot;for each item in the object, convert the value of &#39;content&#39; from markdown to HTML.&quot;

And, of course, we don&#39;t want to just display plain text, we want to style the page. We&#39;ve likely created a set of templates in our project and specified in our content file which template to use for each file.

In our templates we lay out our HTML and also some tags that specify which parts of our file (the content or some piece of metadata) to display: &quot;For each item in our object, apply its content to the template specified as &#39;layout&#39; as we output it as HTML.&quot;

Each template may output other content too. A template might call: &quot;for each item in our object, loop through the ones that have a &#39;category&#39; equal to &#39;news&#39; and display the title.&quot;

So, along the way to just creating the HTML file, the generator will read the templates and output HTML in the format we&#39;ve dictated. In the end, we have a new folder with our fully formed HTML files.

Asset files, like CSS and javascript are just moved into the new folder, so that in the end, that folder contains our fully formed website, which can then be moved to a web server.

So a static site generator converts one set of files into another using templates for instructions on how to output them in their final form.

I highly recommend reading the source code of any static site generator to understand how things work in a real-world setting.


