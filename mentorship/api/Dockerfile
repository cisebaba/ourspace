FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY __init__.py __init__.py
COPY main.py main.py
COPY mentor_db.py mentor_db.py
COPY mentor_models.py mentor_models.py
COPY requirements.txt requirements.txt

# Copy all of the directories that contain your application
# code
COPY routers routers

RUN pip install -r requirements.txt
CMD uvicorn main:app --reload --host 0.0.0.0
