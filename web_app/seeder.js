const fs = require('fs');
const { MongoClient } = require('mongodb');
colors = require('colors');
const dotenv = require('dotenv');
const debug = require('debug')('seeder');

//load env variables
dotenv.config({ path: './config.env' });

//Read Json files
const sessions = JSON.parse(
  fs.readFileSync(`${__dirname}/src/data/sessions.json`, 'utf-8')
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
    process.exit(1);
  }
};

//import into DB
const importData = async () => {
  try {
    const db = await connectDB();

    const res = await db.collection('sessions').insertMany(sessions);
    debug(`Data imported...`.cyan.inverse);

    process.exit();
  } catch (error) {
    debug(`Error with data import: ${error.message}`.red);
    process.exit(1);
  }
};

//Delete data
const deleteData = async () => {
  try {
    const db = await connectDB();
    const res = await db.collection('sessions').deleteMany();

    debug(`All data has been removed`.yellow.inverse);
    process.exit();
  } catch (error) {
    debug(`Error with data removal: ${error.message}`);
  }
};

if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-delete') {
  deleteData();
}
