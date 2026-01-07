web: bash start.sh
# Ensure Pillow is present before Django checks run in release phase (use venv explicitly)
release: cd backend && /app/.venv/bin/python -m pip install --no-cache-dir Pillow==11.0.0 && /app/.venv/bin/python - <<'PY'
import PIL
import PIL.Image
print(f"[release] Pillow OK: version={PIL.__version__}")
PY
 && /app/.venv/bin/python manage.py collectstatic --noinput && /app/.venv/bin/python manage.py migrate --noinput