FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY requirements.txt requirements.txt
COPY poller.py poller.py

RUN pip install -r requirements.txt
CMD python poller.py
