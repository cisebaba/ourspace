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


# def test_read_main():
#     response = client.get("/")
#     assert response.status_code == 200
#     assert response.json() == {"msg": "Hello World"}
bearer_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb2RnZSIsInVzZXIiOnsiaWQiOjMsImVtYWlsIjoiZG9kZ2VAZG9nLmNvbSIsImZpcnN0bmFtZSI6ImRvZGdlIiwibGFzdG5hbWUiOiJzY2hsb3MifSwiaWF0IjoxNjU1ODMzMzY1LCJpc3MiOiJvdXItc3BhY2UiLCJqdGkiOiI3ZWFkZDE3OC04MWE0LTRkMWItODZjMi02YTE0OGJiZGM2YzQifQ.qPHQFlmeOpNxYhHVziDevOaIpXym1AEuaCWPr5duozI"

class EmptyPostQueries:
    def get_post(self, username, post_id):
        return None

class NormalPostQueries:
    def posts_lists(self, id, bearer_token):
        return [id, "Our Post!", True]

def test_posts_lists_returns_404():
    #ARRANGE
    #Use our fake database
    app.dependency_overrides[PostQueries]= EmptyPostQueries

#set headers for request/bearer token
    headers = {"authorization": bearer_token}
    response = client.get("/api/posts/1/", headers=headers)

    #ASSERT
    #Assert that we got a 404
    assert response.status_code == 404

    #clean up
    app.dependency_overrides = {}