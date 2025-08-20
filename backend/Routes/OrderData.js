const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ✅ Save new order - Simplified version
router.post('/orderData', async (req, res) => {
  try {
    console.log("=== ORDER ROUTE HIT ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const { email, order_data } = req.body;

    // Basic validation
    if (!email) {
      console.log("❌ No email provided");
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    if (!order_data || !Array.isArray(order_data) || order_data.length === 0) {
      console.log("❌ Invalid order_data:", order_data);
      return res.status(400).json({ success: false, error: "order_data is required and must be an array" });
    }

    console.log("✅ Validation passed, attempting to save...");

    // Try to find existing order
    let existingOrder = await Order.findOne({ email });
    
    if (!existingOrder) {
      console.log("Creating new order for:", email);
      const newOrder = await Order.create({ 
        email, 
        order_data 
      });
      console.log("✅ New order created:", newOrder._id);
    } else {
      console.log("Updating existing order for:", email);
      existingOrder.order_data.push(...order_data);
      await existingOrder.save();
      console.log("✅ Existing order updated");
    }

    return res.status(200).json({ 
      success: true, 
      message: "Order placed successfully" 
    });

  } catch (error) {
    console.error("❌ ORDER ERROR:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    if (error.stack) console.error("Error stack:", error.stack);
    
    return res.status(500).json({ 
      success: false, 
      error: "Server Error",
      details: error.message
    });
  }
});

// ✅ Fetch orders for a user
router.post('/myOrderData', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email is required" });
    }

    const myData = await Order.findOne({ email });
    return res.status(200).json({ 
      success: true, 
      orderData: myData ? myData.order_data : [] 
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Server Error"
    });
  }
});

module.exports = router;