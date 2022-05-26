## Jobs

* **Method**:  `GET`, `DELETE`, `PUT`,
* **Path**: /api/Jobs, /api/Jobs/{job_id}

Input:

```json
{
"Job Id" : int 
}
```

Output:

```json
{
    "Job Id" : int,
    "Company Name" : string, 
    "Company Type"  : string ,
    "email" : string,
    "location" : string ,
    "Job Type " : string ,
    "Salary" : int ,
    "Qualification" : string ,
    "Date Posted" : Int 
}
```

GET uses the incoming job id to query the data for the job post. Then, it saves the name, city, company type, email, location, job type, salary, qualifcations to database. It returns all of the data
with the new database id. We plan on using a third party api to get job board information. 
DELETE an Job - able to delete an Job from database
UPDATE an Job - Update an Job

## User

* **Method**:  `POST`,`GET`, `DELETE`, `PUT`
* **Path**: /api/user, /api/user/{user_id}

Input:

```json
{
    "Id" : int,
    "Username" : string, 
    "email"  : string ,
    "Fullname" : string,
    "location" : string ,
    "Role " : string ,
    "Photo" : string
}
```

Output:

```json
{
    "Id" : int,
    "Username" : string, 
    "Password" : string,
    "email"  : string ,
    "Fullname" : string,
    "location" : string ,
    "Role " : string ,
    "Photo" : string

    
}
```
POST creates a new User uses the incoming json 
data to create a entry into the database that saves the name, username, password, email, fullname, location, role and photo.  It returns all of the data with the new database id.
GET retrieves incoming data from the database about the users/user that already exist in the database. 
DELETE an User - able to delete an User from database
UPDATE an User - Update an User