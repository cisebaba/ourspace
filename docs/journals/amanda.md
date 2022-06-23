# June 22, 2022
Today I worked on:
* Actually getting the profile pollers to work, profile unit tests, and profile React components for the frontend.

We realized this morning that the profile pollers were in fact not actually working correctly. I definitely should have tested more robustly last night. But, the power of teamwork prevailed! Cise, Rachael, and I got the event and mentorship pollers working to pull data into the accounts microservice to use in the user profile. We also worked through getting some unit tests to work in the accounts service. Last, we were able to build React components that show the polled data on the user's profile page. It's not the prettiest page, but it's exciting that it does all work!

My aha moment today was learning more about the different ways we can use conditional statements within React components. Although things can work with more verbose for/of JavaScript logic with loops, it was amazing to learn that we were able to achieve the same result by using filter and map on one line. 

# June 21, 2022
Today I worked on:
* Refactoring the mentorship backend, creating unit tests, and debugging the account/mentorship poller.

Refactoring the mentorship backend to help make things more appropriate for unit testing ended up being a lot more difficult and time consuming than I had imagined. I split out the code that queries the database to be in a separate file from the API endpoints. This made the unit tests easier to write, although they were difficult to get working, especially with the APIs being behind an authentication layer. Later in the day, our group came together to discuss some of the frontend design decisions to be made. Last, I worked on debugging the poller file that polls mentorship data into the accounts microservice. For this, I made some changes to the YAML file, the API endpoint that was being called, and added pyscopg to the requirements file in the account service. This part ended up not being too bad to figure out. 

My aha today was learning a lot more about the arrange, act, and assert process for constructing unit tests. I felt a little silly to realize that one of my tests was returning a set of data, rather than a true dictionary with key-value pairs that was expected. 

# June 17, 2022
Today I worked on:
* I added a success message that displays when a user signs up for a mentorship. I also worked on putting the list and form components onto the same page. 

I think the mentor page is starting to come together. The page now shows both the form and the list on one page, which helps de-clutter the navigation a little bit. I also added a success message alert that shows when a mentee signs up for a mentorship. This was super exciting to get working! I also modified the SQL statement for my GET endpoint, so now only the available mentorships that don't yet have a mentee display on the page. 

My aha today was getting the success alert to display properly by utilizing state with the success message component. I also learned more about using the ternary operator to show or hide a component based on its state.

# June 16, 2022
Today I worked on:
* I finished the create form in React for the mentorship microservice. I also worked on the button functionality in the mentorship listings, to give the user the ability to sign up for an available offering. 

The create a new mentorship form was fairly easy to implement and went a lot quicker than I expected! However, updating a mentorship instance when someone clicks the "Sign up" button ended up being a lot harder to implement than I thought. Mitch again helped me with debugging this part and with fixing some additional issues with how I was using the pydantic base model within the PUT request. 

My aha today was realizing that anchor tag href links default to being a GET request. I needed to change the anchor tag on my mentor list page into a button, and then needed to create a function to use with "onClick" that handles the PUT request upon clicking the button. Whenever I think I'm getting more comfortable with pydantic, FastAPI, and React, I end up learning that there is still so much more that I have to learn about these. 

# June 15, 2022
Today I worked on:
* Mitch helped me de-bug an issue with the PUT request in the mentorship service. I also got the frontend React portion working for showing the list of available mentorship opportunities. 

With help from Mitch, I was able to figure out a few issues with my pydantic base models. First, I learned that these do not need to reflect every column in the database! I also learned how to import and use Union from the typing module so a value can be returned with either a string or a value of None. Thanks, Mitch! I was also pleased with how easy it was for me to create the React functional component for the list of mentorships. Now I just need to get the button working for this and we'll be golden. 

My aha today was definitely in bolstering my understanding of how to properly use pydantic base models. I won't lie, I kind of miss using Django!

# June 10, 2022
Today I worked on:
* Me and Rachael walked each other through the updates we've made over the last few days in the forum microservice and the mentorship microservice, and worked on getting the forum microservice hooked in with the account authorization piece. 

First, we worked through an issue with POSTing new comments through the React frontend. The issue ended up being a typo! This was a good exercise in debugging. Next, I walked her through the changes we made in the mentorship microservice to require users to be authenticated. We made similar changes in the forum section so that part also now requires users to be authorized before being able to see the list of forum posts. Last, we also worked on updating the SQL queries in the mentorship service so the mentor username appears when someone makes a new post to offer mentor services. We hit an issue with the PUT request that still needs to be worked out. 

I am continuing to learn more about React hooks as well as user authentication. My aha was realizing how simple the change was to the SQL queries to get the username. I thought this was going to be way harder to accomplish than it was!


# June 9, 2022
Today I worked on:
* Cise and I worked on the PUT and DELETE endpoints for the mentorship microservice and determined our plan for hooking in the user information with this microservice. 

We learned a ton today about authentication and how the bearer token is made available when users are authenticated. We started setting up our mentorship front end with help from Curtis and Shawn. We have it so that a user must be logged in first to access this section of the website. We still need to add the username into our SQL query on the backend but I think we are in good shape with this service. 

My aha moment was learning more about the bearer token and how the user data gets passed around. I also had a small aha when making our PUT request work, in the way the SQL statement needed to be to work. 


