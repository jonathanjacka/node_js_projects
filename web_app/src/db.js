const { MongoClient } = require('mongodb');
const debug = require('debug')('app:connectDB');

const connectDB = async () => {
  try {
    const conn = await MongoClient.connect(process.env.MONGO_URI);
    //console.log(conn);
    debug(`MongoDB connected: ${conn.dbname}`.bgBlue.black);
  } catch (error) {
    debug(`Error: ${error.message}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDB;
