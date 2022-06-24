from django.test import TestCase
from datetime import datetime
from django.test import Client
from events_app.models import Event


class BasicTest(TestCase):
    def test_setUp(self):
        self.event = Event.objects.create(
            name="EventList",
            starts=datetime(2000, 1, 1),
            ends=datetime(2000, 2, 1),
            description="Description",
        )

    def test_list(self):
        self.client = Client()

    def test_fields(self):
        event = Event()
        event.name = "Event"
        event.starts = datetime(2000, 1, 1)
        event.ends = datetime(2000, 2, 1)
        event.description = "Description"
        event.save()

        record = Event.objects.get(pk=event.id)
        self.assertEqual(record, event)
