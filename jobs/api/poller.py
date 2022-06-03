# import django
import os
import sys
import time
import json
import requests

sys.path.append("")
ADZUNA_API_KEY = os.environ["ADZUNA_API_KEY"]
ADZUNA_APP_ID = os.environ["ADZUNA_APP_ID"]
# django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something



# def get_jobs():
#     response = requests.get(f"https://api.adzuna.com/v1/api/jobs/us/search/1?app_id={ADZUNA_APP_ID}&app_key={ADZUNA_API_KEY}&what=software&max_days_old=30&sort_by=date")
#     content = json.loads(response.content)


def poll():
    while True:
        print('Service poller polling for data')
        try:
            # get_jobs()
            # Write your polling logic, here
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
