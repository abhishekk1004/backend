#!/bin/bash
set -e
cd backend

# Ensure staticfiles directory exists and collect static assets
mkdir -p staticfiles
python manage.py collectstatic --noinput

# Run migrations (safe to run on every boot)
python manage.py migrate --noinput

# Start gunicorn
gunicorn backend.wsgi --bind 0.0.0.0:$PORT --log-file -
