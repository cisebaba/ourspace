import os
import sys
import time
import json
import requests
import psycopg
# sys.path.append("")
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
# django.setup()


def get_mentorship():
    response = requests.get("http://mentorship:8000/api/mentorship_poller/")
    content = json.loads(response.content)
    for mentor in content["mentorship"]:
        with psycopg.connect("dbname=accounts user=ourspace") as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO mentorshipVO (id, job_title, description, availability, mentor_username, mentee_username) 
                    VALUES (%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (id) DO UPDATE 
                    SET job_title = excluded.job_title, 
                        description = excluded.description,
                        availability=excluded.availability,
                        mentor_username=excluded.mentor_username,
                        mentee_username=excluded.mentee_username;
                    """, [mentor["id"], mentor["job_title"],mentor["description"],mentor["availability"],mentor["mentor_username"],mentor["mentee_username"]]
                    )


def poll():
    while True:
        print('Mentorship poller polling for data')
        try:
            # Write your polling logic, here
            get_mentorship()
            # pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
