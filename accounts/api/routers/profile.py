from datetime import datetime
from fastapi import APIRouter, Response, status, Depends,HTTPException
import psycopg
from pydantic import BaseModel
from typing import List, Union
# from .users import User
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from poller import get_weather
import os
from jose import jwt
from profile_models import (
    MentorshipVO, 
    MentorshipList, 
    EventsVo,
    EventsList, 
    ProfileIn,
    ProfileOut,
    ProfileWithWeatherOut,
    ErrorMessage,
    Message
    )
from profile_db import ProfileQueries

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
    "/api/profile/new", 
    response_model = ProfileOut,
    responses={
        500: {"model": ErrorMessage},
    },
    )
def profile_post(profile: ProfileIn,bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
         raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    user = payload.get("user")
    with psycopg.connect("dbname=accounts user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    INSERT INTO profile (city, state, role, userid)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, city, state, role, userid
                    """,
                    [profile.city, profile.state, profile.role, user["id"]],
                )
            except psycopg.errors.UniqueViolation:
                response.status_code = status.HTTP_409_CONFLICT
                return {
                    "message": "Could not create duplicate profile post",
                }
            row = cur.fetchone()
            record = {
                "firstname": user["firstname"],
                "lastname":user["lastname"], 
                "username": username
                }

            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record


@router.get(
    "/api/profile/",
    response_model=ProfileWithWeatherOut | Message,
    responses={
        200: {"model": ProfileWithWeatherOut},
        404: {"model": ErrorMessage},
    },
)

def profile_list(response:Response, query=Depends(ProfileQueries), bearer_token: str = Depends(oauth2_scheme)):
     if bearer_token is None:
         raise credentials_exception
     payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
     username = payload.get("sub")
     user = payload.get("user")
     id = user["id"]
     row = query.get_profile(id)
     if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile weather not found"}
     print(row, "row")
     return row



@router.get(
    "/profile/mentorship/",
    response_model=MentorshipList,
    responses={
        404: {"model": ErrorMessage},
    },
)
def mentor_list():
     with psycopg.connect("dbname=accounts user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT m.id, m.job_title, m.description, m.availability, 
                    m.mentor_username, m.mentee_username
                FROM mentorshipVO m
            """
            )

            ds = []
            for row in cur.fetchall():
                print(row)
                d = {
                    "job_title":row[1],
                    "description": row[2],
                    "availability": row[3],
                    "mentor_username": row[4],
                    "mentee_username": row[5]
                }
                ds.append(d)
            return ds

@router.get(
    "/profile/events/",
    response_model=EventsList,
    responses={
        404: {"model": ErrorMessage},
    },
)
def events_list():
     with psycopg.connect("dbname=accounts user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT e.href, e.name, e.starts, e.ends, 
                    e.description, e.location
                FROM eventsVO e
            """
            )

            ds = []
            for row in cur.fetchall():
                d = {
                    "href":row[0],
                    "name":row[1],
                    "starts": row[2],
                    "ends": row[3],
                    "description": row[4],
                    "location": row[5]
                }
                ds.append(d)

            return ds


