# 🚀 Quick Start - Deploy to abhishek-kushwaha.com.np

## 📋 BEFORE YOU START

**Prepare these things:**

1. **Gmail App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select: Phone = Android, App = Mail
   - Copy the 16-char password
   - ⚠️ You'll see it only once!

2. **GitHub Account**
   - Create account at https://github.com
   - Create 2 private repos: `portfolio-frontend` & `portfolio-backend`

3. **Railway Account**
   - Signup at https://railway.app
   - Connect with GitHub

4. **Vercel Account**
   - Signup at https://vercel.com
   - Connect with GitHub

5. **Cloudflare Account**
   - Signup at https://dash.cloudflare.com
   - Your domain registrar info ready

---

## ⚡ QUICK DEPLOYMENT (5-10 minutes per step)

### STEP 1: Prepare Backend for Production (5 min)

```bash
cd backend

# Install dependencies
pip install python-decouple dj-database-url psycopg2-binary

# Create .env file
copy .env.example .env

# Edit .env with your:
# - Gmail app password
# - SECRET_KEY (generate: python -c "import secrets; print(secrets.token_urlsafe(50))")
```

**Edit `backend/.env`:**
```
SECRET_KEY=your-random-secret-key-here
EMAIL_HOST_USER=abhishekkushwaha.np@gmail.com
EMAIL_HOST_PASSWORD=abcd efgh ijkl mnop
```

### STEP 2: Push Backend to GitHub (5 min)

```bash
cd backend

git init
git config user.name "Your Name"
git config user.email "your-email@gmail.com"

git add .
git commit -m "Initial backend setup for deployment"

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-backend.git
git push -u origin main
```

### STEP 3: Deploy Backend to Railway (10 min)

```bash
# Login to Railway
npm install -g @railway/cli
railway login

# In backend folder
railway init
# Select: Create new project
# Choose: Railway Starter

# Add PostgreSQL
railway add
# Select: PostgreSQL
```

**In Railway Dashboard:**
1. Go to your project
2. Click Variables
3. Add all from your `.env` file
4. Click "Deploy"

Get your Railway domain: `your-app.railway.app`

### STEP 4: Prepare Frontend for Production (3 min)

```bash
cd frontend

# Update .env for production
copy .env.example .env.local

# Edit .env.local
VITE_API_URL=https://api.abhishek-kushwaha.com.np/api
```

### STEP 5: Push Frontend to GitHub (5 min)

```bash
cd frontend

git init
git config user.name "Your Name"
git config user.email "your-email@gmail.com"

git add .
git commit -m "Initial frontend setup for deployment"

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-frontend.git
git push -u origin main
```

### STEP 6: Deploy Frontend to Vercel (5 min)

1. Go to https://vercel.com/new
2. Import repository: `portfolio-frontend`
3. Click "Deploy"
4. Wait for deployment to complete
5. Go to "Settings" → "Domains"
6. Add `abhishek-kushwaha.com.np`
7. Copy the CNAME value

### STEP 7: Setup Cloudflare DNS (10 min)

1. Go to https://dash.cloudflare.com/sign-up
2. Add site: `abhishek-kushwaha.com.np`
3. Copy Cloudflare nameservers
4. Go to your domain registrar (where you bought the domain)
5. Update nameservers to Cloudflare's
6. Wait 24-48 hours (can take minutes to hours)

**In Cloudflare Dashboard → DNS Records, add:**

```
Type    Name    Content
────────────────────────────────────
CNAME   @       cname.vercel-dns.com
CNAME   www     cname.vercel-dns.com
CNAME   api     your-railway-domain
```

**Then go to:**
- SSL/TLS → Full (automatic)
- Speed → Minify (enable all)

### STEP 8: Final Checks (5 min)

Test everything:

```bash
# Test API
curl https://api.abhishek-kushwaha.com.np/api/

# Test Frontend
Open: https://abhishek-kushwaha.com.np

# Test Contact Form
1. Go to /contact
2. Submit a message
3. Check admin: https://api.abhishek-kushwaha.com.np/admin/
4. Check email inbox (should receive confirmation)
```

---

## 📊 PROGRESS TRACKER

- [ ] Step 1: Prepare Backend (.env file)
- [ ] Step 2: Push Backend to GitHub
- [ ] Step 3: Deploy Backend to Railway
- [ ] Step 4: Prepare Frontend (.env.local)
- [ ] Step 5: Push Frontend to GitHub
- [ ] Step 6: Deploy Frontend to Vercel
- [ ] Step 7: Setup Cloudflare DNS
- [ ] Step 8: Test everything

---

## 🆘 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| "Can't deploy backend" | Check Railway logs: `railway logs` |
| "Frontend not loading" | Clear cache, wait for DNS (24-48h) |
| "Contact form not working" | Check CORS in Railway variables |
| "Email not sending" | Verify gmail app password in .env |
| "Domain not found" | Update nameservers in domain registrar |

---

## 📱 MANAGE CONTENT AFTER DEPLOYMENT

Add/edit content in Django admin:
```
https://api.abhishek-kushwaha.com.np/admin/
```

Username: `abhishek`
Password: (what you set during createsuperuser)

Then add:
- Blog posts
- Projects
- Certificates
- Photography

---

## ✅ COMPLETED!

Once all steps are done:
- ✅ Frontend at: `https://abhishek-kushwaha.com.np`
- ✅ Backend at: `https://api.abhishek-kushwaha.com.np`
- ✅ Contact form working
- ✅ Emails sending
- ✅ Admin panel: `https://api.abhishek-kushwaha.com.np/admin/`

**Enjoy your live portfolio! 🎉**
