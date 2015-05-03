### What the generator does

The Webhook generator does not contain the code for the CMS.

The Webhook generator repo contains the blank, default files that get installed with any Webhook site. It is essentially a small grunt project that talks to firebase and builds the site based upon changes to the data there and to the template layer.

Generator also stores all the additional functions and filters we've added to the Swig JS templating system.

### Contributing to this repo

We welcome contributions to this repo, but please be cognisant that this code runs on thousands of websites. Therefor we're pretty strict about what we accept.

Please consider the following before submitting your pull request:

1. Is the code backwards compatible with previous versions of the generator?
2. Is the code documented, properly explained and follow the naming patterns of the current code?
3. Does it add generic abilities that are useful to most projects, not just your own?
4. You are contributing your code under the MIT license this code is provided with.

### Setting up a dev environment

Goes without saying you'll need to have Node, Grunt and Webhook installed to work on this repo.

1. Clone this repo somewhere locally.
2. `cd webhook-generate`
3. Run `wh init your_site_name`. You'll need to use an existing Webhook site you have control over.
4. View your site at http://localhost:2002 as normal.

Running `wh init` will create a pages and templates folder. You do not want to commit any of these files. Most importantly don't commit the `cms.html` file we generate. They are added simply so you can run things locally.

### Submitting Pull Requests

Please do the following when submitting a pull request:

1. Please create a corresponding issue for the pull request.
2. Please name the issue as either a feature addition or a bug fix.
3. Please reference an issues in your pull requests.

### Description of Files

Here is a description of the various files that are in the generator repo, and what their purpose is:

### Primary Grunt tasks

[Gruntfile.js](https://github.com/webhook/webhook-generate/blob/master/Gruntfile.js)

* The main gruntfile.
* It should never charge.
* Imports the tasks from /tasks/.
* Is instaled into new projects blank so that users can add their own Grunt tasks.

[tasks/generatorTasks.js](https://github.com/webhook/webhook-generate/blob/master/tasks/generatorTasks.js)

* Contains the main grunt tasks run by the generator
* Taks include watching for changes, building scaffolding and building the site.

[options/generatorOptions.js](https://github.com/webhook/webhook-generate/blob/master/options/generatorOptions.js)

* Defines the options for the tasks defined above.

pages, static, templates folders

* Houses the static assets and templates that are installed in a fresh Webhook site.
* These files are often overwritten by themes or later modified by users. In that sense they are pure boilerplate.

#### libs

The libs folder contains all the executing code for the generator. It can not be edited by local clients.

[libs/generator.js](https://github.com/webhook/webhook-generate/blob/master/libs/generator.js)

* Handles all tasks defined in generatorTasks.js.
* Handles static generation, the web socket server, and the live reload server.

[libs/swig_filters.js](https://github.com/webhook/webhook-generate/blob/master/libs/swig_filters.js)

* Adds Webhook specific [Swig JS](http://paularmstrong.github.io/swig/) filters.
* You can see documentation for them [here](http://www.webhook.com/docs/template-rules-and-filters/).

[libs/swig_functions.js](https://github.com/webhook/webhook-generate/blob/master/libs/swig_functions.js)

* Adds Webhook specific [Swig JS](http://paularmstrong.github.io/swig/) functions.
* You can see documentation for them [here](http://www.webhook.com/docs/template-rules-and-filters/).

[libs/swig_tags.js](https://github.com/webhook/webhook-generate/blob/master/libs/swig_tags.js)

* Not used, please do not modify.

[libs/utils.js ](https://github.com/webhook/webhook-generate/blob/master/libs/utils.js)

Contains generic utility functions shared between files.

[libs/scaffolding_*.html](https://github.com/webhook/webhook-generate/tree/master/libs)

* Templates generated when a user creates a new content type in the CMS.
* Usually contains a forloop that loads the individual widgets or fields in the form.

[libs/widgets/*.html](https://github.com/webhook/webhook-generate/tree/master/libs/widgets)

* The templates used in scaffolding for each field/property the user adds to their content-type form.
* If the file <widgetname>.html is not defined, then the scaffolding simply spits out {{ item.propertyname }}.

[libs/debug404.html ](https://github.com/webhook/webhook-generate/blob/master/libs/debug404.html)

* The 404 page shown on the local development server.
* On the live server, the `pages/404.html` page is used instead, which is stylable.

### Search

The JS powered search that appears in fresh Webhook sites is located in [this repository](https://github.com/webhook/Tipue-Search). We keep it seperate from this repo so that we can push out changes without requiring a `wh update`. Generator ships with a default `/pages/search-results.html` page to interact with it. You can find more information in the Webhook docs [here](http://www.webhook.com/docs/adding-search/).


