from datetime import datetime
from fastapi import APIRouter, Response, status
import psycopg
from pydantic import BaseModel
from typing import List


router = APIRouter()


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
def mentorship_list():
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
                    SET job_title, description, availability, booked = %s, %s, %s, %s
                    WHERE id = %s;
                """,
                    [mentorship.job_title, mentorship.description, mentorship.availability, mentorship.booked, mentorship_id],
                )
            except Exception as e:
                return e

            conn.commit()
    #getting not a valid dict error on put 
            
            return get_mentorship(mentorship_id)
            




