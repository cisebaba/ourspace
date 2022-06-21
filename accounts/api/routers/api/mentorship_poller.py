import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
# django.setup()

from profile import MentorshipVo

def get_mentorship():
    response = requests.get("http://mentorship:8000/api/mentorship/")
    content = json.loads(response.content)
    print(content)
    for mentor in content["mentorship"]:
        MentorshipVo.objects.update_or_create(
            import_href=mentor["href"],
            defaults={
                "job_title":mentor["job_title"],
                "description": mentor["description"],
                "availability": mentor["availability"],
                "booked": mentor["booked"],
                "mentor_username": mentor["mentor_username"],
                "mentee_username": mentor["mentee_username"]
            },
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            get_mentorship()
            # pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
