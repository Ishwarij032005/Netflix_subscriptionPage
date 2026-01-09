#!/bin/bash

# Quick Deployment Script for Netflix App
# This script helps you deploy to Vercel and Render

echo "🚀 Netflix App Deployment Helper"
echo "================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "⚠️  Git not initialized. Initializing now..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1️⃣  PUSH TO GITHUB:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "2️⃣  DEPLOY BACKEND TO RENDER:"
echo "   → Go to: https://dashboard.render.com/"
echo "   → Click 'New +' → 'Web Service'"
echo "   → Connect your GitHub repo"
echo "   → Root Directory: backend"
echo "   → Build Command: npm install"
echo "   → Start Command: node server.js"
echo "   → Add environment variables (see DEPLOYMENT.md)"
echo ""
echo "3️⃣  DEPLOY FRONTEND TO VERCEL:"
echo "   cd frontend"
echo "   npm install -g vercel"
echo "   vercel"
echo "   → Follow prompts"
echo "   → Add VITE_API_URL environment variable"
echo "   → Deploy with: vercel --prod"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
