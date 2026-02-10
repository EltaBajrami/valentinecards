# Deployment Guide for Valentine's++

## Prerequisites
1. **Porkbun Domain** - Purchase your domain from porkbun.com
2. **GitHub Account** - Push your code to GitHub
3. **Vercel Account** - Sign up at vercel.com (free)

## Step-by-Step Deployment

### 1. Buy Domain from Porkbun
- Go to [porkbun.com](https://porkbun.com)
- Search and purchase your domain (e.g., `valentinesplusplus.com`)
- Keep the domain tab open, you'll need it later

### 2. Push Code to GitHub
```bash
cd /Users/eltabajrami/Desktop/valentinesplusplus-main
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Select your `valentinesplusplus` repository
4. **Framework Preset**: Vite
5. **Root Directory**: `frontend`
6. Click **"Deploy"**

### 4. Configure Environment Variables in Vercel
After deployment, go to your project settings:

**Settings → Environment Variables** and add:

#### Frontend Variables:
- `VITE_API_BASE_URL` = `https://your-domain.com/api`

#### Backend Variables (if deploying separately):
- `MONGO_URL` = Your MongoDB connection string
- `EMAIL_USER` = `vcplusplus.official@gmail.com`
- `EMAIL_PASS` = Your 16-character Gmail App Password
- `FRONTEND_URL` = `https://your-domain.com`
- `WEBSITE_URL` = `https://your-domain.com`

### 5. Connect Custom Domain in Vercel
1. In Vercel project → **Settings → Domains**
2. Add your Porkbun domain (e.g., `valentinesplusplus.com`)
3. Vercel will show you DNS records to add

### 6. Configure DNS in Porkbun
1. Go to Porkbun → **Account → Domain Management**
2. Click your domain → **DNS**
3. Add the DNS records Vercel provided:
   - **Type**: `A` or `CNAME`
   - **Host**: `@` (for root domain)
   - **Answer/Value**: The Vercel address provided
4. Add another record for `www`:
   - **Type**: `CNAME`
   - **Host**: `www`
   - **Answer**: `cname.vercel-dns.com`

### 7. Wait for DNS Propagation
- Usually takes 5-30 minutes
- Vercel will automatically provision SSL certificate
- Your site will be live at `https://your-domain.com`

### 8. Update Backend Environment Variables
If using separate backend deployment or serverless functions, ensure all environment variables are set with your production domain.

## Testing
1. Visit your domain
2. Submit a test card with your email
3. Check that you receive the email with correct links
4. Verify the card displays correctly

## Troubleshooting
- **Emails not sending?** Check Gmail App Password in environment variables
- **CORS errors?** Verify `FRONTEND_URL` matches your domain
- **404 errors?** Check `vercel.json` routing configuration
- **DNS not working?** Wait longer (can take up to 48 hours)

## Alternative: Deploy Backend Separately

If you prefer to deploy backend separately (e.g., to Railway or Render):

### Railway Deployment:
1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select backend folder
4. Add environment variables
5. Copy the deployment URL
6. Update `VITE_API_BASE_URL` in Vercel to point to Railway URL

### Render Deployment:
1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub repo
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables
7. Copy deployment URL
8. Update `VITE_API_BASE_URL` in Vercel

## Need Help?
- Vercel Docs: https://vercel.com/docs
- Porkbun DNS Guide: https://kb.porkbun.com/
