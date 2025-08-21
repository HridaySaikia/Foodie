const express = require('express');
const cors = require("cors");
const mongoDB = require("./db");

const app = express();

// Connect to MongoDB
mongoDB();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://foodie-qkxe110jc-hridayananda-saikias-projects.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData")); 
app.use("/api/admin", require("./Routes/Admin"));
app.use("/api", require("./Routes/Food"));
app.use("/api/payment", require("./Routes/Payment"));

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// ❌ REMOVE app.listen()
// ✅ Export the app for Vercel
module.exports = app;

