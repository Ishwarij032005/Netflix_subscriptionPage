# 🚀 Deployment Guide: Netflix-Style Registration App

This guide walks you through deploying your full-stack Netflix registration application to **Vercel** (frontend) and **Render** (backend) using free tiers.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Render account (sign up at [render.com](https://render.com))
- MongoDB Atlas database (already configured)

---

## 🎯 Part 1: Deploy Backend to Render

### Step 1: Push Code to GitHub

1. Create a new GitHub repository
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Create Render Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `netflix-backend` (or your preferred name)
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

### Step 3: Configure Environment Variables

In the Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://ishwari03086:Ishwarij3@cluster0.gr0szdb.mongodb.net/subscriptionDB` |
| `JWT_SECRET` | Generate a random string (e.g., use [randomkeygen.com](https://randomkeygen.com/)) |
| `FRONTEND_URL` | Leave empty for now, will add after Vercel deployment |

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment to complete (5-10 minutes)
3. Copy your backend URL: `https://netflix-backend-XXXX.onrender.com`

### Step 5: Test Backend

Visit your backend URL in a browser. You should see:
```
Nova Subscription Backend is running
```

Test the API health:
```bash
curl https://your-backend-url.onrender.com/
```

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Local Environment File

Create `frontend/.env` with your Render backend URL:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 2: Test Build Locally (Optional)

```bash
cd frontend
npm run build
```

Ensure the build completes without errors.

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `netflix-frontend` (or your choice)
   - In which directory is your code located? `./`
   - Want to override settings? **N**

4. Add environment variable:
```bash
vercel env add VITE_API_URL
```
Enter your Render backend URL when prompted.

5. Deploy to production:
```bash
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com`

6. Click **"Deploy"**

### Step 4: Get Your Frontend URL

After deployment completes, copy your Vercel URL:
```
https://netflix-frontend-XXXX.vercel.app
```

---

## 🔗 Part 3: Connect Frontend & Backend

### Step 1: Update Backend CORS

1. Go back to your Render dashboard
2. Navigate to your backend service
3. Go to **Environment** tab
4. Add new environment variable:
   - Key: `FRONTEND_URL`
   - Value: `https://your-frontend-url.vercel.app`

5. Click **"Save Changes"**
6. Render will automatically redeploy

### Step 2: Verify Connection

1. Visit your Vercel frontend URL
2. Open browser DevTools (F12) → Console tab
3. Try creating a subscription
4. Check for any CORS or network errors

---

## ✅ Part 4: Testing & Verification

### Backend Tests

```bash
# Health check
curl https://your-backend-url.onrender.com/

# Test subscription creation
curl -X POST https://your-backend-url.onrender.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "Test User",
    "planName": "Premium",
    "monthlyPrice": 649,
    "duration": 6
  }'
```

### Frontend Tests

1. **Homepage Load**: Visit your Vercel URL
2. **Subscription Flow**:
   - Select a plan
   - Enter user details
   - Submit subscription
   - Verify success modal appears
3. **Six Month Subscribers Page**: Navigate and check data loads
4. **Browse Page**: Verify movies display correctly

### Database Verification

1. Log into [MongoDB Atlas](https://cloud.mongodb.com/)
2. Navigate to your cluster → Collections
3. Check `subscriptionDB` → `subscriptions` collection
4. Verify test subscriptions appear

---

## 🐛 Troubleshooting

### Issue: CORS Error

**Symptom**: Browser console shows "CORS policy" error

**Solution**:
1. Verify `FRONTEND_URL` is set in Render environment variables
2. Ensure the URL matches exactly (no trailing slash)
3. Redeploy backend service

### Issue: API Calls Fail

**Symptom**: Network errors or 404 responses

**Solution**:
1. Check `VITE_API_URL` in Vercel environment variables
2. Verify backend is running (visit backend URL)
3. Check browser Network tab for actual URL being called

### Issue: MongoDB Connection Failed

**Symptom**: Backend logs show "MongoError"

**Solution**:
1. Verify `MONGODB_URI` in Render environment variables
2. Check MongoDB Atlas network access allows all IPs (0.0.0.0/0)
3. Verify database user credentials are correct

### Issue: Render Free Tier Sleeps

**Symptom**: First request takes 30+ seconds

**Solution**: 
- This is expected on Render free tier
- Service "wakes up" after first request
- Consider using a service like [UptimeRobot](https://uptimerobot.com/) to ping every 5 minutes

---

## 📝 Deployed URLs

After successful deployment, document your URLs:

- **Frontend (Vercel)**: `https://your-frontend.vercel.app`
- **Backend (Render)**: `https://your-backend.onrender.com`
- **Database**: MongoDB Atlas (already configured)

---

## 🔒 Security Notes

1. **Rotate MongoDB Credentials**: Your current credentials are exposed in code. Consider creating new database user.
2. **Environment Variables**: Never commit `.env` files to Git
3. **JWT Secret**: Use a strong random string (32+ characters)
4. **CORS**: In production, restrict to specific frontend URL only

---

## 🎉 Next Steps

1. **Custom Domain**: Add custom domain in Vercel settings
2. **Monitoring**: Set up error tracking (e.g., Sentry)
3. **Analytics**: Add Google Analytics or similar
4. **CI/CD**: Automatic deployments are already configured via GitHub

---

## 📞 Support

If you encounter issues:
- Check Render logs: Dashboard → Your Service → Logs
- Check Vercel logs: Dashboard → Your Project → Deployments → View Function Logs
- Verify environment variables are set correctly
