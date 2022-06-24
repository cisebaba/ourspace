FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY requirements.txt requirements.txt
COPY manage.py manage.py
COPY __init__.py __init__.py

# Copy the Django project and all Django apps
COPY events events
COPY events_app events_app
COPY common common
COPY city_state_data city_state_data

RUN pip install -r requirements.txt
RUN python manage.py collectstatic --no-input
CMD python manage.py migrate && gunicorn events.wsgi --bind 0.0.0.0:$PORT --log-file -