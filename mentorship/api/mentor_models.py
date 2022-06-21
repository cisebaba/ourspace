from pydantic import BaseModel
from typing import List, Union


class MentorshipIn(BaseModel):
    job_title: str
    description: str
    availability: str


class MentorshipOut(BaseModel):
    id: int
    job_title: str
    description: str
    availability: str
    mentor_username: str
    mentee_username: Union[str, None]


class MentorshipList(BaseModel):
    __root__: List[MentorshipOut]


class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str