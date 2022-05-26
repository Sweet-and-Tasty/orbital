// this file is used for mongodb connection

const mongoose = require('mongoose');
const config = require('config'); // bring in config package
const db = config.get('mongoURI'); // to get the mongoURI from config

const connectDB = async () => {
  // this will give us back a promise; this is an asynchronous arrow function
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true // passed this option to remove deprecated
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
