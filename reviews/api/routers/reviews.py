from datetime import datetime
from fastapi import APIRouter, Response, status
import psycopg
from pydantic import BaseModel
from typing import List


router = APIRouter()


# @router.post(
#     "/api/postgres/custom-games",
#     response_model=Union[CustomGameOut, ErrorMessage],
#     responses={
#         200: {"model": CustomGameOut},
#         500: {"model": ErrorMessage},
#     },
# )
# def create_custom_game(query=Depends(CustomGameQueries)):
#     rows = query.create()
#     return rows_to_custom_game(rows)


# @router.get(
#     "/api/postgres/custom-games/{custom_game_id}",
#     response_model=Union[CustomGameOut, ErrorMessage],
#     responses={
#         200: {"model": CustomGameOut},
#         404: {"model": ErrorMessage},
#     },
# )
# def create_custom_game(
#     custom_game_id: int,
#     response: Response,
#     query=Depends(CustomGameQueries),
# ):
#     rows = query.get_custom_game(custom_game_id)
#     if len(rows) == 0:
#         response.status_code = status.HTTP_404_NOT_FOUND
#         return {"message": "Custom game not found"}
#     return rows_to_custom_game(rows)
