from datetime import datetime
from pydantic import BaseModel
from typing import List, Union

class MentorshipVO(BaseModel):
    job_title: str
    description: str
    availability: str
    mentor_username: str
    mentee_username: Union[str, None]

class MentorshipList(BaseModel):
    __root__: List[MentorshipVO]


class EventsVo(BaseModel):
    href:str
    name: str
    starts: datetime
    ends: datetime
    description:str
    location: str

class EventsList(BaseModel):
    __root__: List[EventsVo]

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