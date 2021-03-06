import time
import json
import requests
import sys
import os
from psycopg_pool import ConnectionPool

MENTORSHIP_API = os.environ["MENTORSHIP_API"]
EVENTS_API = os.environ["EVENTS_API"]
conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


def get_mentorship():
    response = requests.get(f"{MENTORSHIP_API}/api/mentorship_poller/")
    content = json.loads(response.content)
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM mentorshipVO
                """
            )
            for mentor in content:

                cur.execute(
                    """
                    INSERT INTO mentorshipVO
                        (id,
                         job_title,
                         description,
                         availability,
                         mentor_username,
                         mentee_username)
                    VALUES (%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (id) DO UPDATE
                    SET job_title = excluded.job_title,
                        description = excluded.description,
                        availability=excluded.availability,
                        mentor_username=excluded.mentor_username,
                        mentee_username=excluded.mentee_username;
                    """,
                    [
                        mentor["id"],
                        mentor["job_title"],
                        mentor["description"],
                        mentor["availability"],
                        mentor["mentor_username"],
                        mentor["mentee_username"],
                    ],
                )


def get_events():
    response = requests.get(f"{EVENTS_API}/api/events/")
    content = json.loads(response.content)
    with pool.connection() as conn:
        with conn.cursor() as cur:
            for event in content["events"]:
                cur.execute(
                    """
                    INSERT INTO eventsVO (
                        href,
                        name,
                        starts,
                        ends,
                        description,
                        location
                    )
                    VALUES (%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (href) DO UPDATE
                    SET name = excluded.name,
                        starts = excluded.starts,
                        ends=excluded.ends,
                        description=excluded.description,
                        location=excluded.location;
                    """,
                    [
                        event["href"],
                        event["name"],
                        event["starts"],
                        event["ends"],
                        event["description"],
                        event["location"]["state"],
                    ],
                )


def poll():
    while True:
        print("Mentorship poller polling for data")
        try:
            # Write your polling logic, here
            get_mentorship()
            get_events()
            # pass
        except Exception as e:
            import traceback

            print(e, file=sys.stderr)
            traceback.print_exc()
        time.sleep(10)


if __name__ == "__main__":
    poll()
