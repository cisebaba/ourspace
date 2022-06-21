# import os
# import sys
# import time
# import json
# import requests

# sys.path.append("")
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
# # django.setup()

# from profile import MentorshipVo

# def get_events():
#     response = requests.get("http://events:8000/api/events/")
#     content = json.loads(response.content)
#     print(content)
#     for event in content["events"]:
#         EventsVo.objects.update_or_create(
#             import_href=event["href"],
#             defaults={
#               "name": "OurSpace",
                # "starts": event["starts"],
                # "ends": event["ends"],
                # "description": event["description"],
                # "location": {
                #     "state": location["state"],
#             },
#         )

# def poll():
#     while True:
#         print('Service poller polling for data')
#         try:
#             # Write your polling logic, here
#             get_events()
#             # pass
#         except Exception as e:
#             print(e, file=sys.stderr)
#         time.sleep(60)


# if __name__ == "__main__":
#     poll()
