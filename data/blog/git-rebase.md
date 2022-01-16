---
title: "How to do a git rebase"
summary: "Rebasing in git essentially rewrites the history and puts your commits to the top of the commit tree"
tags: ["git","software engineering","tutorial"]
draft: false 
date: "2021-11-10"
---

Steps to rebase your current working branch with master

- `git checkout master`

- `git pull origin master`

- `git checkout YOUR_BRANCH`

- `git rebase master`

- Fix conflicts if there are any.

- If there are conflicts at this stage, and you've fixed them, you can run `git rebase --continue` to complete the rebase, or if you want to abort the rebase you can run `git rebase --abort`

- Finally force push to the origin of your branch. Here we are doing force push because essentially we are changing the history of our commits when we do the rebase

- `git push -f origin YOUR_BRANCH`

- All your commits should be rebased with the commits in master branch now


[Here](https://www.bigbinary.com/videos/misc/git-how-to-rebase-without-complications) is a video about rebasing in a a slightly different technique, which can be used if you have a lot of conflicts.

