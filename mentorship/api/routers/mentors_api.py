from datetime import datetime
from fastapi import APIRouter, Response, status, Depends, HTTPException
import psycopg
from fastapi.security import OAuth2PasswordBearer
import os
from jose import jwt
from mentor_models import (
    MentorshipIn, 
    MentorshipOut, 
    MentorshipList, 
    ErrorMessage, 
    Message
)
from mentor_db import MentorshipQueries


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)
router = APIRouter()
SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"

credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )


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
                    INSERT INTO mentorship (job_title, description, availability, mentor_username, mentee_username)
                    VALUES (%s, %s, %s, %s, null)
                    RETURNING id, job_title, description, availability, mentor_username, mentee_username
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


# Refactor Done
@router.get(
    "/api/mentorship/",
    response_model=MentorshipList,
    responses={
        404: {"model": ErrorMessage},
    },
)
def mentor_list(query=Depends(MentorshipQueries), bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
         raise credentials_exception
    rows = query.get_all_mentorships()
    return rows


# Refactor done
@router.get(
    "/api/mentorship/{mentorship_id}",
    response_model=MentorshipOut,
    responses={404: {"model": ErrorMessage}},
)
def get_mentorship(mentorship_id: int, query=Depends(MentorshipQueries), bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
        raise credentials_exception
    row = query.get_one_mentorship(mentorship_id)
    if row is None:
        Response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Mentorship not found"}
    return row


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
