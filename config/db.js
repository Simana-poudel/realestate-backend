const mongoose = require("mongoose");

exports.connect = async () => {
  try {
    const url = "mongodb://127.0.0.1:27017/SellBy"
    const db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    if (db) {
      console.log(
        "Connected to database with host:" +
          `${db?.connection?.host} and name: ${db?.connection?.name}`
      );
    }
  } catch (err) {
    console.log(err);
  }
};