---
title: "How to deploy your Rails app using Capistrano"
summary: "Write automated deployment scripts for your Rails applications and manage multi-server deployments"
tags: ["ruby-on-rails","software-engineering","devops"]
draft: false
date: "2022-03-06"
---

This post is a part of the [Rails in Production](/blog/rails-in-production) series and aims to give a general introduction about devops with Rails. This post assumes that you have a basic working knowledge of how a Rails application works.

---

In this post we’ll be looking at how we can add [Capistrano](https://capistranorb.com) in your Rails projects to easily deploy your application in remote servers and manage multiple deployments of the same app in different servers.

## Add capistrano to the project

Add the following lines to Gemfile, under group :development do and run bundle install

```bash
gem 'capistrano',         require: false
gem 'capistrano-rbenv',   require: false
gem 'capistrano-rails',   require: false
gem 'capistrano-bundler', require: false
gem 'capistrano3-puma',   require: false
gem 'capistrano-yarn',    require: false
```

Now run 

```bash
bundle install
```

Now run 

```bash
cap install
```

This will “capify” our project and will generate a bunch of files for us.

```bash
├── Capfile
└── config
   ├── deploy
   │   ├── production.rb
   │   └── staging.rb
   └── deploy.rb
```

Let’s take a look at the files generated here. Capistrano will create a `Capfile`, along with a bunch of other config variables. The `Capfile` is where we can import different libraries which we might need to use in our deployment, like say using `capistrano-sidekiq` to restart the sidekiq server once we complete the deployment. 

Add the following to your `Capfile` 

```bash
require "capistrano/rails"
require "capistrano/bundler"
require "capistrano/rbenv"
require 'capistrano/puma'
require 'capistrano-yarn'

install_plugin Capistrano::Puma
install_plugin Capistrano::Puma::Systemd
```

Capistrano can be configured in two different ways. Notice that when we ran `cap install` it generated two sets of config files for us. These are the global and stage specific configs.

The `config/deploy.rb` is the global config file and the files under `config/deploy/` are the stage specific configuration files, like `config/deploy/production.rb` and `config/deploy/staging.rb`. You can read more about these config files and the variables you can configure in them at the capistrano documentation [here](https://capistranorb.com/documentation/getting-started/configuration/).

Let us configure our `config/deploy.rb` with some general settings now.

```ruby
# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

# Change these
set :repo_url,        'ssh url to your repo'
set :application,     'your project name'
set :user,            'username in the VM'
set :puma_threads,    [4, 16]
set :puma_workers,    0

set :default_env, {
  "PATH" => "/home/#{fetch(:user)}/.nvm/versions/node/v16.4.2/bin:$PATH"
}

# Don't change these unless you know what you're doing
set :pty,             true
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/apps/#{fetch(:application)}"
set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using ActiveRecord

set :puma_phased_restart, true
set :puma_enable_socket_service, true
set :puma_service_unit_name, "puma"

## Defaults:
set :branch,        :master
# set :format,        :pretty
set :log_level,     :debug
set :keep_releases, 5

## Linked Files & Directories (Default None):
set :linked_files, %w{config/database.yml config/master.key}
set :linked_dirs,  %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

append :rbenv_map_bins, "puma", "pumactl"

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/tmp/sockets -p"
      execute "mkdir #{shared_path}/tmp/pids -p"
    end
  end

  before :start, :make_dirs
end

namespace :deploy do
  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/master`
        puts "WARNING: HEAD is not the same as origin/master"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  before "deploy:compile_assets", "yarn:install"
  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end

# ps aux | grep puma    # Get puma pid
# kill -s SIGUSR2 pid   # Restart puma
# kill -s SIGTERM pid   # Stop puma
```

These are some general settings I’ve set in the main `deploy.rb` file. Now let us set the server details in our `deploy/production.rb` file

```ruby
set :rbenv_map_bins, %w{rake gem bundle ruby rails}

server "your server ip address",
  user: "username in vm",
  roles: %w{web app db},
  ssh_options: {
    forward_agent: true,
    auth_methods: %w(publickey)
  }
```

Notice how we only defined the server ip address in the `production.rb` file. We do it so that we can define a different ip address in a different stage specific file, like say `staging.rb`. So we can have the same application deployed with different settings in different environments, in different remote servers. Now if you run `cap staging deploy` it’ll deploy the staging app in the staging server you’ve defined, and if you run `cap production deploy`, you can deploy the production version of the app once you’ve tested everything in the staging environment. Cool, right?

After this step, you’ll need to copy two files into `home/username/apps/app_name/shared/config/` . These being your `config/database.yml` and your `config/master.key` files. You can try deploying your app without adding these files and you will get an error saying that these files are not present.

In this tutorial, we are deploying our application to the production environment. You can try deploying the same app into staging as well as an exercise. Add the above snippet in your `config/deploy/production.rb` and run `bundle exec cap production deploy` from your terminal.

You’ll get an error saying that `puma.service` is not found. After the deployment has been completed - that is after capistrano clones the latest state of the repository and creates a new release and creates the necessary symlinks, it will call `sudo systemctl restart puma.service` to restart the application server. Since we have not configured puma as a systemd service in our remote server, this step will fail for now. So let us create a new service in our server.

---

## Creating a systemd service for puma

You can see a list of all the systemd services at `/etc/systemd/system`. You can create a new file here and “define“ your service and how it should work. Let’s try creating a service for puma

```ruby
sudo vi puma.service
```

If you run this command from inside `/etc/systemd/system` it will create a new service file for you. Type the following into this file

```ruby
[Unit]
Description=Puma HTTP Server for devise_blog (production)
After=network.target

[Service]
Type=simple
User=your username
WorkingDirectory=/home/username/apps/your app name/current
ExecStart=/home/username/.rbenv/shims/puma -C /home/username/apps/your app name/shared/puma.rb
ExecReload=/bin/kill -TSTP $MAINPID
StandardOutput=append:/home/username/apps/your app name/current/log/puma.access.log
StandardError=append:/home/username/apps/your app name/current/log/puma.error.log
Restart=always
RestartSec=1
SyslogIdentifier=puma

[Install]
WantedBy=multi-user.target
```

After saving the file you can run the following to start the service

```ruby
sudo systemctl enable puma.service
sudo systemctl start puma.service
```

You can check the status of your service by running 

```ruby
sudo systemctl status puma.service
```

Once you’ve done all this, try deploying the application again. You should see that the puma service is automatically restarted at the end of the deployment pipeline.

Okay now that we have truly completed the deployment with capistrano without any errors, we can try visiting the ip address from the browser. If you had done all the nginx setup correctly, you’ll be shown a page that says “Welcome to nginx”. When we set up nginx initially, it creates the config for this default page to be shown when we visit our public IP. We can edit the default nginx config that was generated and make it so that it correctly points to our Rails app that is running in the server now.

Note: If you try running `ps -aef | grep puma` in the remote server, you will be able to get the details of the puma server process that is running in our server right now.

## Configuring nginx to point to the puma server

Now that we have set up nginx and saw that visiting our server IP address in the browser shows the nginx homepage, let’s configure nginx to point to our puma server, so that instead of the nginx homepage, we’ll be able to access our application when visiting the IP from a browser.

Go to `/etc/nginx/sites-enabled/`

You’ll be able to see a file named `default` in this lcoation. You can try running `cat` on this file to see its existing default content. We are going to edit this file now.

Run the following the command to edit this file

```bash
vi /etc/nginx/sites-enabled/default
```

Replace the contents of this file with the following. Note that you need to update the paths of the files in this with your username and project name. I have enclosed whatever you need to change in curly braces like `{username}` and `{your app name}` respectively.

```bash
upstream puma {
  server unix:///home/{username}/apps/{your app name}/shared/tmp/sockets/{your app name}-puma.sock;
}

server {
  server_name {your app name};

  root /home/{username}/apps/{your app name}/current/public;
  access_log /home/{username}/apps/{your app name}/current/log/nginx.access.log;
  error_log /home/{username}/apps/mysite/{your app name}/log/nginx.error.log info;

  location ^~ /assets/ {
    gzip_static on;
    expires max;
    add_header Cache-Control public;
  }

  try_files $uri/index.html $uri @puma;
  location @puma {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_set_header  X-Forwarded-Ssl on; # Optional
    proxy_set_header  X-Forwarded-Port $server_port;
    proxy_set_header  X-Forwarded-Host $host;

    proxy_redirect off;

    proxy_pass http://puma;
  }

  error_page 500 502 503 504 /500.html;
  client_max_body_size 100M;
  keepalive_timeout 10;
}
```

Once you’ve saved this file, run the following

```bash
sudo nginx -t
```

This is to test all the configurations. Since we’ve edited our config now, runnign this command will make sure that whatever config we have created is correct and there are no errors. If there are no errors, you’ll get a message saying so

```bash
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

Once you’ve got this message, we can restart the nginx service by running

```bash
sudo systemctl restart nginx
```

Now if you try visiting your ip address again you should be able to access your Rails application!

If you are getting a “We’re sorry, something went wrong” page from Rails, it might possibly be caused by a permission issue. Go through your puma logs in the server, which are inside `/home/username/apps/myapp/current/log`. If you’re getting an error like “Permission denied @ rb_sysopen - log/application.log (Errno::EACCES)”, you can resolve it in the following way.

You have to run the following command to resolve the permission issue

```bash
sudo chown username:username -R apps/your_app_name/
```

Once this has been run, restart the puma server manually for now by running `sudo systemctl restart puma` from the remote server and everything should be good to go!

If you have setup your server following the [last article](/blog/devops/server-setup) and deployed your application with Capistrano as per this post, you should technically have done everything you need to deploy a Rails application in a remote server. Congrats! But let's not stop here. In the [next post](/blog/devops/ansible) we'll look into how we can automate everything we did in these two posts by writing an Ansible playbook.