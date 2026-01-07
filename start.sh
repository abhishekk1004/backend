#!/bin/bash
set -e
cd backend

# Ensure Pillow is present (Railway build cache can occasionally miss it)
python -m pip show Pillow >/dev/null 2>&1 || python -m pip install --no-cache-dir Pillow==11.0.0

# Ensure staticfiles directory exists and collect static assets
mkdir -p staticfiles
python manage.py collectstatic --noinput

# Run migrations (safe to run on every boot)
python manage.py migrate --noinput

# Start gunicorn
gunicorn backend.wsgi --bind 0.0.0.0:$PORT --log-file -
