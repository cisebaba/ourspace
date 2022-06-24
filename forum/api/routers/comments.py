from datetime import datetime
from fastapi import APIRouter, Response, status, Depends, HTTPException
import psycopg
from pydantic import BaseModel
from typing import List
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
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


class Comment(BaseModel):
    comment_id: int
    text: str
    created_on: datetime
    post_id: int
    commenter: str


class CommentIn(BaseModel):
    text: str


class CommentList(BaseModel):
    __root__: List[Comment]


class Message(BaseModel):
    message: str


router = APIRouter()


@router.get("/api/posts/{post_id}/comment/", response_model=CommentList)
def get_comments(
    post_id: int,
    bearer_token: str = Depends(oauth2_scheme),
):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    print(username)
    with psycopg.connect("dbname=forum user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT comment.comment_id, comment.text, comment.created_on, post.post_id, comment.commenter
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
                    "comment_id": row[0],
                    "text": row[1],
                    "created_on": row[2],
                    "post_id": row[3],
                    "commenter": str(row[4]),
                }

                ds.append(d)
            return ds


@router.post("/api/posts/{post_id}/comment/", response_model=Comment)
def new_comment(
    post_id: int,
    Comment: CommentIn,
    bearer_token: str = Depends(oauth2_scheme),
):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    print("COMMENT USERNAME", username)
    with psycopg.connect("dbname=forum user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO comment (comment_id, text, created_on, post_id, commenter)
                VALUES (DEFAULT, %s, CURRENT_TIMESTAMP, %s, %s)
                RETURNING comment_id, text, created_on, post_id, commenter
                """,
                [Comment.text, post_id, username],
            )
            conn.commit()

            new_comment = cur.fetchone()

            return {
                "comment_id": new_comment[0],
                "text": new_comment[1],
                "created_on": new_comment[2],
                "post_id": new_comment[3],
                "commenter": new_comment[4],
            }


# @router.delete(
#     "/api/posts/{post_id}/comment/",
#     response_model=Message,
#     responses={404: {"model": Message}},
# )
# def remove_comment(comment_id: int, response: Response):
#     with psycopg.connect("dbname=forum user=ourspace") as conn:
#         with conn.cursor() as cur:
#             try:
#                 cur.execute(
#                     """
#                     DELETE FROM comment
#                     WHERE comment_id = %s;
#                     """,
#                     [comment_id],
#                 )
#                 return {
#                     "message": "Success",
#                 }
#             except psycopg.errors.ForeignKeyViolation:
#                 response.status_code = status.HTTP_400_BAD_REQUEST
#                 return {
#                     "message": "Cannot delete mentorship",
#                 }
