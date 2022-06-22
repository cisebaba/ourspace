# from fastapi.testclient import TestClient
# from main import app
# from mentor_db import MentorshipQueries


# client = TestClient(app)

# bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMSIsInVzZXIiOnsiaWQiOjEsImVtYWlsIjoidXNlcjFAZW1haWwuY29tIiwiZmlyc3RuYW1lIjoiZmlyc3QiLCJsYXN0bmFtZSI6Imxhc3QifSwiaWF0IjoxNjU1ODMzNjI5LCJpc3MiOiJvdXItc3BhY2UiLCJqdGkiOiJmODc1Y2MyNi1kZGY4LTRiZDYtODkyMC03NDhlNDc5OTdkMWMifQ.bLKxkInMtQKmqy4kxWkr_XeGY9ikxbpCNsN4_xjXzP0"

# class EmptyProfileQueries:
#     def get_one_profile(self, id):
#         return None


# class ProfileQueries:
#     def get_profile(self, id):
#         return {
#             "id": 8,
#             "city":"city",
#             "state": "state",
#             "role" : "role",
#             "userid": 1,
#             "firstname": "firstname",
#             "lastname":"lastname",
#             "username":"username",
#             "weather": "weather"
#         }

# class NormalMentorshipQueries:
#     def get_one_mentorship(self, id):
#         return [id, "JOB TITLE", "DESCRIPTION", "AVAILABILITY", "MENTOR", "MENTEE"]


# class NormalProfileQueries:
#     def get_all_mentorships(self):
#         return [{1, "city", "state", "role", "1", "firstname", "lastname","username","weather" },
#          {2, "city_two", "state_two", "role_two", "2", "firstname_two", "lastname_two","username_two","weather_two""}]


# def test_get_profile_returns_404():
#     #Arrange
#     #Use the fake db
#     app.dependency_overrides[ProfileQueries] = EmptyProfileQueries

#     #Act
#     #Make the request
#     headers = {"authorization": f"Bearer {bearer_token}"}
#     response = client.get("/api/profile/1", headers=headers)

#     #Assert
#     #Assert that we got a 404
#     assert response.status_code == 404

#     #Clean up
#     #Clear out the dependencies
#     app.dependency_overrides = {}


# def test_get_profile_returns_200():
#     #Arrange
#     app.dependency_overrides[ProfileQueries] = NormalProfileQueries

#     #Act
#     response = client.get("/api/profile/1")
#     d = response.json()

#     #Assert
#     assert response.status_code == 200
#     assert d["id"] == 8
#     assert d["city"] == "city"
#     assert d["state"] == "state"
#     assert d["role"] == "role"
#     assert d["userid"] == 1
#     assert d["firstname"] == "firstname"
#     assert d["lastname"] == "lastname"
#     assert d["username"] == "username"
#     assert d["weather"] == "weather"


#     #Clean up
#     app.dependency_overrides = {}