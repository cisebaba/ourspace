from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

import json

from .models import Event
from common.json import ModelEncoder

class EventListEncoder(ModelEncoder):
    model = Event
    properties = ["name"]

class EventDetailEncoder(ModelEncoder):
    model = Event
    properties = [
        "name",
        "starts",
        "ends",
        "description",
        "created",
        "updated",
        "location",
    ]
    encoders = {
        "location": LocationListEncoder(),
    }

@require_http_methods(["GET","POST"])
def api_list_events(request):
    if request.method=="GET":
        events = Event.object.all()
        return JsonResponse(
            {"events": events},
            encoder=EventListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location = Location.objects.get(id=content["location"])
            content["location"] = location
        except Location.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        
        event = Event.objects.create(**content)
        return JsonResponse(
            event, 
            encoder=EventDetailEncoder, 
            safe=False, 
        )

def api_show_event(request,pk):
    event = Event.object.get(id=pk)
    return JsonResponse(
        {"event": event}, 
        encoder=EventDetailEncoder,
        safe=False,
        )




# # Create your views here.
# @require_http_methods(["GET", "POST"])
# def api_list_locations(request):
#     """
#     Lists the location names and the link to the location.

#     Returns a dictionary with a single key "locations" which
#     is a list of location names and URLS. Each entry in the list
#     is a dictionary that contains the name of the location and
#     the link to the location's information.

#     {
#         "locations": [
#             {
#                 "name": location's name,
#                 "href": URL to the location,
#             },
#             ...
#         ]
#     }
#     """
#     if request.method == "GET":
#         locations = Location.objects.all()
#         return JsonResponse(
#             {"locations": locations},
#             encoder=LocationListEncoder,
#         )
#     else:
#         content = json.loads(request.body)

#         try:
#             state = State.objects.get(abbreviation=content["state"])
#             content["state"] = state
#         except State.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid state abbreviation"},
#                 status=400,
#             )

#         photo = get_photo(content["city"], content["state"].abbreviation)
#         content.update(photo)
#         location = Location.objects.create(**content)
#         return JsonResponse(
#             location,
#             encoder=LocationDetailEncoder,
#             safe=False,
#         )