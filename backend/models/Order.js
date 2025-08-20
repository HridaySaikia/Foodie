const mongoose = require('mongoose');

// More flexible schema that matches your frontend data
const OrderSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  order_data: {
    type: Array, // Simplified - let MongoDB handle the nested structure
    default: []
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model("Order", OrderSchema);