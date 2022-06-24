# import json
# import requests
# import os

# PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]
# LOCATION_API_KEY = os.environ["LOCATION_API_KEY"]


# def get_location(city, state):
#     headers = {"Authorization": LOCATION_API_KEY}
#     params = {
#         "per_page": 1,
#         "query": f"downtown {city} {state}",
#     }
#     url = "https://api.countrystatecity.in/v1/countries"
#     response = requests.get(url, params=params, headers=headers)
#     content = json.loads(response.content)
#     try:
#         return {"picture_url": content["photos"][0]["src"]["original"]}
#     except (KeyError, IndexError):
#         return {"picture_url": None}
