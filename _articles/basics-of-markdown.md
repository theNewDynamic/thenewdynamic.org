---
title: "Basics of Markdown"
date: 2014-03-09T22:01:00.000Z
posted_date: 2015-05-02T22:01:00.000Z
type: articles
slug: basics-of-markdown
source:

tool:
---

[_An abreviated form of this article is available as a Gist on Github_](https://gist.github.com/budparr/9257428)

### What is Markdown?

Markdown is a formatting syntax that allows you to write in plain text in any editing program, but still format your document like you would with a word processor. It was created to convert plain text into HTML for publishing on the web and happens to be super easy to write and just as easy to read even without being converted.

Markdown ensures that a writer&#39;s intended formatting never gets lost. If you&#39;ve ever labored on a Word document only to have its formatting scrambled when you sent it to be published to your website or when a colleague opened it in another program, you&#39;ll appreciate the simplicity and stability of Markdown.

While you can edit Markdown files in any text editor, there are are some, like [iA Writer for Macs](http://www.iawriter.com/mac/), that are specially built to make this easy way of writing even easier.

### How do I write in Markdown?

Markdown is extremely simple. In fact, it&#39;s mostly plain text, so writing a paragraph would be the same as with any text editor (there&#39;s a line between each paragraph).

If you want to put in a line break
you merely put two spaces after a line
and it shows up like this.

#### Emphasis

If you want to make a word **bold**, you merely put two asterisks around it:

``` like **this** ``` is  like **this**

To emphasize a word with *italics* you put one asterisk around it:

``` like *this*``` is  like *this*

or

``` use an _underscore_ ``` to get the same results.

_You can even use these same characters to emphasize complete sentences_.



#### Links

[Links are simple](https://www.google.com/search?q=markdown). Just put the text to be linked in [] brackets, and the link in () parenthesis.

``` [Links are simple](https://www.google.com/search?q=markdown) ```



#### Blockquotes

When typing an extended quote, just put the &quot;greater than&quot; sign before the paragraph.

~~~

&gt; &quot;I have dipped into books of aesthetics, but I had an uncomfortable feeling that I was reading the works of astronomers who had never looked at the stars. They were writing about poetry as if poetry were a task, and not what it really is, a passion, and a joy.&quot;

~~~

&gt; &quot;I have dipped into books of aesthetics, but I had an uncomfortable feeling that I was reading the works of astronomers who had never looked at the stars. They were writing about poetry as if poetry were a task, and not what it really is, a passion, and a joy.&quot;

#### Lists

- Using Lists is Easy
- Just use a dash with a space before each line

~~~
- Using Lists is Easy
- Just use a dash with a space before each line
~~~


#### Headings

~~~

# The largest heading
## The second largest heading
…
###### The 6th largest heading

~~~

#### Images

Images are just like links, but they have an exclamation point in front of them (and of course the link should be to where the image is!). The text between the brackets becomes the title, but it&#39;s not required.

![Images are easy](https://c1.staticflickr.com/3/2835/12680465824_c959772b64_t.jpg)

~~~

![Images are easy](http://link-to-image.jpg)

~~~



### Resources

See also [&quot;What is Markdown&quot;](http://whatismarkdown.com/) for a list of good Markdown editors.

If you&#39;re editing content in a Jekyll-based site, you can use the [prose editor](http://prose.io/), if your site is configured for it. If you want more advanced formatting, check out the original [Markdown site](http://daringfireball.net/projects/markdown/), or the [Github Markdown page](http://guides.github.com/overviews/mastering-markdown/).
