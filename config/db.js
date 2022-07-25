const mongoose = require("mongoose");
const config = require("config");
const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("mongoDB connected");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
