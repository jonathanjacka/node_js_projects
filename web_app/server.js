const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => res.send('Hello there!'));

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`Server is active on port ${PORT} - hello there...`)
);
