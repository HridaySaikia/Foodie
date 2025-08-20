const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    options: {
        type: Map,       // Use Map to store key-value pairs
        of: Number,      // Each key maps to a number (price)
        required: true,
        default: {}      // Default empty object
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
