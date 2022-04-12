const express = require('express');
const dotenv = require('dotenv');

const morgan = require('morgan');

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
