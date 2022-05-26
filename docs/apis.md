## Create a new Job

* **Method**: `POST`
* **Path**: /api/Jobs

Input:

```json
{
"Company Name" : string, 
"location" : string,
"Date Posted" : Int 
}
```

Output:

```json
{
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

Creating a new Job uses the incoming company name and location
data to query the data for the job post. Then, it saves the name, city, company type, email, location, job type, salary, qualifcations to database. It returns all of the data
with the new database id.