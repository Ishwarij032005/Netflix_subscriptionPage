# Quick Deployment Script for Netflix App
# This script helps you deploy to Vercel and Render

Write-Host "🚀 Netflix App Deployment Helper" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "⚠️  Git not initialized. Initializing now..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit for deployment"
    Write-Host "✅ Git initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  PUSH TO GITHUB:" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "2️⃣  DEPLOY BACKEND TO RENDER:" -ForegroundColor Yellow
Write-Host "   → Go to: https://dashboard.render.com/"
Write-Host "   → Click 'New +' → 'Web Service'"
Write-Host "   → Connect your GitHub repo"
Write-Host "   → Root Directory: backend"
Write-Host "   → Build Command: npm install"
Write-Host "   → Start Command: node server.js"
Write-Host "   → Add environment variables (see DEPLOYMENT.md)"
Write-Host ""
Write-Host "3️⃣  DEPLOY FRONTEND TO VERCEL:" -ForegroundColor Yellow
Write-Host "   cd frontend"
Write-Host "   npm install -g vercel"
Write-Host "   vercel"
Write-Host "   → Follow prompts"
Write-Host "   → Add VITE_API_URL environment variable"
Write-Host "   → Deploy with: vercel --prod"
Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
