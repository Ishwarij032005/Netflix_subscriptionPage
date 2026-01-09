const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, /\.vercel\.app$/]
        : '*',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// DB
connectDB();

// ✅ API BASE PATH (IMPORTANT)
app.use("/api", subscriptionRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("Nova Subscription Backend is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
