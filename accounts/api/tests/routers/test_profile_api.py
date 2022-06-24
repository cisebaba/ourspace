from fastapi.testclient import TestClient
from main import app
from profile_db import ProfileQueries


client = TestClient(app)

bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaXNlYmFiYSIsInVzZXIiOnsiaWQiOjEsImVtYWlsIjoiY2lzZUBiYWJhLmNvbSIsImZpcnN0bmFtZSI6IkNpc2UiLCJsYXN0bmFtZSI6IkJhYmF0YXNpIn0sImlhdCI6MTY1NTkzMjQ4NSwiaXNzIjoib3VyLXNwYWNlIiwianRpIjoiYjNiMjQ5YTUtMTQ2Yi00ZTgyLWE5ZTEtNzJkNzkzZmZmODZmIn0.72Z115jlr4ro3BNzNpdtiWtLdwNe6Fzhj7RZGZ4Mbus"  # noqa


class EmptyProfileQueries:
    def get_profile(self, id):
        return None


class NormalProfileQueries:
    def get_profile(self, id):
        return {
            "id": 8,
            "city": "city",
            "state": "state",
            "role": "role",
            "userid": 1,
            "firstname": "firstname",
            "lastname": "lastname",
            "username": "username",
            "weather": {},
        }


def test_profile_exists():
    from profile_models import ProfileOut  # noqa


def test_get_profile_returns_404():
    # Arrange
    # Use the fake db
    app.dependency_overrides[ProfileQueries] = EmptyProfileQueries

    # Act
    # Make the request
    headers = {"authorization": f"Bearer {bearer_token}"}
    response = client.get("/api/profile/", headers=headers)

    # Assert
    # Assert that we got a 404
    assert response.status_code == 404

    # Clean up
    # Clear out the dependencies
    app.dependency_overrides = {}


def test_get_profile_returns_200():
    # Arrange
    app.dependency_overrides[ProfileQueries] = NormalProfileQueries

    # Act
    headers = {"authorization": f"Bearer {bearer_token}"}
    response = client.get("/api/profile/", headers=headers)
    d = response.json()

    # Assert
    assert response.status_code == 200
    assert d["id"] == 8
    assert d["city"] == "city"
    assert d["state"] == "state"
    assert d["role"] == "role"
    assert d["userid"] == 1
    assert d["firstname"] == "firstname"
    assert d["lastname"] == "lastname"
    assert d["username"] == "username"
    assert isinstance(d["weather"], dict)

    # Clean up
    app.dependency_overrides = {}
