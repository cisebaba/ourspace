# from datetime import datetime
from fastapi import APIRouter, Response, status, Depends,HTTPException
import psycopg
from pydantic import BaseModel
from typing import List
from .users import User
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

class ProfileIn(BaseModel):
    firstname: str
    lastname: str
    city: str
    state:str
    role: str

class ProfileOut(BaseModel):
    id: int
    firstname: str
    lastname: str
    city: str
    state:str
    role: str
    userid: User

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
def profile_post(profile: ProfileOut,bearer_token: str = Depends(oauth2_scheme)):
    if bearer_token is None:
         raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub")
    with psycopg.connect("dbname=accounts user=ourspace") as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    INSERT INTO profile (city, state, role)
                    VALUES (%s, %s, %s)
                    RETURNING id, city, state, role
                    """,
                    [profile.city, profile.state, profile.role],
                )
            except psycopg.errors.UniqueViolation:
                response.status_code = status.HTTP_409_CONFLICT
                return {
                    "message": "Could not create duplicate profile post",
                }
            row = cur.fetchone()
            record = {}
            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record


@router.get(
    "/api/profile/",
    response_model=ProfileOut,
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
     with psycopg.connect("dbname=accounts user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                select p.id, p.city, p.state, p.role
                from profile p
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
