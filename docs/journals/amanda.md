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