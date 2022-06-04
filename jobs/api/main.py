from fastapi import FastAPI
from routers import jobs_api

app = FastAPI()

app.include_router(jobs_api.router)
