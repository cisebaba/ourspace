from datetime import datetime
from fastapi import APIRouter, Response, status
import psycopg
from pydantic import BaseModel
from typing import List

class PostOut(BaseModel):
    post_id: int
    title: str
    text: str
    created_on: datetime
    # upvotes
    # author 

class PostIn(BaseModel):
    title: str
    text: str

class PostList(BaseModel):
    __root__: List[PostOut]

router = APIRouter()

@router.get("/api/posts/", response_model = PostList)
def posts_list():
    with psycopg.connect("dbname=ourspace user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT post_id, title, text, created_on
                FROM post
                """,
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "post_id":row[0],
                    "title":row[1],
                    "text":row[2],
                    "created_on":row[3]
                }

                ds.append(d)
            return ds