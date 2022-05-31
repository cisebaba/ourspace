from fastapi import APIRouter, Response, status
from pydantic import BaseModel
import psycopg

router = APIRouter()

@router.get("/")
async def root():
    return {"message": "Hello World"}