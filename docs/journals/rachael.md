## note for next time-

apply Chris's first name/ last name/ honoriffic suggest.

## journal format

The date of the entry
A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small

## June 2, 2022

Amanda and I worked on connecting our .env file to parts of our app that needed it. We worked in a react a bit, and set up react-router-dom, but ultimately decided it would be best to reconfigure how we are polling our external api. We will change our poller.py to FastApi/psycopg with a postgreSQL database. We got our SQL table configured and ready for our external api job listing data.

We decided because of our limited number of daily calls allowed to our external api, we will store data in a PostgreSQL database, and make one call a day.

Yesterday I was totally anti-database for our external api and today it became very necessary!!

## June 1, 2022

Added Jobs directory, found external API for job listings, got keys, put keys in env to hide, made poller in jobs/poller.py, made jobs/dockerfile.dev that runs poller, refactored docker-compose.yml

We weren't sure how to poll without adding a back end, and with python requests it ended up being really easy! We didn't need a backend/fastapi/psycopg at all.

There are so many ways to do everything! And getting access to external api's are way more complicated than I originally realized.

## May 31, 2022

Today we configured our app's docker-compose.yml file, requirements and dockerfile and got our project hooked up to docker successfully. We decided to use Django for the events microservice. We also have an official name!

Curtis helped me understand to not just copy the example code we have been given and to be really intentional with the needs of our project.

My ah-ha is that a lot of this is more flexible than I realize. There are several ways to do things, and certain things like changing file structures down the rode are not as big of a deal as they might seem.

## May 27, 2022

Today our full team spent our project time applying feedback from Curtis and Chris to our data-model and apis. We established a stronger common language and vision.

We worked out the details of the Upvote model, as well as detailing foreign key relationships in our data-model.md more clearly. We decided to use both MongoDB and PostgreSQL. We discussed using FastAPI and React vs. Django.

I'm really happy we took the time to carefully consider the design and models. My ah-ha today was when Chris mentioned we might consider using both MongoDB and relational databases. I knew it was possible, but I didn't realize it might be optimal for a project of our scope- and I'm excited to use both.
