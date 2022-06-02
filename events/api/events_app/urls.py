from django.urls import path
from events_app.views import(
    api_list_events,
    api_show_event,
)

urlpatterns = [
    path("events/", api_list_events, name="api_list_events",),
    path("events/<int:pk>", api_show_event, name= "api_show_event")
]
