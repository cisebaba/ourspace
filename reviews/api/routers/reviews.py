from datetime import datetime
from fastapi import APIRouter, Response, status
import psycopg
from pydantic import BaseModel
from typing import List


router = APIRouter()


class Review(BaseModel):
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



class ReviewList(BaseModel):
    __root__: List[Review]



router = APIRouter()


@router.post("/api/reviews/", response_model = Review)
def new_review(Review: ReviewIn):
    with psycopg.connect("dbname=reviews user=ourspace") as conn:
        with conn.cursor() as cur:
            
            cur.execute(
                """
                INSERT INTO reviews (company_name, rating, salary, diversity, 
                    balance, parental_leave, flexibility)
                VALUES (%s, INT, INT, INT, INT, INT, INT )
                RETURNING company_name, rating, salary, diversity, 
                    balance, parental_leave, flexibility
                """, 
                [Review.company_name, Review.rating, Review.salary,
                Review.diversity, Review.balance, Review.parental_leave,
                Review.flexibility]
            )

            conn.commit()
            
            new_review = cur.fetchall()

            return {
                "company_name": new_review[0],
		        "rating": new_review[1],
		        "salary": new_review[2],
		        "diversity": new_review[3],
                "balance" : new_review[4],
                "parental_leave": new_review[5],
                "flexibility": new_review[6]
            }


@router.get("/api/reviews/", response_model = ReviewList)
def posts_list(Review: ReviewIn):
    with psycopg.connect("dbname=reviews user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO reviews (company_name, rating, salary, diversity, 
                    balance, parental_leave, flexibility)
                VALUES ( %s, INT, 0, 0, 0, 0, 0 )
                RETURNING company_name, rating, salary, diversity, 
                    balance, parental_leave, flexibility
                """, [Review.company_name]
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "company_name": row[0],
		            "rating": row[1],
		            "salary": row[2],
		            "diversity": row[3],
                    "balance" : row[4],
                    "parental_leave": row[5],
                    "flexibility": row[6]
                }

                ds.append(d)
            return ds

# @router.get(
#     "/api/post/{post_id}", 
#     response_model=Post,
#     responses={404: {"model": Message}},
# )
# def get_post(post_id: int, response:Response):
#     with psycopg.connect() as conn:
#         with conn.cursor() as cur:
#             cur.execute(
#                 """
#                 SELECT post_id, title, text, created_on
#                 FROM post
#                 WHERE post_id = %s
#             """,
#                 [post_id],
#             )
#             row = cur.fetchone()
#             if row is None:
#                 response.status_code = status.HTTP_404_NOT_FOUND
#                 return {"message": "Review not found"}
#             detail = {
#                 "company_name": new_review[0],
# 		        "rating": new_review[1],
# 		        "salary": new_review[2],
# 		        "diversity": new_review[3],
#                 "balance" : new_review[4],
#                 "parental_leave": new_review[5],
#                 "flexibility": new_review[6]
#             }
#             return detail


