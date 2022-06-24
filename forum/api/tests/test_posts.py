from fastapi import FastAPI, Response
from fastapi.testclient import TestClient
from main import app
from routers.posts import Post, PostQueries


client = TestClient(app)


def test_post_exists():
    from routers.posts import Post


def test_post_in_exists():
    from routers.posts import PostIn


def test_post_list_exists():
    from routers.posts import PostList


bearer_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb2RnZSIsInVzZXIiOnsiaWQiOjMsImVtYWlsIjoiZG9kZ2VAZG9nLmNvbSIsImZpcnN0bmFtZSI6ImRvZGdlIiwibGFzdG5hbWUiOiJzY2hsb3MifSwiaWF0IjoxNjU1ODMzMzY1LCJpc3MiOiJvdXItc3BhY2UiLCJqdGkiOiI3ZWFkZDE3OC04MWE0LTRkMWItODZjMi02YTE0OGJiZGM2YzQifQ.qPHQFlmeOpNxYhHVziDevOaIpXym1AEuaCWPr5duozI"
# made a permanent bearer_token by commenting out the expiration field of create_access_token in users.py
class EmptyPostQueries:
    def get_post(self, username, post_id):
        return None


class NormalPostQueries:
    def get_post(self, username, post_id):
        return {
            "post_id": 8,
            "title": "Our Post!",
            "text": "Text!",
            "created_on": "2022-06-16T21:56:24.485211",
            "author": "author!",
            "upvote_count": 3,
            "user_upvoted": 3,
        }


def test_get_post_returns_404():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[PostQueries] = EmptyPostQueries

    # set headers for request/bearer token
    headers = {"authorization": bearer_token}
    response = client.get("/api/posts/8/", headers=headers)

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 404

    # clean up
    app.dependency_overrides = {}


def test_get_post_returns_200():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[PostQueries] = NormalPostQueries

    headers = {"authorization": bearer_token}
    response = client.get("/api/posts/8", headers=headers)
    d = response.json()
    print(d, "dictionary!")

    assert response.status_code == 200
    assert d["post_id"] == 8
    assert d["title"] == "Our Post!"
    assert d["text"] == "Text!"
    assert d["created_on"] == "2022-06-16T21:56:24.485211"
    assert d["author"] == "author!"
    assert d["upvote_count"] == 3
    assert d["user_upvoted"] == 3

    # clean up
    app.dependency_overrieds = {}
