## Events & Conferences

* **Method**: POST, GET, DELETE, PUT
* **Path**: /api/events, /api/events/{event_id}

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

POST/GET events/an event - gets incoming data from third party event API(possibly eventbrite) to query events and show a list of events. Also gets event by id and shows event details. Then, it saves the name, location, dates, description, and event url to the database and returns it with a new database id.
DELETE an event - able to delete an event from database
UPDATE an event - update an event



## Company Reviews

* **Method**: POST, GET, DELETE, PUT
* **Path**: /api/reviews, /api/reviews/{company_id}

Input:

```json
{
    "company_name": str,
    "employment_duration": int,
    "salary": int,
    "benefits": str,
    "role": str,
    "location": str,
    "ratings": int,
    "review": str

}
```

Output:

```json
{
    "id": int,
    "company_name": str,
    "employment_duration": int,
    "salary": int,
    "benefits": str,
    "role": str,
    "location": str,
    "ratings": int,
    "review": str
}
```

POST a review - uses the incoming company name, employment duration, salary, benefits, role, location, ratings, and review data to create a new review. Then it saves that data to the database and returns it with a new database id.
GET company reviews - shows a list of all reviews for a specific company
DELETE a review - able to delete a review
UPDATE a review - update a review