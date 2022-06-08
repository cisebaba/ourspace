from django.urls import path
from events_app.views import(
    api_list_events,
    api_show_event,
    api_list_locations,
    api_show_location,
    api_list_states,
    protected_view,
)

urlpatterns = [
    path("events/", api_list_events, name="api_list_events",),
    path("events/<int:pk>", api_show_event, name= "api_show_event"),
    path("states/", api_list_states, name="api_list_states"),
    path("location/<int:pk>", api_show_location, name= "api_show_location"),
    path("locations/", api_list_locations, name="api_list_locations"),

    # TODO: Delete this
    path("protected_view/", protected_view, name="protected_view"),
]
