---
type:
- article
date: 2015-11-10T15:22:00Z
excerpt: A brief overview of how a typical static site generator converts markdown
  files into fully formed HTML files.
posted_date: 2015-11-10T15:22:00.000Z
slug: how-do-static-site-generators-work
source: null
title: How do Static Site Generators Work?
tool: null
url: /2015/11/10/how-do-static-site-generators-work/
---

### CONTENT IN

Most, but not all, static site generators use markdown files to store content, with information about each file of content specified using YAML formatted front matter. It looks like this:


---
  
- - -  
title: 'The Title of an Entry Here'  
date: 2015-04-15  
category: 'News'  
excerpt: 'A short excerpt here'  
layout: default  
foo: 'Bar'  
- - -  
Some markdown content here, which is likely the longest part. This can be quite long, in fact.

---


### HTML OUT

Now, imagine a folder of these markdown files on your hard drive. We'll call this your project. The code of our static site generator could say "for each markdown file in folder x, move it to folder y." But that's not too exciting.

Let's say, instead of just moving that file, the generator reads all the files in a certain directory or directories and creates an "object" with them: "For each file in folder x, list its contents in our object." That object is just a stored list of all the files, including their file names, any meta-data specified in the front matter, and their content.

That object might look something like this (in Ruby, as output from Jeyll):


**\{"layout"=>"default", "title"=>"The Title of an Entry Here", "category"=>"News", "excerpt"=>"A short excerpt here", "published"=>true, "url"=>"/news/2015/04/14/post-title-here/", "dir"=>"/news/2015/04/14", "date"=>2015-04-14 00:00:00 -0400, "id"=>"/news/2015/04/14/post-title-here", "categories"=>\["news"], "next"=>, "previous"=>, "tags"=>\[], "path"=>"\_posts/2015-04-14-post-title-here.md", "content"=>"Some markdown content here, which is likely the longest part. This can be quite long, in fact.", "section"=>"post"}**


You can tell already that in creating the object the static site  generator has extrapolated some information, like a "url" created from our specified date and category: "For each file in folder x, write to our object and combine its category, date and file name to create a url in a format like '/category/yyyy-mm-dd/original-base-filename.html'."

Once we've generated our object, the generator can do quite a bit with it. We can create an HTML page with the url as created above, and that file could be manipulated further using some of the meta-data we've specified.

More than likely, we don't want to display content written in Markdown, so the generator will convert our markdown into HTML before outputting it to our new file: "for each item in the object, convert the value of 'content' from markdown to HTML."

And, of course, we don't want to just display plain text, we want to style the page. We've likely created a set of templates in our project and specified in our content file which template to use for each file.

In our templates we lay out our HTML and also some tags that specify which parts of our file (the content or some piece of metadata) to display: "For each item in our object, apply its content to the template specified as 'layout' as we output it as HTML."

Each template may output other content too. A template might call: "for each item in our object, loop through the ones that have a 'category' equal to 'news' and display the title."

So, along the way to just creating the HTML file, the generator will read the templates and output HTML in the format we've dictated. In the end, we have a new folder with our fully formed HTML files.

Asset files, like CSS and javascript are just moved into the new folder, so that in the end, that folder contains our fully formed website, which can then be moved to a web server.

So a static site generator converts one set of files into another using templates for instructions on how to output them in their final form.

I highly recommend reading the source code of any static site generator to understand how things work in a real-world setting.


