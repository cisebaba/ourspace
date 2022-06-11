from datetime import datetime
from fastapi import APIRouter, Response, status, Depends,HTTPException
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

class MentorshipIn(BaseModel):
    job_title: str
    description: str
    availability: str
    booked: bool


class MentorshipOut(BaseModel):
    id: int
    job_title: str
    description: str
    availability: str
    booked: bool
    # mentor_username: str
    # mentee_username: str


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
def mentorship_post(mentorship: MentorshipIn):
    with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    INSERT INTO mentorship (job_title, description, availability, booked)
                    VALUES (%s, %s, %s, false)
                    RETURNING id, job_title, description, availability, booked
                    """,
                    [mentorship.job_title, mentorship.description, mentorship.availability],
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

def mentor_list(bearer_token: str = Depends(oauth2_scheme),):
     print(bearer_token)
     if bearer_token is None:
         raise credentials_exception
     payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
     username = payload.get("sub")
     print(username)
     with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                select m.id, m.job_title, m.description, m.availability, m.booked
                from mentorship m
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
                }
                ds.append(d)

            return ds

@router.get(
    "/api/mentorship/{mentorship_id}",
    response_model=MentorshipOut,
    responses={404: {"model": ErrorMessage}},
)
def get_mentorship(mentorship_id: int):
    with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                f"""
                SELECT m.id, m.job_title, m.description, m.availability, m.booked
                FROM mentorship m
                WHERE id = %s
            """,
                [mentorship_id],
            )
            row = cur.fetchone()
            if row is None:
                response.status_code = status.HTTP_404_NOT_FOUND
                return {"message": "Mentorship not found"}
            record = {}
            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record

@router.put(
    "/api/mentorship/{mentorship_id}",
    response_model=MentorshipOut,
    responses={404: {"model": ErrorMessage}},
)
def update_mentorship(mentorship_id: int, mentorship: MentorshipIn, response: Response):
    with psycopg.connect("dbname=mentorship user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    UPDATE mentorship
                    SET job_title = %s, description = %s, availability = %s, booked = %s
                    WHERE id = %s;
                """,
                    [mentorship.job_title, mentorship.description, mentorship.availability, mentorship.booked, mentorship_id],
                )
            except Exception as e:
                return e

            conn.commit()
    #getting not a valid dict error on put 
            
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
                    "message": "Cannot delete category because it has clues",
                }
