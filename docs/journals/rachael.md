## note for next time-

apply Chris's first name/ last name/ honoriffic suggest.

## journal format

The date of the entry
A list of features/issues that you worked on and who you worked with, if applicable
A reflection on any design conversations that you had
At least one ah-ha! moment that you had during your coding, however small

## June 21, 2022

Today, with a lot of help from Curtis, we got unit tests working and learned how to get around auth while doing them. It was really exciting to finally write soem tests and see them pass!

Cise is working on the profile page, which has a lot of complicated polling. We chatted about polling and saving to a database vs. handling things in the front end.

My ah-ha of the day is to try to be more patient when reading error messages. They really do tell you a ton of information if you can keep a cool head and take it one step at a time.

## June 17, 2022

Today I got the upvote working in react in the detail view and list view! Yay!

For design, I am going to try to reorginize the file structure of my react components and try to break some down into smaller pieces.

My ah-ha is that react is SO HARD. I don't have a great understanding of how different components render other components yet, but I am getting there. I also have been reminded that I can return a lot of information from a sql query but not need to put that info in the table.

## June 16, 2022

Today I started working on the front end for the upvote button. It is so much harder than I thought! I had to change some sql statements to return the upvote count, and figuring out setting state for the button to add an upvote was very tough.

For design, I am trying to figure out how to break apart different components and name and organize them in a logical way in react. I feel like the way things are named now is not very readable, but breaking down components is starting to feel better.

My ah-ha! is that I need a lot more react practice!

## June 15, 2022

Today I added upvoting post and delete api views! I also added a count for the post so you can see how many upvotes there are. Tomorrow I plan to implement the front end for this.

I decided to just display the sql query count of upvotes rather than store that data since it will be changing a lot. If for a stretch goal, we want to keep better track of exactly who upvoted on those posts when, I'll adjust this.

I really like working on this very small functionality. It's complicated even though it's so little!!

## June 13, 2022

Was able to add author/commentor fields to posts and comments and can now track the current user! Yay!

## June 11, 2022

Spent a bit connecting auth stuff to forum posts and comments. Ran into a lot of issues because of incomplete understanding of what needed to be included on the front end, but eventually got there. Insomnia post still being weird but works in react so oh well?

My ah-ha! is that when you make a change in react - sometimes exiting the browser and reloading helps make the change!!

## June 10, 2022

Today I worked on fixing the comment form- it's all set! It still needs a redirect though. Then Amanda kindly showed me what she learned about user auth stuff and how to add auth stuff to our api endpoints. We started adding that to forum and mentorship.

I heard from another team about their design decisions regarding where to perform average functions.

My ah-ha! is again, how crazy complex auth is!!

## June 9, 2022

Today I worked on adding comments and seeing lists of comments with posts in react. Curtis helped me with react and hooks and I learned a lot!

I made a lot of decisions about how many "components" to make and how small to break things down in react.

My ah ha! is that React is very circular and it is quite confusing at the moment, but I think eventually I'll really enjoy it.

## June 8, 2022

Today I worked on some react for forum posts. With Cise and Amanda, we finished the SQL queries for user login and sign up with help from Curtis.

We are wondering how to add profile information separate from login/auth, and thinking about what polling of user data is necessary.

My ah-ha! is: I can't believe how complicated authentication and login is!!

## June 7, 2022

Today I got the forum microservice connected to docker, built database tables for posts and comments, got fastapi endpoints set up for post get/post, and set up a very simplistic react front-end for post list and post form.

Design-wise we refined our mvp goals so we won't be crunched for time at the end.

My ah-ha was help from Mitch setting up the pydantic models so the post api endpoint would work.

## June 6, 2022

Amanda and I worked on automating our poller in jobs_db, and doing initial formatting on the list of jobs in react.

Our group as a whole discussed our strategy to use fastapi and postgreSQL going forward, and hopefully adding mongodb where it makes sense.

One "&" in Dockerfile.dev instead of "&&" allows 2 bash commands to run in parallel!

## June 4, 2022

Amanda and I separately worked on cleaning up the logic in the jobs_db and the jobs_api file. We got them both working! However, I still haven't figured out how to automate the poller with fastapi.

## June 3, 2022

Amanda and I built out our back end!! We stopped auto polling our external api every minute and are calling manually using python "requests" and the command line for now. We succesfully inserted that data into our sql database using psycopg, and set up PGAdmin to help see our data. We are beginning with FastAPI now.

Our decision to make a database for the external data seems to be working out! We were intentional about what data to store and what our plans are to "release"??? older data.

My ah-ha! is getting clarity on what fastapi and psycopg's capabilities are, and realizing you can combine them with other python tools like requests all in the same file. Learning so many things separately makes their compatibility seem like an ah-ha sometimes!

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
