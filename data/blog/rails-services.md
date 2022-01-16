---
title: "Using services in your Rails projects"
summary: "Services can be powerful tools to optimize your code make your life easier"
tags: ["ruby on rails","software engineering"]
draft: false
date: "2022-01-08"
---

### Why do we need services?

Using services in Rails is one concept that you might get confused over if you are just starting out. After understanding the basic MVC patterns and the major conventions of Rails, once you start building larger applications, you might find that your controllers and model files are starting to get heavier even after DRYing up your code as much as possible. This is where services comes into play. Services are essentially regular Ruby classes that abstracts business logic that doesn't really belong in your controllers or models into service classes to make your controllers/models thinner.

Understanding what services are in Rails and knowing when to use them will let you do some really powerful abstraction in your application’s codebase. Let us see how we can do this magic by looking at an example.

### The reusable API service

Suppose that you are building a Twitter client and you need to use the official Twitter APIs. You have several different functionalities that the user is capable of doing, like posting a tweet, deleting a tweet, liking a certain tweet etc. You might want to achieve these from inside your controller actions, as the user interacts with your application.

We can do something like this 

```ruby
def create
  # Handle tweet creation here
  response = HTTParty.post("https://api.twitter.com/1.1/statuses/update", tweet)
  if(response.status.code === "success")
    render status: :ok, json: { notice: "Tweet published!" }
  else
    render status: :unprocessable_entity, json: { error: response.error }
  end
end
```

Now suppose you want to open a tweet and show more information about it. We can do a GET request, preferably inside a `show` action in our controller. (Here the response object would look something like [this](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-show-id#example-response))

```ruby
def show
  response = HTTParty.get("https://api.twitter.com/1.1/statuses/show/#{params[:id]}")
  if(response.status.code === "success")
    render status: :ok, json: { tweet: response }
  else
    render status: :unprocessable_entity, json: { error: response.error }
  end
end
```

Note that in the while sending requests to the API with HTTParty, the only variable is the endpoint or the path of the API, and whatever type of request we are sending, like POST to create a tweet or a GET to show a tweet.

One way to DRY up this code and make your codebase more tight is to refactor the Twitter API calls into a service class.

## How to effectively use services

Services are ruby classes that go under `app/services/`. Services are used to accomodate business logic that doesn’t really belong elsewhere. Let us take a look at how adding a service can optimize the code that we just saw, by moving all the Twitter API related logic into a different class.

```ruby
# frozen_string_literal: true

class TwitterAPIService
  attr_accessor :response

  def initialize(path, access_token, method = :get)
    @base_url = "https://api.twitter.com/1.1/"
    @uri = @base_url + path
    @access_token = OpenStruct.new(access_token)
    @method = method
  end

  def proccess
    load_response
  end

  private

    def load_response
      headers = {
        "Authorization" => ENV["TWITTER_API_TOKEN"],
        "Accept" => "application/json",
        "Content-Type" => "application/json"
      }
      @response = HTTParty.get(@uri, headers: headers)
      @response.body
    end
end
```

Notice how this TwitterAPIService class is a template for an API call to any endpoint. Since the base url is the same for all the actions we need to perform with this certain API, we are only getting the endpoint path from the user, and hence increasing the reusability and readability of the code.

Also note that we are declaring `response` as an instance variable of the class with `attr_accessor :response`. In the `load_response` method, we are returning the body of the response and this will be returned whenever we call the process method. Let us see it in action now.

```ruby
def show
  # Handle tweet creation here
  tweetService = TwitterAPIService.new(path: "/statuses/#{params[:id]}")
  response = tweetService.process
  if(response.status.code === "success")
    render status: :ok, json: { response: response }
  else
    render status: :unprocessable_entity, json: { error: response.error }
  end
end
```

Notice that here we only had to pass the endpoint of the API and everything else is taken care of by the service class that we wrote. This makes it easier to debug and modify the Twitter API calls throughout the entire application. Suppose you are getting an error with the way you sent the request. In our earlier example, we would’ve had to debug and change the code in all the places where we were calling the API manually with HTTParty. Now we just have to do it in one place, the service class. Updating the method, say like changing the base path, is also a lot simpler now. Note that I have only shown the case for sending GET requests in the service class. 

__As an exercise try changing the above service code to accomodate all types of requests and take the method from the user.__

## Other uses of services

As I mentioned earlier, you can use services to abstract out anything you feel doesn't belong in the controllers or models. One example for using a service would be to seed sample data in the database. You might want to do some processing before seeding data into the database - You can do that from a service and call this service in your setup rake task. Another example would be creating a service to handle temporary cache data, by having the service deal with all the operations like storing and retrieving values from redis and calling the service from wherever you need to access these operations.
## Services vs Concerns

As a beginner, you might feel confused between services and concerns, when to use them and where to use which. Remember that services are essentially reusable pieces of code, while concerns are aspects of a model file which are abstracted into separate files. Concerns are what you call a [mixin](https://en.wikipedia.org/wiki/Mixin). You can use a concern when there is shared functionality that you want across various models. Once defined, we can include the concern in each of the required models to include the methods defined in the concern. For example if you are defining functions regarding authorization in two different controllers, you can move the authorization code into a concern and then include the concern in both the required controllers to achieve the same effect. This makes it easier if you ever want to debug or edit the authorization logic.

If concerns are used to include code in multiple different classes like controllers/models etc., why not just add everything to the `ApplicationController` or the `ApplicationRecord` file and call `before_action` on each of them? Why we use concerns the way we do is also because we can modularise the code and make each concern do one thing, making the `ApplicationController` cleaner and thinner in this case. It also makes debugging code easier.

Services on the other hand are classes that can be instantiated wherever they are needed, as we discussed earlier.

This post is only meant to give you a bird's eye view of the concept of services and is in no way a step by step guide that you can follow along. However you will find it useful once you have an idea about what is possible in Rails and how we can do things. You might even start thinking in terms of these conventions once you have enough practice building larger Rails applications.

Here are a few sources for some extra reading on this topic:
1. [Rails Service Objects: A Comprehensive Guide - Toptal Blog](https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial)
2. [Refactoring Your Rails App With Service Objects - Honebadger Blog](https://www.honeybadger.io/blog/refactor-ruby-rails-service-object/)
3. [Rails Concerns: To Concern Or Not To Concern - AppSignal Blogg](https://blog.appsignal.com/2020/09/16/rails-concers-to-concern-or-not-to-concern.html)