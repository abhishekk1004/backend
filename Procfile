web: bash start.sh
release: cd backend && python manage.py collectstatic --noinput && python manage.py migrate
ALLOWED_HOSTS=abhishek.up.railway.app,api.abhishek-kushwaha.com.np
CSRF_TRUSTED_ORIGINS=https://abhishek.up.railway.app,https://api.abhishek-kushwaha.com.np