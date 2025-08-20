const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const Order = require("../models/Order");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/AdminAuth"); // ✅ import middleware

// ⚡ Admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// 👉 Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Add a new food item (Protected)
router.post("/food", adminAuth, async (req, res) => {
  try {
    const { name, category, img, description, options } = req.body; // include options
    const food = new Food({ name, category, img, description, options }); // save options
    await food.save();
    res.status(201).json({ success: true, food });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// 👉 Get all food items (Public)
router.get("/food", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Update food item (Protected)
router.put("/food/:id", adminAuth, async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedFood);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Delete food item (Protected)
router.delete("/food/:id", adminAuth, async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Food item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Get all orders (Protected)
router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 👉 Get all users (Protected)
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
