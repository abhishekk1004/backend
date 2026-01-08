# Railway Environment Variables
# Set these in Railway dashboard: Variables tab

# REQUIRED: Generate a secure secret key
SECRET_KEY=6hr5YYB6WAJTmuOI2PhVZjCF_vExRxJ9ASGG15OchIZjMnwQd4a9blXARJW_1OSjk8I

# Production mode
DEBUG=False

# All allowed domains (Railway auto-provides Railway domain, add custom domains)
ALLOWED_HOSTS=abhishek.up.railway.app,api.abhishek-kushwaha.com.np,www.abhishek-kushwaha.com.np,abhishek-kushwaha.com.np

# Database URL (Railway auto-provides this from PostgreSQL service)
DATABASE_URL=${DATABASE_URL}

# CORS - Frontend domains that can access the API
CORS_ALLOWED_ORIGINS=https://www.abhishek-kushwaha.com.np,https://abhishek-kushwaha.com.np,https://abhishek.up.railway.app

# CSRF - Trusted origins for form submissions
CSRF_TRUSTED_ORIGINS=https://abhishek.up.railway.app,https://api.abhishek-kushwaha.com.np,https://www.abhishek-kushwaha.com.np,https://abhishek-kushwaha.com.np

# Security (production)
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True

# Email (optional - for contact form notifications)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=abhishekkushwaha.np@gmail.com
