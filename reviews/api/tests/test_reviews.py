from fastapi.testclient import TestClient
from main import app
from routers.reviews import ReviewQueries

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
    def get_reviews_list(self):
        return [
            {
                "company_name": "google",
                "average_rating": 1,
                "salary_average": 100000,
                "diversity_average": 1,
                "balance_average": 2,
                "parental_leave_average": 2,
                "flexibility_average": 2,
            },
            {
                "company_name": "facebook",
                "average_rating": 2,
                "salary_average": 300000,
                "diversity_average": 4,
                "balance_average": 5,
                "parental_leave_average": 1,
                "flexibility_average": 3,
            },
        ]


class EmptyReviewQueries:
    def get_reviews_list(self):
        return None


def test_reviews_list_returns_200():
    # ARRANGE
    app.dependency_overrides[ReviewQueries] = NormalReviewQueries

    # ACT
    response = client.get("/api/reviews/")
    d = response.json()

    # ASSERT
    assert response.status_code == 200
    assert d[0]
    assert d[1]

    # CLEAN UP
    app.dependency_overrides = {}


def test_reviews_list_returns_404():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[ReviewQueries] = EmptyReviewQueries

    # ACT
    # Make the request
    response = client.get("/api/reviews/")

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 404

    # CLEAN UP
    # Clear out the dependencies
    app.dependency_overrides = {}
