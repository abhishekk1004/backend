#!/bin/bash
set -e

# Use the build venv explicitly to avoid system Python (which lacks Pillow)
VENV_PY="/app/.venv/bin/python"
VENV_PIP="/app/.venv/bin/pip"
VENV_GUNICORN="/app/.venv/bin/gunicorn"

cd backend

# Ensure Pillow is present (Railway cache hiccups/venv path issues)
"$VENV_PY" -m pip show Pillow >/dev/null 2>&1 || "$VENV_PIP" install --no-cache-dir Pillow==11.0.0

# Ensure staticfiles directory exists and collect static assets
mkdir -p staticfiles
"$VENV_PY" manage.py collectstatic --noinput

# Run migrations (safe to run on every boot)
"$VENV_PY" manage.py migrate --noinput

# Start gunicorn
"$VENV_GUNICORN" backend.wsgi --bind 0.0.0.0:$PORT --log-file -
