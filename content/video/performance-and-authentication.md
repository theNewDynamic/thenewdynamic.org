---
title: Performance and Authentication
date: 2018-10-13 08:37:23 -0400
description: Authentication, and how it affects performance.
vendor: YouTube
video_id: lncyIkCDoBU
related_tools:
- tool/netlify-functions.md
- tool/cloudflare.md
related_content: []
weight: ''

---
Gerald Onyango (https://twitter.com/futuregerald) discusses authentication, and how it affects performance. He compares using session cookies vs JWT (JSON Web Tokens) tokens, and the benefits of JWT which can be used to authenticate requests and pass data on the frontend, on the CDN edge, in functions, and on third party servers, without having to make round trips back to your database for each request.