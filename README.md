# 🎬 Netflix-Style Registration App

Full-stack subscription management application with React frontend and Node.js backend.

## 🚀 Quick Start

### Local Development

**Backend:**
```bash
cd backend
npm install
cp .env.example .env  # Configure your MongoDB URI
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📦 Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + MongoDB
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

**Quick Deploy:**
```bash
# Run deployment helper
./deploy.ps1  # Windows
# or
./deploy.sh   # Linux/Mac
```

## 📁 Project Structure

```
Netflix/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── vercel.json   # Vercel configuration
│   └── .env.example  # Environment variables template
├── backend/           # Node.js + Express backend
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── server.js     # Entry point
│   ├── render.yaml   # Render configuration
│   └── .env.example  # Environment variables template
└── DEPLOYMENT.md     # Deployment guide
```

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 📝 Features

- ✅ User subscription management
- ✅ Multiple subscription plans
- ✅ MongoDB Atlas integration
- ✅ Responsive UI with Tailwind CSS
- ✅ Modern component library (shadcn/ui)
- ✅ Browse movies page
- ✅ Six-month subscribers tracking

## 🛠️ Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📚 API Endpoints

- `GET /` - Health check
- `POST /api/subscribe` - Create subscription
- `GET /api/subscriptions/:userName` - Get user subscriptions
- `GET /api/subscriptions/duration/6` - Get 6-month subscribers
- `PUT /api/subscriptions/:id` - Update subscription
- `DELETE /api/subscriptions/:id` - Delete subscription

## 🔒 Security Notes

- Never commit `.env` files
- Rotate MongoDB credentials regularly
- Use strong JWT secrets
- Configure CORS properly for production

## 📄 License

MIT
