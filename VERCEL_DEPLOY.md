# Quick Deploy Guide: Frontend to Vercel

## Option 1: Deploy entire repo (Recommended - simpler)

1. **Push current repo to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Prepare frontend for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repo
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Add Environment Variable** in Vercel:
   - Key: `VITE_API_URL`
   - Value: `https://abhishek.up.railway.app/api`

4. **Deploy** - Vercel will auto-deploy

5. **Set Custom Domain** in Vercel:
   - Go to Project Settings → Domains
   - Add `www.abhishek-kushwaha.com.np`
   - Follow DNS instructions

## Option 2: Separate frontend repo (cleaner)

1. **Create new repo** for frontend only:
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git remote add origin <your-new-frontend-repo-url>
   git push -u origin main
   ```

2. Follow same Vercel steps above (no root directory needed)

## After Vercel Deployment

Update Railway backend environment variables to include Vercel domain:
- `CORS_ALLOWED_ORIGINS`: Add your Vercel URL
- `CSRF_TRUSTED_ORIGINS`: Add your Vercel URL

**Your Vercel URL will be**: `https://<project-name>.vercel.app` initially
