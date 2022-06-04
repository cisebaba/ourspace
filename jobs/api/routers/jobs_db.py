import psycopg
import os
import sys
import time
import json
import requests

sys.path.append("")
ADZUNA_API_KEY = os.environ["ADZUNA_API_KEY"]
ADZUNA_APP_ID = os.environ["ADZUNA_APP_ID"]



#manual call to the adzuna external api in the command line. 
#will automate to call once a day later
response = requests.get(f"https://api.adzuna.com/v1/api/jobs/us/search/1?app_id={ADZUNA_APP_ID}&app_key={ADZUNA_API_KEY}&what=software&max_days_old=30&sort_by=date")
content = json.loads(response.content)



jobs = content["results"]


with psycopg.connect("dbname=ourspace user=ourspace") as conn:
    with conn.cursor() as cur:
        for job in jobs:
            try: 
                cur.execute("""
                    INSERT INTO jobs (id, created, city, state, title, company, description)
                    WHERE id NOT IN (SELECT id FROM jobs)
                    VALUES (%s, %s, %s, %s, %s, %s, %s);
                    """,
                    [job["id"], job["created"], job["location"]["area"][3],
                    job["location"]["area"][1], job["title"], job["company"]["display_name"], job["description"]]
                )
            except IndexError:
                cur.execute("""
                    INSERT INTO jobs (id, created, city, state, title, company, description) 
                    WHERE id NOT IN (SELECT id FROM jobs)
                    VALUES (%s, %s, %s, %s, %s, %s, %s);
                    """,
                    [job["id"], job["created"], job["location"]["area"][2],
                    job["location"]["area"][1], job["title"], job["company"]["display_name"], job["description"]]
                )

            cur.execute("SELECT * FROM jobs")

            conn.commit()