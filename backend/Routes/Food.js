const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const adminAuth = require("../middleware/AdminAuth"); // ✅ Middleware for admin auth

//---------------------------------------------
// 🟢 CREATE (Admin Only)
//---------------------------------------------
router.post("/food", adminAuth, async (req, res) => {
  try {
    const { name, options, category, img, description } = req.body;

    // Validate inputs
    if (!name || !options || Object.keys(options).length === 0) {
      return res.status(400).json({ success: false, message: "Name & options are required" });
    }

    const newFood = new Food({ name, options, category, img, description });
    await newFood.save();

    res.json({ success: true, message: "Food item added successfully", food: newFood });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//---------------------------------------------
// 🟢 READ (Public)
//---------------------------------------------
router.get("/food", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//---------------------------------------------
// 🟢 UPDATE (Admin Only)
//---------------------------------------------
router.put("/food/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, options, category, img, description } = req.body;

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      { name, options, category, img, description },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.json({ success: true, message: "Food item updated", food: updatedFood });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//---------------------------------------------
// 🟢 DELETE (Admin Only)
//---------------------------------------------
router.delete("/food/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    res.json({ success: true, message: "Food item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
