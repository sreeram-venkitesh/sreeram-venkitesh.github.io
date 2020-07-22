+++
author = "Sreeram Venkitesh"
date = 2020-07-22
title = "How to make the title of your YouTube video update itself with the number of views?"
series = 'software'

+++

## Also published in my [dev.to blog](https://dev.to/deta/how-to-use-the-youtube-api-to-create-a-self-updating-video-title-based-on-views-59o8)

## [Link to my video tutorial](https://youtu.be/QwecvVvESVU)

You might have seen Tom Scott's [video](https://www.youtube.com/watch?v=BxV14h0kFs0) where he uses the YouTube API to automatically update the title of his video in real time to say 'This video has n views'. Sometime after, another YouTuber, Mr.Beast did the [same thing](https://www.youtube.com/watch?v=YSoJPA8-oHc) with the thumbnail of his video to show how much money he donated.

One of my favourite dev channels, Fireship had posted a [video](https://www.youtube.com/watch?v=JjXBrJfp5TE&t=257s) explaining how these people are doing this, explaining how APIs work and how they can be used to automate such tasks.

Although Tom Scott never went into the intricacies of the code behind this process, Fireship explained how to acheive this to a fair degree of detail. 

Basically we need to use the YouTube Data API provided by Google to fetch the details of a video. We have two ways to do this
* Use an API key to do read-only processes (Like retrieving the number of views)
* Use an OAuth 2.0 credential to sign in to your YouTube account and be able to retrieve and update the data. 

We would need to use OAuth since we need to update the title of our video.

Fireship's video, although really well made and interesting to watch, is not a tutorial. You can definitely get a head start but not a walkthrough. But I decided to give it a try nonetheless in the hope to being able to document the process and create a more concise tutorial.


## Step 1 - Using the YouTube Data API

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/nshc69tjtjkw3c23l5ht.png)

The API that we're gonna use is has an [extensive documentation](https://developers.google.com/youtube/v3/docs/?apix=true) along with an in-browser API Explorer that you can use to test an API before actually using it in your project. 


![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/jpdvc3wqz1i2oen5tbgy.png) 

This can be really handy to test the API while writing the code. Notice how there are two options for selecting the credentials. If you checked Google OAuth and select a scope within it (different scopes have different access levels), you'll be prompted to login to your Google account to authenticate the API request. This way the API can make sure that you are requesting to edit the details of a video posted from your account which you have the access to update.

For the title we are going to need the `list` and the `update` functions of the API, both of which you can test from the explorer. 

---

## Step 2 - Creating a project with Deta

Being able to call the API and change the video title is not enough. You should be able to do this periodically as the views get updated in real time. 

