---
title: Building Your Backend With Serverless Functions
date: 2018-10-18 21:03:15 -0400
description: David Wells & Chris Coyier build a serverless function
vendor: YouTube
video_id: iZrzuUwm-9Y
related_tools:
- tool/netlify-functions.md
related_content: []
weight: ''

---
David Wells & Chris Coyier talk about how you can build an app hosted on Netlify, statically, but still have a backend database for powering it. We use the classic TODO app example here where the database is powered by FaunaDB and we talk to that database via serverless functions (Node.js JavaScript functions running on AWS Lambda via Netlify's extremely easy and powerful integration). Just put the JavaScript files in a \`functions\` folder and they'll be deployed and runnable!