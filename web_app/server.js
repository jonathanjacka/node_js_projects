const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const debug = require('debug')('app');
const morgan = require('morgan');
const errorHandler = require(`./middleware/error`);

dotenv.config({ path: './config.env' });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello there!'));

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  debug(
    colors.green.inverse(`Server is active on port ${PORT} - hello there...`)
  )
);
