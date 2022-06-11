from datetime import datetime
from fastapi import APIRouter, Response, status, Depends, HTTPException
import psycopg
from pydantic import BaseModel
from typing import List

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)
router = APIRouter()
SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"

credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

class Comment(BaseModel):
    comment_id: int
    text: str
    created_on: datetime
    post_id: int
    #add created_on later

class CommentIn(BaseModel):
    text: str

class CommentList(BaseModel):
    __root__: List[Comment]

router = APIRouter()

@router.get("/api/posts/{post_id}/comment/", response_model = CommentList)
def get_comments(post_id: int):
     with psycopg.connect("dbname=forum user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT comment.comment_id, comment.text, comment.created_on, post.post_id
                FROM post
                INNER JOIN comment
                ON (comment.post_id = post.post_id)
                WHERE post.post_id = %s
                """,
                [post_id],
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "comment_id":row[0],
                    "text":row[1],
                    "created_on":row[2],
                    "post_id":row[3],
                }

                ds.append(d)
            return ds

@router.post("/api/posts/{post_id}/comment/", response_model = Comment)
def new_comment(post_id: int, Comment: CommentIn):
     with psycopg.connect("dbname=forum user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO comment (comment_id, text, created_on, post_id)
                VALUES (DEFAULT, %s, CURRENT_TIMESTAMP, %s)
                RETURNING comment_id, text, created_on, post_id
                """,
                [Comment.text, post_id]
            )
            conn.commit()

            new_comment = cur.fetchone()

            return {
                "comment_id": new_comment[0],
                "text": new_comment[1],
                "created_on": new_comment[2],
                "post_id": new_comment[3]
            }
            