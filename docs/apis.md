## Education: Scholarship & Mentorship

* **Method**: POST, GET, DELETE, PUT
* **Path**: /api/education/mentorship, /api/education/mentorship/{mentorship_id}

Input:

json
{
    "username": str,
    "job_title": str,
    "location": str,
    "description": str,
    "availability" str,
    "has_mentee": bool
}


Output:

json
{
    "id": int,
    "username": str,
    "job_title": str,
    "location": str,
    "description": str,
    "availability" str,
    "has_mentee": bool
}


POST/GET /education/mentorship - gets a list of all offerings for mentorship. 
Post creates a new offering for mentorship to users.
GET /education/mentorship/mentorship_id - gets a specific mentorship id
DELETE a mentorship - able to delete a mentorship from the database
UPDATE a mentorship. - update a mentorship. The has_mentee bool will be updated to True when the offered mentorship has a mentee.


* **Method**: POST, GET, DELETE, PUT
* **Path**: /api/education/scholarship, /api/education/scholarship/{scholarship_id}

Input:

json
{
    "name": str,
    "location": str,
    "description": str,
    "organization": str,
    "organization_url": str
}


Output:

json
{
    "name": str,
    "location": str,
    "description": str,
    "organization": str,
    "organization_url": str
}


POST/GET /education/scholarship - gets a list of all available scholarships. Post creates a new scholarship instance.
GET /education/scholarship/scholarship_id - gets a specific scholarship
DELETE a scholarship - able to delete a scholarship from the database.
UPDATE a scholarship - update a scholarship