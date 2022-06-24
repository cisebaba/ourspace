FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY profile_db.py profile_db.py
COPY profile_models.py profile_models.py

# Copy all of the directories that contain your application
# code
COPY routers routers
COPY poller poller

RUN pip install -r requirements.txt
CMD uvicorn main:app --reload --host 0.0.0.0
