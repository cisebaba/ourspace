from datetime import datetime
from fastapi import APIRouter, Response, status
import psycopg
from pydantic import BaseModel

router = APIRouter()

class JobsOut(BaseModel):
    id: int
    created: datetime
    city: str
    state: str
    title: str
    company: str
    description: str

@router.get("/api/job/detail", response_model = JobsOut)
def jobs_list():
    with psycopg.connect("dbname=ourspace user=ourspace") as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, created, city, state, title, company, description
                FROM jobs
                LIMIT 100
                """,
            )

### NEED TO FIGURE OUT HOW TO RETURN A DICT. SOME ISSUE WITH MODELS ABOVE

            for row in cur.fetchall():
                print(row)
             

#created, city, state, title, company, description
