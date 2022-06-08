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

# class JobList(BaseModel):
#     __root__: List[Job]



@router.post(
    "/api/mentorship/", 
    response_model = MentorshipOut,
    # responses={
    #     200: {"model": "Request ok"},
    #     500: {"model": "ErrorMessage"},
    # },
    )
def mentorship_post(mentorship: MentorshipIn):
    with psycopg.connect("dbname=ourspace user=ourspace") as conn:
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




# @router.post(
#     "/api/postgres/custom-games",
#     response_model=Union[CustomGameOut, ErrorMessage],
#     responses={
#         200: {"model": CustomGameOut},
#         500: {"model": ErrorMessage},
#     },
# )
# def create_custom_game(query=Depends(CustomGameQueries)):
#     rows = query.create()
#     return rows_to_custom_game(rows)


# @router.get(
#     "/api/postgres/custom-games/{custom_game_id}",
#     response_model=Union[CustomGameOut, ErrorMessage],
#     responses={
#         200: {"model": CustomGameOut},
#         404: {"model": ErrorMessage},
#     },
# )
# def create_custom_game(
#     custom_game_id: int,
#     response: Response,
#     query=Depends(CustomGameQueries),
# ):
#     rows = query.get_custom_game(custom_game_id)
#     if len(rows) == 0:
#         response.status_code = status.HTTP_404_NOT_FOUND
#         return {"message": "Custom game not found"}
#     return rows_to_custom_game(rows)
