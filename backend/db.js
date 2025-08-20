const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/foodie";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });

    console.log("✅ MongoDB connected");

    const fetched_data = await mongoose.connection.db
      .collection("foods")
      .find({})
      .toArray();

    const fetched_category = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    global.foods = fetched_data;
    global.foodCategory = fetched_category;

    console.log(`🍽️ Foods loaded: ${global.foods.length}`);
    console.log(`📂 Categories loaded: ${global.foodCategory.length}`);

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = mongoDB;
