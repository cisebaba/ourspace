import djwto.authentication as auth
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from events_app.models import Event, Location, State
from common.json import ModelEncoder


class LocationListEncoder(ModelEncoder):
    model = Location
    properties = ["name","picture_url", "id"]


class LocationDetailEncoder(ModelEncoder):
    model = Location
    properties = [
        "name",
        "city",
        "picture_url",
    ]

    def get_extra_data(self, o):
        return {"state": o.state.abbreviation}

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
        events = Event.objects.all()
        print(Event)
        return JsonResponse(
            {"events": events},
            encoder=EventDetailEncoder,
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

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_event(request, pk):
    if request.method == "GET":
        event = Event.objects.get(id=pk)
        return JsonResponse(
            event,
            encoder=EventDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Event.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "state" in content:
                state = State.objects.get(abbreviation=content["state"])
                content["state"] = state
        except State.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid state abbreviation"},
                status=400,
            )
        Event.objects.filter(id=pk).update(**content)
        event = Event.objects.get(id=pk)
        return JsonResponse(
            event,
            encoder=EventDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_locations(request):
    if request.method == "GET":
        locations = Location.objects.all()
        return JsonResponse(
            {"locations": locations},
            encoder=LocationListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            state = State.objects.get(abbreviation=content["state"])
            content["state"] = state
        except State.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid state abbreviation"},
                status=400,
            )

        # photo = get_photo(content["city"], content["state"].abbreviation)
        # content.update(photo)
        location = Location.objects.create(**content)
        return JsonResponse(
            location,
            encoder=LocationDetailEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_location(request, pk):
    if request.method == "GET":
        location = Location.objects.get(id=pk)
        return JsonResponse(
            location,
            encoder=LocationDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Location.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "state" in content:
                state = State.objects.get(abbreviation=content["state"])
                content["state"] = state
        except State.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid state abbreviation"},
                status=400,
            )
        Location.objects.filter(id=pk).update(**content)
        location = Location.objects.get(id=pk)
        return JsonResponse(
            location,
            encoder=LocationDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def api_list_states(request):
    states = State.objects.all()
    print(states)
    state_list=[]
    for state in states:
        state={
            "name":state.name,
            "abbreviation": state.abbreviation,
        }
        state_list.append(state)
    return JsonResponse({"states": state_list})


@auth.jwt_login_required
def protected_view(request):
    return JsonResponse({"payload": request.payload})
