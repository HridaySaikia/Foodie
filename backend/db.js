// const mongoose = require('mongoose');
// const mongoURI = process.env.MONGO_URI;

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true
//     });

//     console.log("✅ MongoDB connected");

//     const fetched_data = await mongoose.connection.db
//       .collection("foods")
//       .find({})
//       .toArray();

//     const fetched_category = await mongoose.connection.db
//       .collection("foodCategory")
//       .find({})
//       .toArray();

//     global.foods = fetched_data;
//     global.foodCategory = fetched_category;

//     console.log(`🍽️ Foods loaded: ${global.foods.length}`);
//     console.log(`📂 Categories loaded: ${global.foodCategory.length}`);

//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1); // stop server if DB fails
//   }
// };

// module.exports = mongoDB;



const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in environment variables");
  process.exit(1);
}

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
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
    process.exit(1);
  }
};

module.exports = mongoDB;
