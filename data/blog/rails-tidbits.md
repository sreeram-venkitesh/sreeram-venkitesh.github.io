---
title: "Ruby on Rails development tidbits"
summary: "Some sweets tricks to make your Rails app development easier"
tags: ["ruby on rails","software engineering"]
draft: false
date: "2021-12-15"
---

__#1__ 

Get the list of all Active Record Model objects in your app from Rails console.

```
ApplicationRecord.descendants
```
---

__#2__

Sometimes you might find that when using the `rails` command line utility it hangs and crashes. You might come across this issue when trying to open the Rails console or run a migration. This can be caused due to spring and restarting it might do the trick. Restart the spring server by running the following

```
spring stop
```
Once you've run this command and stopped spring, it will be automatically restarted the next time you run any `rails` command.