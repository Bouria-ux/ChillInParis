const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connecté !");
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err.message);
  }
};

//console.log("MONGO_URI = ", process.env.MONGO_URI); // ← TEMP
//await mongoose.connect(process.env.MONGO_URI);


module.exports = connectMongo;
