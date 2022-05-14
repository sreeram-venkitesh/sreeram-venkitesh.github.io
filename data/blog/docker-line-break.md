---
title: "Is docker really “Build once, run everywhere”?"
summary: 
tags: ["docker", "devops"]
draft: false 
date: "2022-05-14"
---

Last week I came across a very peculiar error while trying to run a docker container on a Windows machine. 

```bash
standard_init_linux.go:228: exec user process caused: no such file or directory
```

I’ve been using an M1 MacBook Pro as my daily driver for almost a year now, and before that I’ve spent close to 3 years distro hopping before finally settling with Arch Linux. The last time I’ve used Windows, apart from the occasional debugging for my parents, was in 2018 when I got my first laptop. So my assumption when I was dockerizing the project that I was working on in my full time job was that if I’m able to run the docker containers properly in my Mac, it should work in somebody else’s Windows machine without any hassle. I mean that’s what docker is for right? But apparently it was more complicated than that.

After some frustrating hours trying to install and setup docker on Windows running in my old laptop, I figured out that the culprit was how the line break was handled in Windows compared to unix systems.

Line breaks in text files are handled by special control characters. You might’ve come across characters like `\n` to start a new line. This line break is handled differently in Windows compared to unix based systems. In Windows, line endings are a combination of two characters, called a Carriage Return (CR) and Line Feed (LF). This is represented as `\r\n`. In unix based systems however, line endings only use a single line feed character. Thus files made in unix systems only has the `\n` for its line breaks. So if you create a docker image in a unix system and try to run it in Windows, it will break if you haven’t properly handled the changes to line breaks. Windows machines will not be able to process the files properly and hence the `no such file` error

I’m not really trying to say that docker cannot be built once and run everywhere, as suggested by the rather clickbaity title, but it sure will seem that way if a beginner encounters this rather interesting bug without knowing what they’re dealing with!

**Further Reading**

- [An interesting StackOverflow answer about the history of CRLF and LF and how they're related to old typewriters](https://stackoverflow.com/a/1552775/10727761)

- [Some ways to fix this 'bug' by changing the line break settings](https://stackoverflow.com/questions/10418975/how-to-change-line-ending-settings)