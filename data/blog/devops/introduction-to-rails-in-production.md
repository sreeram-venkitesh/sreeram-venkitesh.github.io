---
title: "Introduction to Rails in production"
summary: "An overview of different ways to deploy your Rails apps"
tags: ["ruby-on-rails","software-engineering","devops"]
draft: false
date: "2022-03-07"
---

This post is a part of the [Rails in Production](/blog/rails-in-production) series and aims to give a general introduction about devops with Rails. This post assumes that you have a basic working knowledge of how a Rails application works.

---

Building your web application and deploying it at a production level are two different tasks that involve an entirely different set of processes, requiring different skills. You probably would have deployed your first Rails application in Heroku, or a similar platform as a service that provides support for Ruby on Rails. With platforms like Heroku, you can easily deploy an application without having to worry about the devops side of things. You can choose a type of "dyno" you want in Heroku, depending on the specifications you want for your application, and just connect the project to your GitHub repository. Deploying the app would be easy as running a `git push`. 

This is the easier option, and honestly this is plenty if you're just starting out. In fact, we can even host larger applications on Heroku but you've to configure everything for scaling with your project's requirements. The second method is to deploy the application yourself in your own servers. If you go into how Heroku Dynos work under the hood, this is exactly what they're doing. Heroku does all the heavy lifting for you from the devops perspective and gives you the option to be able to configure some of the stuff which you might need (like configuring addons, setting up DNS) so that you can worry about the development and not the deployment. 

Talking about deploying to your own servers, you can either build your own homelab in your garage, or create a virtual private server from a cloud service provider like GCP, AWS or Microsoft Azure and not worry about having to deal with the actual hardware. Unlike Heroku, you can provision a fresh virtual server and you will have to set it up from the ground up, including things like selecting what operating system it should run on. After this you can ssh into the remote server from your machine, essentially getting access to the terminal in the remote server. From here you can install whatever packages you want for your application to run, clone the application and start it by running the Puma server, similar to how you would start the application in your local machine. The difference here is that you get much more finer control over what you wanna do and how you wanna do it. Think of it like ordering food vs buying the ingredients and cooking it on your own. 

Now that you have a better idea of the differences between using a platform like Heroku versus configuring your own servers, we will go deeper and get more technical, like how to automate the provisioning of a server and its initial setup using Ansible, how to automate the deployment process of a Rails application using deployment tools like Capistrano, how to manage multi-server deployments where you have to deploy the same application in different server with different environments like staging, production etc. and how you can bring all of this together. 

This series of posts will be divided into different sections based on a topic. There will also be longer tutorial-like posts and smaller posts going over specific tidbits of information about more obscure things you might encounter while working. You can follow these posts in any order depending on your requirement, but if you are following along to learn from scratch, I'd suggest following the given order.

---

**Further Reading**

- [Why do people use Heroku when AWS is present?](https://stackoverflow.com/questions/9802259/why-do-people-use-heroku-when-aws-is-present-what-distinguishes-heroku-from-aws)