Using Deta makes setting up all of this really easy with their [Micros](https://docs.deta.sh/docs/micros/about) and [Cron](https://docs.deta.sh/docs/micros/cron). You can write a piece of code, deploy it, set a cron and it will keep running periodically after a time period that you specify. 

### Using Deta Micros and Crons to deploy your code

* Create a new Micro

Inside your project directory, run
```
deta new --node my-project-name
``` 
This will create a new directory with the name of your project and it will have a `.deta` folder inside, with all the information regarding your micro. (If you haven't used Deta before, you'll need to install the CLI and login from your machine. Check out a tutorial [here](https://docs.deta.sh/docs/micros/getting_started)). Once the project is created, you can `npm init` inside the directory to initialise a node project.

* Install the node package for using Google APIs

From your project directory, once you've initialised the node project, run
```
npm install googleapis
```
* Using the APIs

Once you have the package installed, you can easily access all of Google's APIs for say, YouTube or Drive or whatnot.

```
const google = require('googleapis')

const youtube = google.youtube('v3')
```
Here v3 represents DataAPI v3 of YouTube.

You can now use the list function to fetch the video details and the update function to update the details of your video.

```
youtube.videos.list({
    auth: auth,
    id: 'YOUR_VIDEO_ID',
    part: 'snippet,statistics',
},function(err, result) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }else{
      //Do something here with the data
      console.log(result.data)
    }
})
```

OK, so you might be confused with two things I didn't talk about yet. 

The auth object we pass to the function are our credentials. This will be the API Key if you only need to read the data or it'll be the access token and refresh token linked to your Google account that has the access to edit the title of the video. 

The other arguments for the function are the video ID, which is just the unique string present in the url of every video. The part argument specifies what all types of detail we need to fetch. `snippet` stands for all the details of the video like the title, categoryId, description, tags etc. `statistics` is information like the number of views, likes, dislikes and all. Since we need both the title and the view count, we can retrieve both the snippet and statistics of the video.

* The Updation

Once you get the details of a video, you can take the view count, create a string saying whatever you want with the view count and send it back to update it as the new title of the video.
Here's how we can do it with code
```
const video = result.data.items[0]
        
const { viewCount } = video.statistics

const newTitle = `This video has got ${viewCount} views!`

video.snippet.title = newTitle

youtube.videos.update(
{
    auth: auth,    
    part: "snippet", //since we only need to update the title
    resource: {
       id: 'YOUR_VIDEO_ID',
       snippet : {
          "title": newTitle,   //set title as new title
          "categoryId": 'categoryId'   
       }
},(err, response) => {
    if (err) {
      console.log(`There was an error updating ${err}`)
      return
    }
    if (response.data.items) {
      console.log("Done")
    }
  }
)
```

You can set the new title from the details collected from the `list` function and use it with the update function. YouTube also wants us to set the Category ID of the video while updating the details. The complete list of category IDs can be found [here] (https://gist.github.com/dgp/1b24bf2961521bd75d6c)

The update function can be called from inside the list function if you want to, to directly access the data in the response of the API.

---

## The Google Developer Console

Now let's look at the `auth` object that we pass in the function calls. `auth` is an `oauth2client` object that has our credentials and information like the access token and refresh token and all. 

Remember how when using the API explorer Google asked us to select an account and approve all the permissions? We generate access tokens and store it and pass it to our function calls so that we do not need to do this confirmation every single time the function is called. And since we need to update the title in real time, we will need to call the function frequently. 

* To generate the access tokens, first create a project in your [Google Developer Console](https://console.cloud.google.com).
* Add the YouTube Data API v3 to your project from the API library
* Go to the credentials tab and create a new `OAuth Client ID` from the `Create Credential` menu
* You will need to create an OAuth consent screen for this, which you can do easily from the side menu bar in the console.
* Once created, download the `clien_secret.json` file and keep it in yoru project directory. Don't forget to add it to `.gitignore` if you are going to push your code to a public repository.

--- 

There are a few function that we need to run to generate the access token for the first time. This involves running the code from our local machine and confirming the use of the app we created with our Google account. 

For doing this, you can clone the repo I made [here](https://github.com/fillerInk/this-video-has-x-views)

* After cloning, run `npm install` inside the directory with the `package.json` file
* Copy the `client_secret.json` file downloaded from your Google Developer Console into the project directory. 
* Create a new micro inside the cloned project with `deta new`. This will create a Micro for you based on the existing files. Once created you can go on and run `deta deploy`, but we'll wait until everything is done to deploy it.
* Run `npm start` to start the local server on your machine. 
* You will be given a url in the terminal. Go there and you will get a code in the address bar after you select your Google account and accept the terms. (If it says the app is not trustable, its because we haven't verified it. Don't worry, you are the only person who can access the app.)
* Paste this code back into your terminal and this will generate a directory named `.credentials` in your project folder with your access tokens.
* Run 
```
deta deploy
```
 to deploy your micro

* Run 
```
deta cron set '5 minutes'
``` 
(or however frequent you want the code to run) from the terminal to set the cron

---

Deta Cron will schedule the running of whatever piece of code you put inside `app.lib.cron(event => { });`. You can use it to automate whatever routine tasks that you might have. 

This blog post was meant to be a tutorial for a use-case for Deta Cron. Hope this gave you some insight into using Deta in your next project!

Check out my GitHub repo for this project [here](https://github.com/fillerInk/this-video-has-x-views)
