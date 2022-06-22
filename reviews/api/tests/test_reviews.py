from fastapi.testclient import TestClient
from main import app
from routers.reviews import Review, ReviewQueries, ReviewIn, ReviewOut, AverageOut

client = TestClient(app)

def test_review_exists():
    from routers.reviews import Review

def test_review_in_exists():
    from routers.reviews import ReviewIn

def test_review_out_exists():
    from routers.reviews import ReviewOut

def test_average_exists():
    from routers.reviews import AverageOut


class NormalReviewQueries:
    def reviews_list(self):
        return {
            "company_name": "google",
            "rating": 1,
            "salary": 100000,
            "diversity": 3,
            "balance": 4,
            "parental_leave": 2,
            "flexibility": 1,
        }

class EmptyReviewQueries:
    def reviews_list(self):
        return None




def test_reviews_list_returns_200():
    # ARRANGE
    app.dependency_overrides[ReviewQueries] = NormalReviewQueries

    # ACT
    response = client.get("/api/reviews/")
    d = response.json()

    # ASSERT
    assert response.status_code == 200
    assert d["company_name"] == "COMPANY NAME"
    assert d["rating"] == "RATING"
    assert d["salary"] == "SALARY"
    assert d["diversity"] == "DVIERSITY"
    assert d["balance"] == "BALANCE"
    assert d["parental_leave"] == "PARENTAL"
    assert d["flexibility"] == "FLEX"
    assert d["average_rating"] == "AVG"

    # CLEAN UP
    app.dependency_overrides = {}


# def test_reviews_list_returns_404():
#     # ARRANGE
#     # Use our fake database
#     app.dependency_overrides[ReviewQueries] = EmptyReviewQueries

#     # ACT
#     # Make the request
#     response = client.get("/api/reviews/")

#     # ASSERT
#     # Assert that we got a 404
#     assert response.status_code == 404

#     # CLEAN UP
#     # Clear out the dependencies
#     app.dependency_overrides = {}

# class EmptyMentorshipQueries:
#     def get_one_mentorship(self, id):
#         return None


# class NormalMentorshipQueries:
#     def get_one_mentorship(self, id):
#         return {
#             "id": 8, 
#             "job_title": "JOB TITLE", 
#             "description": "DESCRIPTION", 
#             "availability": "AVAILABILITY", 
#             "mentor_username": "MENTOR", 
#             "mentee_username": "MENTEE"
#         }

# def test_get_one_mentorship_returns_200():
#     #Arrange
#     app.dependency_overrides[MentorshipQueries] = NormalMentorshipQueries
    

#     #Act
#     headers = {"authorization": f"Bearer {bearer_token}"}
#     response = client.get("/api/mentorship/8", headers=headers)
#     d = response.json()

#     #Assert
#     assert response.status_code == 200
#     assert d["id"] == 8
#     assert d["job_title"] == "JOB TITLE"
#     assert d["description"] == "DESCRIPTION"
#     assert d["availability"] == "AVAILABILITY"
#     assert d["mentor_username"] == "MENTOR"
#     assert d["mentee_username"] == "MENTEE"

#     #Clean up
#     app.dependency_overrides = {}