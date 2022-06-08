### Education: Scholarship & Mentorship

## Mentorship

- **Method**: POST, GET, DELETE, PUT
- **Path**: /api/education/mentorship, /api/education/mentorship/{mentorship_id}

Input:

```json
{
"username": str,
"job_title": str,
"location": str,
"description": str,
"availability": str,
"booked": bool,
"email": str
}
```

Output:

```json
{
"id": int,
"username": str,
"job_title": str,
"location": str,
"description": str,
"availability": str,
"booked": bool,
"email": str
}
```

- POST/GET /education/mentorship - gets a list of all offerings for mentorship.
  Post creates a new offering for mentorship to users.
- GET /education/mentorship/mentorship_id - gets a specific mentorship id.
- DELETE a mentorship - able to delete a mentorship from the database.
- UPDATE a mentorship.

## Scholarship

- **Method**: POST, GET, DELETE, PUT
- **Path**: /api/education/scholarship, /api/education/scholarship/{scholarship_id}

Input:

```json
{
"name": str,
"location": str,
"description": str,
"organization": str,
"organization_url": str
}
```

Output:

```json
{
"name": str,
"location": str,
"description": str,
"organization": str,
"organization_url": str
}
```

- POST/GET /education/scholarship - gets a list of all available scholarships. Post creates a new scholarship instance.
- GET /education/scholarship/scholarship_id - gets a specific scholarship.
- DELETE a scholarship - able to delete a scholarship from the database.
- UPDATE a scholarship - update a scholarship based on id.

## Jobs

- **Method**: `GET`, `DELETE`, `PUT`,
- **Path**: /api/Jobs, /api/Jobs/{job_id}

Input:

```json
{
    "job_id" : int

}
```

Output:

```json
{
    "job_id" : int,
    "company_name" : string,
    "company_type"  : string ,
    "email" : string,
    "location" : string ,
    "job_type" : string ,
    "salary" : int ,
    "qualifications" : string ,
    "date_posted" : Int
}
```

- GET uses the incoming job id to query the data for the job post. Then, it saves the name, city, company type, email, location, job type, salary, qualifcations to database. It returns all of the data with the new database id. We plan on using a third party api to get job board information.
- DELETE an Job - able to delete an Job from database
- UPDATE an Job - Update an Job

## User

- **Method**: `POST`,`GET`, `DELETE`, `PUT`
- **Path**: /api/user, /api/user/{user_id}

Input:

```json
{
    "id" : int,
    "username" : string,
    "email"  : string ,
    "fullname" : string,
    "location" : string ,
    "role" : string ,
    "photo" : string
}
```

Output:

```json
{
    "id" : int,
    "username" : string,
    "password" : string,
    "email"  : string ,
    "fullname" : string,
    "location" : string ,
    "role" : string ,
    "photo" : string
}
```

- POST creates a new User uses the incoming json
  data to create a entry into the database that saves the name, username, password, email, fullname, location, role and photo. It returns all of the data with the new database id.
- GET retrieves incoming data from the database about the users/user that already exist in the database.
- DELETE an User - able to delete an User from database
- UPDATE an User - Update an User

## Location

- **Method**: GET
- **Path**: /api/location

Input:

```json
{
    "city": str,
    "state":str
}
```

Output:

```json
{
    "city": str,
    "state":str
}
```

GET - this allows people get the location.

## Events

- **Method**: POST, GET, DELETE, PUT
- **Path**: /api/events, /api/events/{event_id}
  Input:

```json
{
    "name": str,
    "location": str,
    "dates": int,
    "description": str,
    "event_url": str

}
```

Output:

```json
{
    "id": int,
    "name": str,
    "location": str,
    "dates": int,
    "description": str,
    "photo_url": str,
    "event_url": str
}
```

- POST/GET events/an event - gets incoming data from third party event API(possibly eventbrite) to query events and show a list of events. Also gets event by id and shows event details. Then, it saves the name, location, dates, description, and event url to the database and returns it with a new database id.
- DELETE an event - able to delete an event from database
- UPDATE an event - update an event

## Company Reviews

- **Method**: POST, GET, DELETE, PUT
- **Path**: /api/reviews, /api/reviews/{company_id}

Input:

```json
{
    "company_name": str,
    "years_employed": int,
    "salary": int,
    "benefits": str,
    "role": str,
    "location": str,
    "rating": int,
    "review": str
    }
```

Output:

```json
{   "id": int,
    "company_name": str,
    "years_employed": int,
    "salary": int,
    "benefits": str,
    "role": str,
    "location": str,
    "rating": int,
    "review": str
}
```

- POST a review - uses the incoming company name, employment duration, salary, benefits, role, location, rating, and review data to create a new review. Then it saves that data to the database and returns it with a new database id.
- GET company reviews - shows a list of all reviews for a specific company
- DELETE a review - able to delete a review
- UPDATE a review - update a review

## Forum Post

- **Method**: POST, GET, DELETE, PUT
- **Path**: /api/posts/, /api/post/{post_id}

Input:

```json
{
    "title": str,
    "text": str,
    "author": str,

}
```

Output:

```json
{
    "title": str,
    "text": str,
    "datetime": int,
    "author": str,
    "upvoters": list
}
```

POST/GET/forum - this displays and allows authorized users to post a title and text, and the author (which can be anonymous). When there is a post, there is an automated datetime stamp that is displayed.
DELETE a forum post - able to delete an forum post from database
UPDATE a forum post - update an forum post

## Forum Comment

- **Method**: POST, GET, DELETE, PUT
- **Path**: /api/post/{post_id}/comments, /api/post/{post_id}/comment{comment_id}

Input:

```json
{
    "text": str,
    "post_id": int,
    "commenter": str,
}
```

Output:

```json
{
    "text": str,
    "post_id": int,
    "datetime": int,
    "commenter": str,
    "upvoters": list
}
```

POST/GET/forum - this displays and allows authorized users to post a comment on a post, and the author (which can be anonymous). When there is a comment, there is an automated datetime stamp.
DELETE a post comment - able to delete an forum post from database
UPDATE a post comment - update an forum post

## Forum Post Upvote

- **Method**: POST, DELETE
- **Path**: /api/posts/{post_id}/upvote

Input:

```json
{
    "user_id": int,
    "post_id": int,
}
```

Output:

```json
{
    "user_id": int,
    "post_id": int,
}
```

POST/forum - users can click to upvote on a post, which will add to the upvote counter.
DELETE a forum comment - able to delete upvote from database

## Forum Comment Upvote

- **Method**: POST, DELETE
- **Path**: /api/comments/{comment_id}

Input:

```json
{
    "user_id": int,
    "comment_id": int,
}
```

Output:

```json
{
    "user_id": int,
    "comment_id": int,
}
```

POST/forum - this allows people to upvote a comment related to a specific post, which helps the most popular rise to the top. Users will click to add an upvote to the counter
DELETE a forum comment upvote- able to delete an upvote from database
