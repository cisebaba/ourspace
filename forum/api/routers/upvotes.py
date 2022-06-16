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

class PostUpvote(BaseModel):
    post_upvote_id: int
    post_id: int
    upvoter: str

class CommentUpvote(BaseModel):
    comment_upvote_id: int
    comment_id: int
    upvoter: str

class ErrorMessage(BaseModel):
    message: str

class Message(BaseModel):
    message: str


#POST UPVOTES

@router.post("/api/posts/{post_id}/upvote/", response_model = PostUpvote)
def upvote(post_id: int, bearer_token: str = Depends(oauth2_scheme)):
    print("bearer token",bearer_token)
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    print("USERNAME", username)
    with psycopg.connect("dbname=forum user=ourspace") as conn:
        with conn.cursor() as cur:

            cur.execute(
                """
                INSERT INTO post_upvote(post_upvote_id, post_id, upvoter)
                VALUES (DEFAULT, %s, %s)
                RETURNING post_upvote_id, post_id, upvoter
                """,
                [post_id, username]
            )
            conn.commit()

            upvote = cur.fetchone()

            return {
                "post_upvote_id": upvote[0],
                "post_id": upvote[1],
                "upvoter": upvote[2],
            }

@router.delete(
    "/api/posts/{post_id}/upvote/", 
    response_model=Message, 
    responses={404: {"model": ErrorMessage}},
)
def remove_upvote(post_id: int, response: Response, bearer_token: str = Depends(oauth2_scheme)):
    print("bearer token",bearer_token)
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    print("USERNAME", username)
    with psycopg.connect("dbname=forum user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    DELETE FROM post_upvote
                    WHERE post_id = %s
                    AND upvoter = %s;  
                    """,
                    [post_id, username]
                )
                return {
                        "message": "Success",
                }
            except psycopg.errors.ForeignKeyViolation:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return {
                    "message": "Cannot delete category because it has clues",
                }

