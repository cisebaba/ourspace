from fastapi.testclient import TestClient
from main import app
from mentor_db import MentorshipQueries


client = TestClient(app)

bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsInVzZXIiOnsiaWQiOjEsImVtYWlsIjoidXNlcjFAZW1haWwuY29tIiwiZmlyc3RuYW1lIjoiZmlyc3QiLCJsYXN0bmFtZSI6Imxhc3QifSwiaWF0IjoxNjU1ODQ1OTU1LCJpc3MiOiJvdXItc3BhY2UiLCJqdGkiOiIxZGMwMTMwMi1lZjViLTRjOGItYjBmNC04OWJiMmE1YjcxYmYifQ.Bi_H7RH1rPHt4YU6g5x31yKRnprVLIHYQObRL0Ueyns"


class EmptyMentorshipQueries:
    def get_one_mentorship(self, id):
        return None


class NormalMentorshipQueries:
    def get_one_mentorship(self, id):
        return {
            "id": 8,
            "job_title": "JOB TITLE",
            "description": "DESCRIPTION",
            "availability": "AVAILABILITY",
            "mentor_username": "MENTOR",
            "mentee_username": "MENTEE"
        }


def test_mentorshipin_exists():
    from mentor_models import MentorshipIn


def test_get_one_mentorship_returns_404():
    #Arrange
    #Use the fake db
    app.dependency_overrides[MentorshipQueries] = EmptyMentorshipQueries

    #Act
    #Make the request
    headers = {"authorization": f"Bearer {bearer_token}"}
    response = client.get("/api/mentorship/1", headers=headers)

    #Assert
    #Assert that we got a 404
    assert response.status_code == 404

    #Clean up
    #Clear out the dependencies
    app.dependency_overrides = {}


def test_get_one_mentorship_returns_200():
    #Arrange
    app.dependency_overrides[MentorshipQueries] = NormalMentorshipQueries
    

    #Act
    headers = {"authorization": f"Bearer {bearer_token}"}
    response = client.get("/api/mentorship/8", headers=headers)
    d = response.json()

    #Assert
    assert response.status_code == 200
    assert d["id"] == 8
    assert d["job_title"] == "JOB TITLE"
    assert d["description"] == "DESCRIPTION"
    assert d["availability"] == "AVAILABILITY"
    assert d["mentor_username"] == "MENTOR"
    assert d["mentee_username"] == "MENTEE"

    #Clean up
    app.dependency_overrides = {}
