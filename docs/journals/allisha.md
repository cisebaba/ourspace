## June 2, 2022

Today, our team switched around some group members. I worked on the events microservice today with Starr and Cise. We were having some issues with parsing for location city and state data. We had some instruction that really helped us and taught us about implementing json data. Instead of using an external API for location data, we decided to create our own json file filled with location data to use for our events microservice. We were having a bit of trouble with the formatting of the data but eventually figured it out.

We learned how to use the manage.py loaddata command to load our data from the json file into our microservice and have it actually parse data from there. Once we got that working, we started to think about whether we should include city data right now or hold off on it. 

We were able to successfully finish the events microservice back-end - models, views, and urls! We were able to GET, POST, PUT, AND DELETE locations and location details, as well as events and event details! We decided to not use an external API for event data right now and just have a post feature. We also decided on having a default picture set when creating an event if a user doesn't upload a picture url, but if they do, they're uploaded picture does display instead of the default picture. 

## June 1, 2022

Our team used a random generator to split up teams and distribute the tasks for today. We worked on dividing up tasks for the day, with one group ( Rachael and I ) working on the jobs microservice and one group (Starr, Cise, and Amanda) working on the events microservice. 

I added to our google docs sheet a couple of things that we need to implement into our project at some point, such as continuous integration and continuous deployment (CI / CD) and creating unit tests. We had some issues with git merging and GitLab and got help from instructors to set up branches in GitLab. 

Rachael and I looked for a jobs listing API that was quite difficult to find but eventually found a good one from Adzuna. We were able to get an API key and an app ID to access the API. We took turns sharing our screens and coding. I found out that this API didn't need a token especially one that doesn't expire every hour which is great! We added the jobs service to the docker yaml file and created a Docker dev file for jobs microservice. We wrote a poller to access the Adzuna API job listings and added the url to our poller with specific queries. Our dev team came together at the end of the day to talk about our progress for today and make a list of plans for tomorrow, which I added to our google doc.

Notes through project realtime:

Accessed Adzuna job api - struggles

1. done - add to docker yaml file for jobs
2. done - create jobs microservice 
3. done - write poller?


## May 31, 2022

Today, we worked together to decide on the name OurSpace for our application! We worked together on building and setting up the docker yaml file. We created a django project and app for our events microservice. We created our react app for the front-end of our application. We moved some files around such as moving the journals directory to the docs directory for better tree structure and to make our files cleaner. We updated our project name and path url on GitLab. It was a bit confusing and took a lot more effort to build the yaml file and get docker setup than I thought it would, but we eventually got it to work!

## May 27, 2022

Today, I worked on:

* Worked together on revising our docs files

Worked together on the software architecture of our app. Fixed our apis and data models based on the feedback we received. We started working on the initial skeleton of the docker yaml file.

I realized that the "upvotes" feature, although seemingly simple, requires much more complex thoughts and processes.