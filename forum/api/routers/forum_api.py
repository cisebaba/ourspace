from datetime import datetime
from fastapi import APIRouter, Response, status
import psycopg
from pydantic import BaseModel
from typing import List


router = APIRouter()