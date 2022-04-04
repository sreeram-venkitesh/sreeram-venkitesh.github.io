---
title: "Open Source Challenge Day 1 "
summary: "ActionController::Parameters and rewriting delegating methods"
tags: ["open source challenge"]
draft: true 
date: "2022-4-4"
---

- Took up [this](https://github.com/rails/rails/issues/44813) issue which had the `good-first-issue` tag. A [PR](https://github.com/rails/rails/pull/44816) was already merged for this issue, so I thought it would be a perfect place to get started and compare my code with that in the merged PR.
- Since this is my first time trying to _actually_ contribute to Rails, I set up the repo locally and had to install mysql and the mysql2 gem before I could run `bundle install` in the project.
- One mistake I made is pulling the latest changes, which included the code from the merged PR as well, and I ended up working on top of the solution. Need to keep this in mind going forward.
- Going through the entire codebase without knowing what exactly is happening is a bit overwhelming.

**Learnings**

- I played around with the Parameters class in the actionpack gem. While I couldn't understand everything I can refer back to this in the context of Rails controllers to learn more.