const { MongoClient } = require('mongodb');
const debug = require('debug')('app:connectDB');
const fs = require('fs');

//Read Json files
const sessions = JSON.parse(
  fs.readFileSync(`${__dirname}/data/sessions.json`, 'utf-8')
);

const connectDB = async () => {
  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_URI);
    debug('Connected to Database'.yellow);
    const db = client.db(process.env.DB_NAME);
    debug(`Retrieved database: ${process.env.DB_NAME}`.yellow);
    return db;
  } catch (error) {
    debug(`Error with database connection: ${error.message}`.red);
  }
};

module.exports = connectDB;
