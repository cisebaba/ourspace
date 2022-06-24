from django.test import TestCase
from datetime import datetime
from django.test import Client
from events_app.models import Event, Location, State
from django.urls import reverse



class BasicTest(TestCase):

    def test_list(self):
        client = Client()
        response = client.get(reverse("api_list_events"))
        self.assertEquals(response.status_code, 200)


    def test_fields(self):
        event = Event()
        event.name = "Event"
        event.starts= datetime(2000,1,1)
        event.ends= datetime(2000,2,1)
        event.description = "Description"

        state = State.objects.create(id = 1, name = "Kansas", abbreviation = "KS")
        location = Location.objects.create(name ="A Place", city ="Austin", state = state)
        event.location = location
        event.save()
      
        record = Event.objects.get(pk=1)
        self.assertEqual(record, event)

    
