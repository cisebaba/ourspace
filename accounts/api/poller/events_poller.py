import os
import sys
import time
import json
import requests


def get_events():
    response = requests.get("http://events:8000/api/events/")
    content = json.loads(response.content)
    print(content)
    for event in content["events"]:
        with psycopg.connect("dbname=accounts user=ourspace") as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO mentorshipVO (id, name,starts ,ends ,description ,location ,) 
                    VALUES (%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (id) DO UPDATE 
                    SET name = excluded.name, 
                        starts = excluded.starts,
                        ends=excluded.ends,
                        description=excluded.description,
                        location=excluded.location;
                    """, [event["id"], event["name"],event["starts"],event["ends"],event["description"],event["location"]["state"]]
                    )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            get_events()
            # pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
