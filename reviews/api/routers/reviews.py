from fastapi import APIRouter, Response, status, Depends, HTTPException
import psycopg
from pydantic import BaseModel
from typing import List
from fastapi.security import OAuth2PasswordBearer
import os
from jose import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)
router = APIRouter()
SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

router = APIRouter()


class Review(BaseModel):
    id: int
    company_name: str
    rating: int
    salary: int
    diversity: int
    balance: int
    parental_leave: int
    flexibility: int


class ReviewIn(BaseModel):
    company_name: str
    rating: int
    salary: int
    diversity: int
    balance: int
    parental_leave: int
    flexibility: int


class ReviewOut(BaseModel):
    company_name: str
    rating: int
    salary: int
    diversity: int
    balance: int
    parental_leave: int
    flexibility: int
    average_rating: int


class AverageOut(BaseModel):
    company_name: str
    average_rating: int
    salary_average: int
    diversity_average: int
    balance_average: int
    parental_leave_average: int
    flexibility_average: int


class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str


class ReviewList(BaseModel):
    __root__: List[AverageOut]


class ReviewQueries:
    def get_reviews_list(self):
        with psycopg.connect("dbname=reviews user=ourspace") as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT r.company_name
                        , ROUND(AVG(r.rating), 0) average_rating
                        , ROUND(AVG(r.salary), 0) salary_average
                        , ROUND(AVG(r.diversity), 0) diversity_average
                        , ROUND(AVG(r.balance), 0) balance_average
                        , ROUND(AVG(r.parental_leave), 0) parental_leave_average
                        , ROUND(AVG(r.flexibility), 0) flexibility_average
                    FROM reviews as r
                    GROUP BY r.company_name
                    """
                )

                ds = []
                for row in cur.fetchall():
                    d = {
                        "company_name": row[0],
                        "average_rating": row[1],
                        "salary_average": row[2],
                        "diversity_average": row[3],
                        "balance_average": row[4],
                        "parental_leave_average": row[5],
                        "flexibility_average": row[6],
                    }

                    ds.append(d)
                return ds


@router.post("/api/reviews/", response_model=Review)
def new_review(Review: ReviewIn, bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    with psycopg.connect("dbname=reviews user=ourspace") as conn:
        with conn.cursor() as cur:

            cur.execute(
                """
                INSERT INTO reviews (company_name, rating, salary, diversity,
                    balance, parental_leave, flexibility)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id, company_name, rating, salary, diversity,
                    balance, parental_leave, flexibility
                """,
                [
                    Review.company_name,
                    Review.rating,
                    Review.salary,
                    Review.diversity,
                    Review.balance,
                    Review.parental_leave,
                    Review.flexibility,
                ],
            )

            conn.commit()

            new_review = cur.fetchone()

            return {
                "id": new_review[0],
                "company_name": new_review[1],
                "rating": new_review[2],
                "salary": new_review[3],
                "diversity": new_review[4],
                "balance": new_review[5],
                "parental_leave": new_review[6],
                "flexibility": new_review[7],
            }


@router.get(
    "/api/reviews/",
    response_model=ReviewList | Message,
    responses={200: {"model": AverageOut}, 404: {"model": ErrorMessage}},
)
def reviews_list(response: Response, queries: ReviewQueries = Depends(ReviewQueries)):
    reviews = queries.get_reviews_list()
    if reviews is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "not found"}
    else:
        return reviews