# June 8, 2022
Today I worked on:
* We met as a full group to review the authentication branch and talk about how to implement it with the other parts of our application.

After reviewing the code to better understand the user authentication FastAPI endpoints, we had a lot of discussion about how the user database should be organized within the larger app. We realized that technically, our services were constructed as a monolith because our tables were all within the same database! We split out most of our tables into separate databases so they are now true microservices. Afterwards, Rachael, Cise, and I worked on the accounts microservice and got the GET and POST requests working with our new user database. 

My aha moment today was realizing that we had actually built a monolith for our services! I definitely have a better understanding now on what defines a true microservice. It was really exciting to see all of our new databases and tables in pgAdmin. I also feel like I understand the code in the accounts microservice a little better now in terms of how it is handling the session, token, and user info. 


# June 7, 2022
Today I worked on:
* Cise and I worked on the backend for the mentorship microservice today and last night. 

We got the new service spun up in Docker, created our PostgreSQL table schema, and got our GET and POST requests working with FastAPI. I had some issues with Docker today that we had to overcome, but we still managed to get a lot done! We still need to handle the PUT and DELETE requests and do a bit of frontend work, and then the mentorship microservice will be in a good state for our MVP. 

My aha moment today was learning how much issues with Docker can slow down progress! That really halted things. But besides that, getting the POST request working with our database was super exciting. I am learning a lot more about FastAPI and some of the pros and cons of using it vs. Django.


# June 6, 2022
Today I worked on:
* We stayed in the same pairs to complete the microservices that we were working on. Rachael and I continued working on the Jobs backend and frontend. 

We finished the Jobs API backend by updating the amount of time our poller ran and adding a URL field to our database schema. We got our FastAPI request to return the right data in the right shape upon making a GET request. We also worked on the React frontend for this service and got all of our jobs data from our database to display nicely in a list of cards using Bootstrap. Afterwards, we synced back up with the larger group to work on an issue with a POST request in the events microservice. We got this piece working with some outside help.

It was fun working more with React hooks within functional components! My aha moment today was learning how careful we need to be when using nested data structures within React functional components. This was much harder to work with than I realized!


# June 3, 2022
Today I worked on:
* Our team kept the same pairs today since both teams were mid-stream with working on each respective microservice. Rachael and I continued to work on the back-end for the Jobs microservice.

We updated our jobs table schema after learning that not all of the data coming from our 3rd party API was in the same shape. We set up pg-admin to have a nice GUI for viewing our tables and schema. We implemented the psycopg3 Python module to sync data from our API to our database. We also worked on setting up FastAPI to retrieve data from the data base when a GET request is made. This part is not fully returning the data in the right shape, but I think we are close to being successful with this. 

Overall, I learned a lot today about using psycopg, FastAPI, and pg-admin! It was really exciting to see the jobs data being populated in the database in the way that we wanted.


# June 2, 2022

Today I worked on:
* I paired with Rachael today on the Jobs microservice. We initially started working on the React front-end, but determined that we needed to re-think the way the backend was handling jobs API data. 

We set up a PostgreSQL RDBMS and created our table for jobs data. We also worked on the React front-end for jobs and worked on creating a functional component with hooks. 

I actually had several aha moments today. I learned a lot about the different ways that environment variables are set, and how they need to be imported in different ways into Python and JavaScript files. I learned more about polling APIs for 3rd party data and the impact that query limits has! Last, I learned how to set up and initialize the PostgreSQL database! This was a big win.


# June 1, 2022

Today I worked on: 
* We used a random pair generator to determine our pairs for programming today. Cise, Starr, and I started working on the backend for the Events microservice.

We finished writing the models for the Events microservice and started working on the RESTful APIs. We ran into some issues when deciding how to approach handling the city and state data for locations: whether to use a 3rd party API to ingest the data vs. having users input their own city location as a string. 

Takeaways or lessons learned from today are: Agree upon our definition of the MVP. We need to find away to not get so bogged down in small details and push forward to have working software initially. I also learned a lot about the different considerations for where data is stored - whether it's in our database, the front end, or an outside data source. 


# May 31, 2022

Today I worked on: 
* Revising overall file tree, deciding the final App name and making changes accordingly in the GitLab project settings, and started building the Events microservice with the dev team.

As a group, we voted on the list of App names we had brainstormed and we landed on: OurSpace. We also came to a consensus on using the Events microservice on our starting point and getting the Django project and app set up for building that out. We worked on the docker-compose YAML file and created and successfully ran our Docker image. We discussed our next steps and organizing our group into pairs (one 2-person and one 3-person pair, to start). Last, we updated our GitLab project name and settings based on our final app name. 

It was a big win to get the Docker containers orchestrated correctly. I learned more today about the process for creating a React app from scratch and how to hook it into Docker. 


## May 27, 2022

Today I worked on: 
* Reviewing and implementing project feedback with the dev team.

As a group, we discussed and documented the overall system architecture of our app. 
We revised several of our data models and API endpoints. 
We also began building the initial skeleton of our application and started building out
the docker compose YAML file. 

I realized today that seemingly simple concepts like "upvotes" can be a lot more
complex under the hood! I am glad we fleshed out our thinking around some of these
things, and really focused on agreeing upon a ubiquitous language for our problem
domain before going straight into writing code. I think this will benefit us as a team
as we move forward.