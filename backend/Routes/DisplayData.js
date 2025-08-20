const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

router.get("/foodData", async (req, res) => {
  try {
    const foods = await Food.find();
    const categories = [...new Set(foods.map(item => item.category))].map(cat => ({ categoryName: cat }));
    res.json([foods, categories]);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
