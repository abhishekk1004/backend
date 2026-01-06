# 🚀 Complete Deployment Guide - abhishek-kushwaha.com.np

## 📋 Architecture

```
abhishek-kushwaha.com.np          → Frontend (Vercel)
api.abhishek-kushwaha.com.np      → Backend (Railway/Render)
Database: PostgreSQL (Railway/Render)
Email: Gmail SMTP
```

---

## 1️⃣ SETUP CLOUDFLARE DNS (Free)

### Step 1: Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email
3. Add site: `abhishek-kushwaha.com.np`

### Step 2: Change Nameservers at Domain Registrar
Your domain registrar (Mercantile/HostingNepal/wherever you bought it):
1. Go to domain settings
2. Change nameservers to Cloudflare's:
   - `iris.ns.cloudflare.com`
   - `noah.ns.cloudflare.com`
3. Wait 24-48 hours for propagation

### Step 3: Add DNS Records in Cloudflare

In Cloudflare Dashboard → DNS Records, add these:

| Type | Name | Content | Status |
|------|------|---------|--------|
| A | @ | Vercel IP (from deployment) | Proxied |
| CNAME | www | cname.vercel-dns.com | Proxied |
| CNAME | api | your-backend.railway.app | Proxied |

*(You'll get exact IPs/CNAMEs after deployment)*

### Step 4: Enable SSL/TLS in Cloudflare
```
Cloudflare Dashboard → SSL/TLS → Full (automatic certificate)
```

---

## 2️⃣ DEPLOY BACKEND (Railway - Free Tier)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub (recommended)
3. Create new project

### Step 2: Add Your Backend

```bash
# Login to Railway CLI
npm i -g @railway/cli
railway login

# In backend folder
cd backend
railway init
railway add
# Select PostgreSQL
```

### Step 3: Configure Environment Variables

In Railway Dashboard → Project → Variables, add:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=api.abhishek-kushwaha.com.np,your-railway-domain
DATABASE_URL=postgresql://user:password@host/dbname
CORS_ALLOWED_ORIGINS=["https://abhishek-kushwaha.com.np","https://www.abhishek-kushwaha.com.np"]

# Email Settings
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=your-email@gmail.com
```

### Step 4: Deploy

```bash
railway up
```

Railway will give you URL: `your-app.railway.app`

### Step 5: Update DNS in Cloudflare

Add CNAME record:
```
api  →  your-app.railway.app
```

---

## 3️⃣ DEPLOY FRONTEND (Vercel - Free)

### Step 1: Update API URL

Edit `frontend/src/lib/api.ts`:

```typescript
// Before
export const API_BASE_URL = 'http://localhost:8000/api';

// After
export const API_BASE_URL = 'https://api.abhishek-kushwaha.com.np/api';
```

### Step 2: Push to GitHub

```bash
cd frontend
git init
git add .
git commit -m "Final deployment"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio-frontend.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to https://vercel.com/new
2. Connect GitHub
3. Select your frontend repo
4. Click Deploy
5. Vercel gives you: `your-app.vercel.app`

### Step 4: Add Custom Domain

Vercel Dashboard → Settings → Domains → Add domain:
```
abhishek-kushwaha.com.np
www.abhishek-kushwaha.com.np
```

Vercel will give CNAME value to add in Cloudflare.

### Step 5: Update Cloudflare DNS

Add these records:
```
@   (root)  →  cname.vercel-dns.com
www         →  cname.vercel-dns.com
api         →  your-railway-domain
```

---

## 4️⃣ POSTGRESQL SETUP (Railway Automatic)

When you add PostgreSQL in Railway, it automatically creates:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

Use this exact URL in Django settings:

```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
    )
}
```

Install dependency:
```bash
pip install dj-database-url psycopg2-binary
```

---

## 5️⃣ EMAIL SETUP (Gmail - Required for Contact Form)

### Step 1: Get Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select: Phone = Android, App = Mail
3. Google generates 16-char password
4. **Copy this password** (you'll never see it again!)

### Step 2: Add to Railway Variables

```
EMAIL_HOST_USER=abhishekkushwaha.np@gmail.com
EMAIL_HOST_PASSWORD=abcd efgh ijkl mnop  # Your 16-char password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=abhishekkushwaha.np@gmail.com
```

### Step 3: Test Email in Django Shell

```bash
railway run python manage.py shell
>>> from django.core.mail import send_mail
>>> send_mail('Test', 'This is a test', 'from@example.com', ['to@example.com'])
1  # Should return 1 (success)
```

---

## 6️⃣ UPDATE DJANGO SETTINGS FOR PRODUCTION

Replace in `backend/settings.py`:

```python
import os
from pathlib import Path
import dj_database_url

# Read from environment
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# CORS
CORS_ALLOWED_ORIGINS = [
    "https://abhishek-kushwaha.com.np",
    "https://www.abhishek-kushwaha.com.np",
]

# Email
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.environ.get('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_HOST_USER = os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL')

# Security
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_SECURITY_POLICY = {
    'default-src': ("'self'",),
}
```

Install dependency:
```bash
pip install dj-database-url python-decouple
```

---

## 7️⃣ FIRST DEPLOYMENT COMMANDS

### Backend (Railway):

```bash
cd backend

# Migrate database
railway run python manage.py migrate

# Create superuser
railway run python manage.py createsuperuser
# Username: abhishek
# Email: abhishekkushwaha.np@gmail.com
# Password: (your admin password)

# Collect static files
railway run python manage.py collectstatic --noinput
```

### Frontend (Vercel):

```bash
cd frontend
npm run build
# Just commit and push to GitHub
# Vercel auto-deploys
```

---

## 8️⃣ VERIFY DEPLOYMENT

### Test Backend API:
```bash
curl https://api.abhishek-kushwaha.com.np/api/

# Should return JSON with all endpoints
```

### Test Frontend:
```
Open: https://abhishek-kushwaha.com.np
Should load your portfolio
```

### Test Contact Form:
1. Open contact page
2. Submit a message
3. Check admin panel: https://api.abhishek-kushwaha.com.np/admin/
4. Should see your message

### Test Email:
1. Submit contact form
2. Check your gmail inbox
3. Should receive confirmation email

---

## 9️⃣ DNS PROPAGATION CHECK

Use these tools to verify:
- https://whatsmydns.net/#A/abhishek-kushwaha.com.np
- https://mxtoolbox.com/

Wait 24-48 hours for full propagation.

---

## ✅ UPDATE CONTENT LATER

**YES! You can update these AFTER deployment:**
- ✅ Blog posts
- ✅ Certificates
- ✅ Photography gallery
- ✅ Projects

Just add them in Django admin panel:
```
https://api.abhishek-kushwaha.com.np/admin/
```

---

## 📋 DEPLOYMENT CHECKLIST

### Before Deploying:

- [ ] GitHub account created
- [ ] Backend pushed to GitHub (or use Railway git integration)
- [ ] Frontend pushed to GitHub
- [ ] Railway account created & PostgreSQL added
- [ ] Vercel account created & connected to GitHub
- [ ] Cloudflare account created
- [ ] Gmail app password generated
- [ ] All environment variables ready

### Deployment Steps:

1. [ ] Deploy Backend to Railway
2. [ ] Deploy Frontend to Vercel
3. [ ] Add domain to Cloudflare
4. [ ] Update DNS records
5. [ ] Test API connection
6. [ ] Test contact form & email
7. [ ] Verify SSL certificate

### After Deployment:

- [ ] Add content (blogs, certificates, projects) via admin panel
- [ ] Monitor error logs
- [ ] Setup email notifications
- [ ] Backup database regularly

---

## 🆘 TROUBLESHOOTING

### API not responding?
```bash
# Check Railway logs
railway logs
```

### Domain not loading?
```bash
# Wait 24 hours for DNS propagation
# Check: https://whatsmydns.net/
```

### Email not working?
- Verify app password in Railway variables
- Check spam folder
- Test in Django shell

### Database connection error?
```bash
# Test connection
railway run python manage.py dbshell
```

---

## 📞 SUPPORT LINKS

- **Railway Docs**: https://docs.railway.app/
- **Vercel Docs**: https://vercel.com/docs
- **Cloudflare DNS**: https://developers.cloudflare.com/dns/
- **Django Settings**: https://docs.djangoproject.com/en/5.2/ref/settings/

---

**You're ready to deploy! Follow the steps in order.** 🚀
