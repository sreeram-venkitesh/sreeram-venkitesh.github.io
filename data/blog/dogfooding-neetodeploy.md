---
title: How I'm "dogfooding" neetoDeploy
summary: How I'm building and using neetoDeploy
draft: false
date: 2023-06-07T00:00:00.000Z
tags:
  - neetoDeploy
---

At [BigBinary](https://bigbinary.com), we are building [neetoDeploy](https://neeto.com/neetodeploy), the next best alternative to Heroku. We started building neetoDeploy from September of 2022, right after Heroku [announced](https://blog.heroku.com/next-chapter) that they're getting rid of their free plans. The neetoDeploy team started with 4 engineers and in the past 9 months we've come a long way. We started off with just PR review apps, then progressively moved to staging and production apps. We are also continually adding handy features like database backups and rollbacks, custom domains and SSL management, scaling, metrics and so on.

Before I started working on neetoDeploy, I used to work with one of BigBinary's clients. One of the things that the tech lead of that project used to say has stuck with me - "eating your own dog food".
