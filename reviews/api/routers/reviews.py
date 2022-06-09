from datetime import datetime
from fastapi import APIRouter, Response, status
import psycopg
from pydantic import BaseModel
from typing import List


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
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id, company_name, rating, salary, diversity, 
                    balance, parental_leave, flexibility
                """, 
                [Review.company_name,
                Review.rating, Review.salary,Review.diversity, Review.balance, Review.parental_leave, Review.flexibility]
            )

            conn.commit()
            
            new_review = cur.fetchone()

            return {
                "id": new_review[0],
                "company_name": new_review[1],
		        "rating": new_review[2],
		        "salary": new_review[3],
		        "diversity": new_review[4],
                "balance" : new_review[5],
                "parental_leave": new_review[6],
                "flexibility": new_review[7]
            }


@router.get("/api/reviews/", response_model = ReviewList)
def reviews_list():
    with psycopg.connect("dbname=reviews user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT r.id, r.company_name, r.rating, r.salary, r.diversity, 
                r.balance, r.parental_leave, r.flexibility
                FROM reviews as r
                """
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "id": row[0],
                    "company_name": row[1],
		            "rating": row[2],
		            "salary": row[3],
		            "diversity": row[4],
                    "balance" : row[5],
                    "parental_leave": row[6],
                    "flexibility": row[7]
                }

                ds.append(d)
            return ds
