require("dotenv").config();   // FIRST LINE

const express = require("express");
const cors = require("cors");
const mongoDB = require("./db");


const app = express();
const port = process.env.PORT || 5000;

// Connect MongoDB
mongoDB();

// Middleware
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// API Routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api/admin", require("./Routes/Admin"));
app.use("/api", require("./Routes/Food"));
app.use("/api/payment", require("./Routes/Payment"));

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server (Render needs this)
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});


