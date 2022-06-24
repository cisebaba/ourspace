from django.db import models
from django.urls import reverse


class State(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=40)
    abbreviation = models.CharField(max_length=2, unique=True)

    def __str__(self):
        return f"{self.abbreviation}"

    class Meta:
        ordering = ("abbreviation",)


class Location(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=200)

    picture_url = models.URLField(
        default="https://media.discordapp.net/attachments/978448643956801637/982062871758401586/unknown.png?width=920&height=920"
    )

    state = models.ForeignKey(
        State,
        related_name="+",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_show_location", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)


class Event(models.Model):
    name = models.CharField(max_length=200)
    starts = models.DateTimeField()
    ends = models.DateTimeField()
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    location = models.ForeignKey(
        Location,
        related_name="events",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_show_event", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("starts", "name")
