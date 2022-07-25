const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://czement:qmpz1234@cluster0.tnasn.mongodb.net/orbitalDB?retryWrites=true&w=majority"
    );
    console.log("mongoDB connected");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
