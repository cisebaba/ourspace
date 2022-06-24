import django
import os
import sys

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shelter_project.settings")
django.setup()
