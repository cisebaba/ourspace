# from datetime import datetime
from fastapi import APIRouter, Response, status, Depends,HTTPException
import psycopg
from pydantic import BaseModel
from typing import List, Union
# from .users import User
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from poller import get_weather
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


class MentorshipVO(BaseModel):
    job_title: str
    description: str
    availability: str
    booked: bool
    mentor_username: str
    mentee_username: Union[str, None]

class EventsVo(BaseModel):
    name: str
    starts: int
    ends: int
    description:str
    location: dict

class ProfileIn(BaseModel):
    city: str
    state:str
    role: str

class ProfileOut(BaseModel):
    id: int
    city: str
    state:str
    role: str
    userid: int
    firstname:str | None
    lastname:str | None
    username: str


class ProfileWithWeatherOut(ProfileOut):
    weather:dict|None

class ErrorMessage(BaseModel):
    message: str

class Message(BaseModel):
    message: str



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
    response_model=ProfileWithWeatherOut,
    responses={
        404: {"model": ErrorMessage},
    },
)

def profile_list( bearer_token: str = Depends(oauth2_scheme)):
    #  print("bearer =>",bearer_token)
     if bearer_token is None:
         raise credentials_exception
     payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
     username = payload.get("sub")
     user = payload.get("user")
    #  print(user)
     with psycopg.connect("dbname=accounts user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                select p.id, p.city
                , p.state
                , p.role
                , users.id
                , users.firstname
                , users.lastname
                , users.username
                from profile p
                INNER JOIN users ON (users.id = p.userid)
                WHERE users.id = %s;
            """, [user["id"]]
            )
            
            row = cur.fetchone()
            weather = get_weather.get_weather_data(row[1], row[2])
            # print("WEATHER",weather)
            d = {
                "id": row[0],
                "city":row[1],
                "state": row[2],
                "role" : row[3],
                "userid":user["id"],
                "firstname":user["firstname"],
                "lastname":user["lastname"],
                "username":username,
                "weather": weather
            }
            # print(d)

            return d



@router.get(
    "/profile/mentorship/",
    response_model=list[MentorshipVO],
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
                d = {
                    "job_title":row[1],
                    "description": row[2],
                    "availability": row[3],
                    "mentor_username": row[4],
                    "mentee_username": row[5]
                }
                ds.append(d)
                print(ds)

            return ds


