## June 10, 2022

Okay change of plans. Starr talked with Chris yesterday and he told us that it was best practice for us to handle our calculations of the ratings in the back-end instead of the front-end depending on the size of the database.

Taking care of the calculation in the back-end in a SQL query was much better and much more interesting than doing it in the front-end. Shawn helped us with setting up our SQL query and how to format it and use GROUP BY clauses. He also showed how helpful it is to practice running queries in pgadmin. I remember we learned about it awhile ago but actually using it to figure out how we're inputting and getting data from our schema was super helpful! I learned that whatever you have in SELECT, it needs to be in a GROUP BY clause UNLESS its in an aggregated function, which will be helpful to remember next time I write a SQL query. 


## June 9, 2022

I feel like we made a lot of progress today! Me and Starr are still working on the reviews microservice BUT we got the back-end to work! So the API endpoints for POST and GET are done. We also worked on the reviews front-end. The design we are trying to accomplish consist of a list and a form in one page. It was a little complicated so we decided to make a separate form and list file for now and refactor it later. We also included this cool star rating feature. It doesn't currently have functionality yet but it adds a little cool thing to our project! We also made the functions to be able to calculate the average rating for a review. We still need to be able to calculate all the reviews for a single company but we're getting closer. The API endpoint for GET wasn't working because the SQL query were setup as a POST request instead of GET. We got the POST endpoint working using %s for all the values, which we thought was interesting because they are set up as integers, but the only way it worked was as %s. It also saved in the database as an integer so that's good for now. 

POST AND GET ROUTERS DONE FOR REVIEWS
REVIEWS LIST PAGE W/ STAR RATING(NOT WORKING) DONE
REVIEWS FORM PAGE - 
NEED TO NEST TOGETHER FORM AND LIST ON ONE PAGE

## June 8, 2022

Today was a little different than the other days. We got our users authentication setup from Curtis so our entire group took some time to look through it together to understand it in depth. We also had a huge realization that all of our microservices were sharing the same database! So we split it all up so that every microservice has its own database to pull from. Then, me and Starr broke off into our own pair again and started working on the API endpoints for the reviews microservice. We ran into a few issues with a file not being found but once we figured that out, we were able to test our routers. We almost have our POST router working but the VALUES in the SQL query is giving us a hard time. We get errors about the type of value and we ran out of time today so we're going to continue tomorrow, but we are super close!!

To-do:
    Reviews:
        -Create front-end
        -Create FastAPI endpoints (POST, GET)

## June 7, 2022

Today, me and Starr grouped up to work on the company reviews microservice. We added the service to the docker yaml file, made a directory, and created a Dockerfile.dev for reviews. We created a table schema in our postgres database and got setup pgadmin for the reviews microservice! We haven't really touched the database so it was a great experience! We created a kind of DDD for the microservice before starting to actually dive in so that we can get a visual and get a roadmap of where we're going while building this microservice out. We had some issues with a git merge last night and it gave us an issue with our create event form which was working fine yesterday. But with the help from a SEIR, I created a temporary branch to test things out, which I've never done before and definitely think that that will come in handy in the future! We need to create our fastAPI API endpoints tomorrow and work on the react front-end for reviews. I think we're on a good track to MVP despite all the issues! I also created some issues on our GitLab issues board, which I'm getting more used to using.

To do:
Company reviews:
    DONE-Add to docker yaml
    DONE-Make directory
    DONE-Make dockerfile.dev
    -FASTAPI
    -make react front-end
    DONE-make sql database table for reviews
    DONE-setup pgadmin for reviews
    DONE-make excalidraw


## June 6, 2022

Today we officially finished back-end for the events microservice! We had some issues with the format of the data we wanted so we had to change one of our views but now it works and the back-end is officially done for that microservice!

We spent SO MUCH TIME on the front-end for our create event form today. But we did finish the form to create an event. I learned so much today about nesting data and flattening/formatting and unflattening/unformatting data! I think I was on the right track but reorganizing our data never came to my mind so when Curtis showed us that, it was really helpful and I think it will come in handy in the future. The other half of our team showed us how to make a table and their FastAPI views for the jobs microservice.

We spent the end of the day deciding what to do and how to spend the rest of our time on the project. We came up with a plan to split up the microservices and front-end for the microservices individually so we can get more work done.

## June 3, 2022

Today, we stayed with our same group (me, Cise, and Starr). Since we finished the back-end portion of the events microservice yesterday, our focus for today was front-end!

We created an event form and an events list page. We decided on not making an events detail page and just have it be able to expand when you want to see the details of an event. We also want to change the layout to a card layout instead of a table layout.

We were able to get the states dropdown list working on the event form!! I used React hooks today and learned so much about them and useState and useEffect. We were having some trouble trying to get the location data integrated with the events but with some instruction, we were able to figure it out. We also had an issue with a file that we no longer had but kept popping up as an error and the solution was just to rebuild our docker image! Our event form doesn't submit still, but we did great work on front-end today and will start working on that on Monday.

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