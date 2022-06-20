from datetime import datetime
from fastapi import APIRouter, Response, status, Depends, HTTPException
import psycopg
from pydantic import BaseModel
from typing import List, Union
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

class MentorshipIn(BaseModel):
    job_title: str
    description: str
    availability: str
    #booked: bool


class MentorshipOut(BaseModel):
    id: int
    job_title: str
    description: str
    availability: str
    booked: bool
    mentor_username: str
    mentee_username: Union[str, None]


class MentorshipList(BaseModel):
    __root__: List[MentorshipOut]


class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str


@router.post(
    "/api/mentorship/", 
    response_model = MentorshipOut,
    responses={
        500: {"model": ErrorMessage},
    },
    )
def mentorship_post(mentorship: MentorshipIn, bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    INSERT INTO mentorship (job_title, description, availability, booked, mentor_username, mentee_username)
                    VALUES (%s, %s, %s, false, %s, null)
                    RETURNING id, job_title, description, availability, booked, mentor_username, mentee_username
                    """,
                    [mentorship.job_title, mentorship.description, mentorship.availability, username],
                )
            except psycopg.errors.UniqueViolation:
                response.status_code = status.HTTP_409_CONFLICT
                return {
                    "message": "Could not create duplicate mentorship post",
                }
            row = cur.fetchone()
            record = {}
            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record



@router.get(
    "/api/mentorship/",
    response_model=MentorshipList,
    responses={
        404: {"model": ErrorMessage},
    },
)

def mentor_list(bearer_token: str = Depends(oauth2_scheme)):
     if bearer_token is None:
         raise credentials_exception

     with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT m.id, m.job_title, m.description, m.availability, m.booked, 
                    m.mentor_username, m.mentee_username
                FROM mentorship m
                WHERE m.mentee_username IS null
            """
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "id": row[0],
                    "job_title":row[1],
                    "description": row[2],
                    "availability": row[3],
                    "booked": row[4],
                    "mentor_username": row[5],
                    "mentee_username": row[6]
                }
                ds.append(d)

            return ds


@router.get(
    "/api/mentorship/{mentorship_id}",
    response_model=MentorshipOut,
    responses={404: {"model": ErrorMessage}},
)
def get_mentorship(mentorship_id: int, bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
        raise credentials_exception
    with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                f"""
                SELECT m.id, m.job_title, m.description, m.availability, m.booked,
                    m.mentor_username, m.mentee_username
                FROM mentorship m
                WHERE id = %s
            """,
                [mentorship_id],
            )
            row = cur.fetchone()
            if row is None:
                response.status_code = status.HTTP_404_NOT_FOUND
                return {"message": "Mentorship not found"}
            record = {
                "id": row[0],
                "job_title":row[1],
                "description": row[2],
                "availability": row[3],
                "booked": row[4],
                "mentor_username": str(row[5]),
                "mentee_username": str(row[6])
            }
            return record


@router.put(
    "/api/mentorship/{mentorship_id}",
    response_model=MentorshipOut,
    responses={404: {"model": ErrorMessage}},
)
def update_mentorship(mentorship_id: int, bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    UPDATE mentorship
                    SET mentee_username = %s
                    WHERE id = %s;
                """,
                    [username, mentorship_id],
                )
            except Exception as e:
                print("EXCEPTION", e)
                return e

            conn.commit()            
            return get_mentorship(mentorship_id)


@router.delete(
    "/api/mentorship/{mentorship_id}",
    response_model=Message,
    responses={404: {"model": ErrorMessage}},
)
def remove_mentorship(mentorship_id: int, response: Response):
    with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    DELETE FROM mentorship
                    WHERE id = %s;
                """,
                    [mentorship_id],
                )
                return {
                    "message": "Success",
                }
            except psycopg.errors.ForeignKeyViolation:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return {
                    "message": "Cannot delete mentorship",
                }
