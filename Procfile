web: bash start.sh
# Ensure Pillow is present before Django checks run in release phase
release: cd backend && python -m pip install --no-cache-dir Pillow==11.0.0 && python manage.py collectstatic --noinput && python manage.py migrate --noinput