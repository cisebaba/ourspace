import psycopg
import os
import sys
import time
import json
import requests


sys.path.append("")
ADZUNA_API_KEY = os.environ["ADZUNA_API_KEY"]
ADZUNA_APP_ID = os.environ["ADZUNA_APP_ID"]

print("I AM THE JOBS_DB FILE!")



#manual call to the adzuna external api in the command line. 
#will automate to call once a day later

def get_and_save_jobs():
    response = requests.get(f"https://api.adzuna.com/v1/api/jobs/us/search/1?app_id={ADZUNA_APP_ID}&app_key={ADZUNA_API_KEY}&results_per_page=25&what=software%20developer&max_days_old=30")
    content = json.loads(response.content)


    print("Once every six hours")
    jobs = content["results"]



    with psycopg.connect("dbname=jobs user=ourspace") as conn:
        with conn.cursor() as cur:
            for job in jobs:
                if len(job["location"]["area"])>=3:
                    cur.execute("""
                        INSERT INTO jobs (id, created, city, state, title, company, description, redirect_url)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (id) DO NOTHING;
                        """,
                        [job["id"], job["created"], job["location"]["area"][-1],
                        job["location"]["area"][1], job["title"], job["company"]["display_name"], job["description"], job["redirect_url"]]
                    )                           
                cur.execute("SELECT * FROM jobs")
            conn.commit()

def poll():
        while True:
            print('Service poller polling for data')
            try:
                print("trying")
                get_and_save_jobs()
                # Write your polling logic, here         
            except Exception as e:
                print("except")
                print(e, file=sys.stderr)
            time.sleep(21600)


if __name__ == "__main__":
    poll()
