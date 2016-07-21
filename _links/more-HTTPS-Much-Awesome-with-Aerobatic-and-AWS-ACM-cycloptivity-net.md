---
title: "More HTTPS, Much Awesome with Aerobatic and AWS ACM"
source: Sam Wilson, cycloptivity.net
date: 2016-03-20 19:36
link: https://www.cycloptivity.net/more-https-much-awesome/
type: Article
tool:
  - aerobatic
---
How does Aerobatic help us here? By leveraging the Amazon Certificate Manager (ACM) to issue free TLS certificates for any domain that is validated by ACM they can configure a AWS Cloudfront distribution with end-to-end encryption and delegating cipher suite hardening to AWS (which they update regularly - just have a look at your ELB policies).





