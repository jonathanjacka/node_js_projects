const mongoose = require('mongoose');
const debug = require('debug')('app:connectDB');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    //console.log(`MongoDB connected: ${conn.connection.host}`.bgBlue.black);
    debug(`MongoDB connected: ${conn.connection.host}`.bgBlue.black);
  } catch (error) {
    debug(`Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDB;
