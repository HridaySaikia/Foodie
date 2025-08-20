const express = require('express');
const cors = require("cors");
const mongoDB = require("./db");
const app = express();
const port = 5000; // backend port




// Connect to MongoDB
mongoDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // allow your Vite/React frontend
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

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
