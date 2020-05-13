---
title: Netlify Functions (Examples)
description: Examples and Tutorials on using Lambda functions on Netlify
date: 2018-05-19T15:48:33.000Z
tools:
  - Serverless
  - Helper
license: Commercial
language: ""
urls:
  website: https://functions.netlify.com/
  github: ""
  twitter: ""
  other: ""
resources: []
related_tools:
  - tool/netlify.md
repo: null
weight: ""
tags: null
---
AWS Lambda functions open a world of possibilities for running on-demand, server-side code without having to run a dedicated server. However, managing service discovery, configuring API gateways, and coordinating deployments between your app and your functions can quickly become overwhelming.

Netlify lets you deploy Lambda functions without an AWS account, and with function management handled directly within Netlify. Your functions are version-controlled, built, and deployed along with the rest of your Netlify site, and we will automatically handle service discovery through our built-in API gateway. This eliminates overhead and brings the power of Deploy Previews and rollbacks to your functions.

All Netlify sites include 125,000 function requests per month, and 100 hours of run time per month. Above that, billing scales with your [usage](https://www.netlify.com/docs/functions/#usage-and-billing).

Currently, you can deploy functions built with JavaScript and Go.